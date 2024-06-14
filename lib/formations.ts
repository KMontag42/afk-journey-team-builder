'use server';

import { turso } from "@/lib/turso";
import { clerkClient } from "@clerk/nextjs/server";

async function getUser(id: string) {
  const user = await clerkClient.users.getUser(id);

  return {
    user_id: user.username || user.firstName,
    user_image: user.imageUrl,
  };
}

export async function getRecentFormations() {
  const formation = await turso.execute(
    "SELECT * FROM formations ORDER BY id DESC LIMIT 3",
  );

  if (!formation.rows.length) {
    return { formations: [] };
  }

  const formations = await Promise.all(
    formation.rows.map(async (formation) => {
      const user = await getUser(formation.user_id?.toString()!);

      return {
        id: formation.id,
        name: formation.name,
        tag: formation.tag,
        formation: formation.formation,
        spell: formation.spell,
        layout: formation.layout,
        ...user
      };
    }),
  );

  return { formations };
}

export async function searchFormations(query: string) {
  const formation = await turso.execute({
    sql: "SELECT * FROM formations WHERE name LIKE (:q) OR tag LIKE (:q) OR formation LIKE (:q)",
    args: { q:`%${query}%` },
  });

  if (!formation.rows.length) {
    return []
  }

  const formations = await Promise.all(
    formation.rows.map(async (formation) => {
      const user = await getUser(formation.user_id?.toString()!);

      return {
        ...formation,
        ...user
      };
    }),
  );

  return formations;
}
