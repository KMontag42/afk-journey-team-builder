'use server';

import { turso } from "@/lib/turso";
import FormationCard from "@/components/FormationCard";
import { clerkClient } from '@clerk/nextjs/server';

async function getFormations() {
  const formation = await turso.execute("SELECT * FROM formations ORDER BY id DESC LIMIT 3");

  if (!formation.rows.length) {
    return { formations: [] };
  }

  const formations = await Promise.all(formation.rows.map(async (formation) => {
    const user = await clerkClient.users.getUser(formation.user_id?.toString()!);
    return {
      id: formation.id,
      name: formation.name,
      tag: formation.tag,
      formation: formation.formation,
      spell: formation.spell,
      layout: formation.layout,
      user_id: user.username,
      user_image: user.imageUrl,
    };
  }));

  return { formations };
}

export default async function NewestFormations() {
  const data = await getFormations();

  return (
    <>
      <h2 className="mb-4">Newest Saved Formations</h2>
      {data.formations.map((formation) => (
        <FormationCard 
          key={formation.id!.toString()}
          data={formation as any}
        />
      ))}
    </>
  );
}
