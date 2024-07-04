import "server-only";

import { auth } from "@clerk/nextjs/server";
import { Row } from "@libsql/client";

import { type ClerkUser, getUser } from "@/lib/users";
import { turso } from "@/lib/turso";

export type Formation = {
  id: number;
  formation: string;
  artifact: string;
  layout: number;
  name: string;
  user_id?: string;
  user_image: string;
  currentUserLiked?: number;
};

export function buildFormationJson(formation: Row, user: ClerkUser): Formation {
  return {
    id: parseInt(formation.id?.toString()!),
    formation: formation.formation?.toString()!,
    artifact: formation.artifact?.toString()!,
    layout: parseInt(formation.layout?.toString()!),
    name: formation.name?.toString()!,
    currentUserLiked: parseInt(formation.currentUserLiked?.toString()!),
    ...user,
  };
}

export async function getFormation(id: string): Promise<Formation | false> {
  const { userId } = auth();
  let formation;

  if (userId) {
    formation = await turso.execute({
      sql: `
        SELECT
            f.id,
            f.formation,
            f.artifact,
            f.layout,
            f.name,
            f.user_id,
            v.id AS currentUserLiked
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

export async function getFormationsForUserId(
  userId: string,
): Promise<Formation[]> {
  const { userId: currentUserId } = auth();
  let formations;

  if (currentUserId) {
    formations = await turso.execute({
      sql: `
            SELECT
                f.*,
                v.id AS currentUserLiked
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

export async function searchFormations(query: string): Promise<Formation[]> {
  // if there is a user, we need to join votes to get the user's votes
  const { userId } = auth();
  let queryResponse;

  if (userId) {
    queryResponse = await turso.execute({
      sql: `
        SELECT
            f.*,
            v.id AS currentUserLiked
        FROM
            formations f
        LEFT JOIN
            votes v
        ON
            f.id = v.formation_id
        AND
            v.user_id = (:userId)
        WHERE f.name LIKE (:q) OR f.tag LIKE (:q) OR f.formation LIKE (:q);
      `,
      args: { q: `%${query}%`, userId },
    });
  } else {
    queryResponse = await turso.execute({
      sql: "SELECT * FROM formations WHERE name LIKE (:q) OR tag LIKE (:q) OR formation LIKE (:q)",
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
