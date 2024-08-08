import "server-only";

import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { Row } from "@libsql/client";

import { type ClerkUser, getUser } from "@/lib/server/users";
import { turso } from "@/lib/server/turso";
import { type FormationData } from "@/lib/formations";
import { eq, isNotNull, sql } from "drizzle-orm";
import { formations, formationsWithVotes, votes } from "@/drizzle/schema";
import { drizzleClient } from "@/lib/server/drizzle";

const drizzle = drizzleClient;

type FormationResult = {
  id: number;
  formation: string;
  artifact: string;
  layout: number;
  userId: string;
  name: string;
  voteCount: number | null;
  votes: any | null;
};

export function buildFormationJson(
  formation: Row,
  user: ClerkUser,
): FormationData {
  return {
    id: parseInt(formation.id?.toString()!),
    formation: formation.formation?.toString()!,
    artifact: formation.artifact?.toString()!,
    layout: parseInt(formation.layout?.toString()!),
    name: formation.name?.toString()!,
    currentUserLiked:
      parseInt(formation.currentUserLiked?.toString()!) === 1 ? true : false,
    ...user,
  };
}

// Proposed new buildFormationJson()
// export function buildFormationJson(
//   formation: FormationResult,
//   user: ClerkUser,
// ): FormationData {
//   return {
//     id: parseInt(formation.id?.toString()!),
//     formation: formation.formation?.toString()!,
//     artifact: formation.artifact?.toString()!,
//     layout: parseInt(formation.layout?.toString()!),
//     name: formation.name?.toString()!,
//     currentUserLiked:
//       formation.votes.length >= 1 &&
//       formation.votes.find((voteUser) => voteUser.userId === user.user_id)
//         ? true
//         : false,
//     ...user,
//   };
// }

async function _getFormation(id: string): Promise<FormationData | false> {
  const { userId } = auth();
  let formation;

  if (userId) {
    formation = await turso.execute({
      sql: `
        SELECT
            f.*,
            CASE
              WHEN v.id IS NOT NULL THEN 1
              ELSE 0
            END AS currentUserLiked
        FROM
            formations f
        LEFT JOIN
            votes v
        ON
            f.id = v.formation_id
        AND
            v.user_id = (:userId)
        WHERE f.id = (:id);
      `,
      args: { id, userId },
    });
  } else {
    formation = await turso.execute({
      sql: "SELECT * FROM formations WHERE id = ?",
      args: [id],
    });
  }

  formation = formation.rows[0];

  if (!formation) {
    return false;
  }

  // drizzle example
  let formationDrizzle: FormationResult;

  if (userId) {
    formationDrizzle = (await drizzle.query.formations.findFirst({
      with: {
        votes: {
          where: isNotNull(votes.id) && eq(votes.userId, userId),
        },
      },
      where: eq(formations.id, parseInt(id)),
    })) as FormationResult;
  } else {
    formationDrizzle = (await drizzle.query.formations.findFirst({
      where: eq(formations.id, parseInt(id)),
    })) as FormationResult;
  }

  console.log(formationDrizzle);

  const user = await getUser(formation.user_id?.toString()!);

  return buildFormationJson(formation, user);
}

export const getFormation = cache(_getFormation);

export async function getFormationsForUserId(
  userId: string,
): Promise<FormationData[]> {
  const { userId: currentUserId } = auth();
  let userFormations;

  if (currentUserId) {
    userFormations = await turso.execute({
      sql: `
            SELECT
                f.*,
                CASE
                  WHEN v.id IS NOT NULL THEN 1
                  ELSE 0
                END AS currentUserLiked
            FROM
                formations f
            LEFT JOIN
                votes v
            ON
                f.id = v.formation_id
            AND
                v.user_id = (:currentUserId)
            WHERE f.user_id = (:userId);
            `,
      args: { userId, currentUserId },
    });
  } else {
    userFormations = await turso.execute({
      sql: "SELECT * FROM formations WHERE user_id = (:userId)",
      args: { userId },
    });
  }

  let userFormationsTest: FormationResult[] = [];
  if (currentUserId) {
    userFormationsTest = (await drizzle.query.formations.findMany({
      with: {
        votes: {
          where: eq(votes.userId, userId),
        },
      },
      where: eq(formations.userId, userId),
    })) as FormationResult[];
  } else {
    userFormationsTest = (await drizzle.query.formations.findMany({
      where: eq(formations.userId, userId),
    })) as FormationResult[];
  }

  console.log(userFormationsTest);

  userFormations = await Promise.all(
    userFormations.rows.map(async (formation) => {
      const user = await getUser(formation.user_id?.toString()!);

      return buildFormationJson(formation, user);
    }),
  );

  return userFormations;
}

