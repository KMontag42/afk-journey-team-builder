"use server";

import { turso } from "@/lib/turso";
import { auth } from "@clerk/nextjs/server";

import FormationCard from "@/components/FormationCard";

export default async function MyFormations() {
  auth().protect();

  const { userId } = auth();

  const response = await turso.execute({
    sql: "SELECT * FROM formations WHERE user_id = ?",
    args: [userId],
  });

  const data = response.rows;

  return (
    <div>
      <h1>My Formations</h1>
      {data.map((formation) => (
        <FormationCard
          key={formation.id?.toString()}
          data={formation as any}
          hideUser
        />
      ))}
    </div>
  );
}
