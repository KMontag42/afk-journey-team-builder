"use server";

import { turso } from "@/lib/turso";
import { auth } from "@clerk/nextjs/server";

import FormationCard from "@/components/FormationCard";

export default async function MyFormations() {
  const { userId } = auth();

  if (!userId) {
    auth().redirectToSignIn();
  }

  const response = await turso.execute({
    sql: "SELECT * FROM formations WHERE user_id = ?",
    args: [userId],
  });

  const data = response.rows.map((row) => {
    return {
      id: row.id?.toString()!,
      name: row.name?.toString()!,
      formation: row.formation?.toString()!,
      artifact: row.artifact?.toString()!,
      layout: row.layout?.valueOf()! as number,
    };
  });

  const cmsData = await (
    await fetch(`https://simplejsoncms.com/api/${process.env.SIMPLEJSONCMS_ID}`)
  ).json();

  return (
    <div className="container md:w-[40vw]">
      {data.map((formation) => (
        <FormationCard
          key={formation.id?.toString()}
          data={formation}
          className="mb-4"
          hideUser
          showDelete
          cmsData={cmsData}
        />
      ))}
    </div>
  );
}