export async function searchFormations(
  query: string,
): Promise<FormationData[]> {
  // if there is a user, we need to join votes to get the user's votes
  const { userId } = auth();
  let queryResponse;

  if (userId) {
    queryResponse = await turso.execute({
      sql: `
        SELECT
            f.*,
            COUNT(v.id) AS vote_count,
            CASE
                WHEN v2.id IS NOT NULL THEN 1
                ELSE 0
            END AS currentUserLiked
        FROM
            formations f
        LEFT JOIN
            votes v
        ON
            f.id = v.formation_id
        LEFT JOIN
            votes v2
        ON
            f.id = v2.formation_id
        AND
            v2.user_id = (:userId)
        WHERE
            f.name LIKE (:q) OR f.formation LIKE (:q)
        GROUP BY
            f.id
        ORDER BY
            vote_count DESC;
      `,
      args: { q: `%${query}%`, userId },
    });
  } else {
    queryResponse = await turso.execute({
      sql: `
        SELECT
            f.*,
            COUNT(v.id) AS vote_count
        FROM
            formations f
        LEFT JOIN
            votes v
        ON
            f.id = v.formation_id
        WHERE
            f.name LIKE (:q) OR f.formation LIKE (:q)
        GROUP BY
            f.id
        ORDER BY
            vote_count DESC;
      `,
      args: { q: `%${query}%` },
    });
  }

  if (!queryResponse.rows.length) {
    return [];
  }

  const searchFormations = await Promise.all(
    queryResponse.rows.map(async (formation) => {
      const user = await getUser(formation.user_id?.toString()!);

      return buildFormationJson(formation, user);
    }),
  );

  return searchFormations;
}

async function _mostPopularFormations(limit: number): Promise<FormationData[]> {
  const { userId } = auth();
  let queryResponse;

  if (userId) {
    queryResponse = await turso.execute({
      sql: `
        SELECT
            f.*,
            COUNT(v.id) AS vote_count,
            CASE
                WHEN v2.id IS NOT NULL THEN 1
                ELSE 0
            END AS currentUserLiked
        FROM
            formations f
        LEFT JOIN
            votes v
        ON
            f.id = v.formation_id
        LEFT JOIN
            votes v2
        ON
            f.id = v2.formation_id
        AND
            v2.user_id = (:userId)
        GROUP BY
            f.id
        ORDER BY
            vote_count DESC
        LIMIT (:limit);
      `,
      args: { limit, userId },
    });
  } else {
    queryResponse = await turso.execute({
      sql: `
        SELECT
            f.*,
            COUNT(v.id) AS vote_count
        FROM
            formations f
        LEFT JOIN
            votes v
        ON
            f.id = v.formation_id
        GROUP BY
            f.id
        ORDER BY
            vote_count DESC
        LIMIT (:limit);
      `,
      args: { limit },
    });
  }

  if (!queryResponse.rows.length) {
    return [];
  }

  let formationsDrizzle;
  formationsDrizzle = (
    await drizzle.run(sql`SELECT * FROM ${formationsWithVotes}`)
  ).rows;
  console.log(formationsDrizzle);

  const topFormations = await Promise.all(
    queryResponse.rows.map(async (formation) => {
      const user = await getUser(formation.user_id?.toString()!);

      return buildFormationJson(formation, user);
    }),
  );

  return topFormations;
}

export const mostPopularFormations = cache(_mostPopularFormations);
