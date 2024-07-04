import "server-only";

import { turso } from "@/lib/turso";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Value } from "@libsql/client";

export type DatabaseFormation = {
  id: Value;
  formation: Value;
  artifact: Value;
  layout: Value;
  name: Value;
  user_id: string;
  user_image: string;
  currentUserLiked?: Value;
};

export async function getFormation(id: string): Promise<DatabaseFormation | false>{
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

  const user = await clerkClient.users.getUser(formation.user_id?.toString()!);

  formation = {
    id: formation.id,
    formation: formation.formation,
    artifact: formation.artifact,
    layout: formation.layout,
    name: formation.name,
    currentUserLiked: formation.currentUserLiked,
    user_id: user.username!,
    user_image: user.imageUrl!,
  };

  return formation;
}

export async function getFormationsForUserId(userId: string): Promise<DatabaseFormation[]> {
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
                v.user_id = (:currentUserId);
            WHERE f.user_id = (:userId);
            `,
      args: { userId, currentUserId },
    });
  } else {
    formations = await turso.execute("SELECT * FROM formations");
  }

  formations = await Promise.all(
    formations.rows.map(async (formation) => {
      const user = await clerkClient.users.getUser(
        formation.user_id?.toString()!,
      );

      return {
        id: formation.id,
        formation: formation.formation,
        artifact: formation.artifact,
        layout: formation.layout,
        name: formation.name,
        currentUserLiked: formation.currentUserLiked,
        user_id: user.username!,
        user_image: user.imageUrl!,
      };
    }),
  );

  return formations;
}
