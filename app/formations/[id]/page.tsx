"use server";

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
  const user = await clerkClient.users.getUser(formation.user_id?.toString()!);

  const cmsData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.NEXT_PUBLIC_SIMPLEJSONCMS_ID}`,
    )
  ).json();

  const data = {
    ...formation,
    user_id: user.username,
    user_image: user.imageUrl,
  };

  return (
    <div className="container md:w-[40vw]">
      <FormationCard data={data as any} cmsData={cmsData} />
      <p>Stats and voting coming soon :)</p>
    </div>
  );
}
