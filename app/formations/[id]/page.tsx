"use server";

import FormationCard from "@/components/FormationCard";
import { getFormation } from "@/lib/server/formations";

export default async function FormationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const formation = await getFormation(id);

  if (!formation) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  const cmsData = await (
    await fetch(`https://simplejsoncms.com/api/${process.env.SIMPLEJSONCMS_ID}`)
  ).json();

  return (
    <div className="container md:w-[40vw]">
      <FormationCard data={formation as any} cmsData={cmsData} />
    </div>
  );
}
