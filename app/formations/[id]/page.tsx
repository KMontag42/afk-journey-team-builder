'use server';

import { turso } from "@/lib/turso";
import { clerkClient } from "@clerk/nextjs/server";

import FormationCard from "@/components/FormationCard";

export default async function FormationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const response = await turso.execute({
    sql: "SELECT * FROM formations WHERE id = ?",
    args: [id],
  });

  if (!response.rows.length) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  const formation = response.rows[0]!;
  const user = await clerkClient.users.getUser(
    formation.user_id?.toString()!,
  );

  const data = {
    ...formation,
    user_id: user.username,
    user_image: user.imageUrl,
  }

  return (
    <div className="flex flex-col items-center mr-6 my-4">
      <FormationCard
        data={data as any}
      />
      <p>Stats and voting coming soon :)</p>
    </div>
  );
}
