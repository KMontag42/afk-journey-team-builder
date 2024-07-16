import "server-only";

import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { Row } from "@libsql/client";

import { type ClerkUser, getUser } from "@/lib/server/users";
import { turso } from "@/lib/turso";
import { type FormationData } from "@/lib/formations";

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

  const user = await getUser(formation.user_id?.toString()!);

  return buildFormationJson(formation, user);
}

export const getFormation = cache(_getFormation);

export async function getFormationsForUserId(
  userId: string,
): Promise<FormationData[]> {
  const { userId: currentUserId } = auth();
  let formations;

  if (currentUserId) {
    formations = await turso.execute({
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
    formations = await turso.execute({
      sql: "SELECT * FROM formations WHERE user_id = (:userId)",
      args: { userId },
    });
  }

  formations = await Promise.all(
    formations.rows.map(async (formation) => {
      const user = await getUser(formation.user_id?.toString()!);

      return buildFormationJson(formation, user);
    }),
  );

  return formations;
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

  const formations = await Promise.all(
    queryResponse.rows.map(async (formation) => {
      const user = await getUser(formation.user_id?.toString()!);

      return buildFormationJson(formation, user);
    }),
  );

  return formations;
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

  const formations = await Promise.all(
    queryResponse.rows.map(async (formation) => {
      const user = await getUser(formation.user_id?.toString()!);

      return buildFormationJson(formation, user);
    }),
  );

  return formations;
}

export const mostPopularFormations = cache(_mostPopularFormations);
