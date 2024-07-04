"use server";

import { auth } from "@clerk/nextjs/server";

import FormationCard from "@/components/FormationCard";
import { getFormationsForUserId } from "@/lib/server/formations";

export default async function MyFormations() {
  const { userId } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  const data = await getFormationsForUserId(userId);

  const cmsData = await (
    await fetch(`https://simplejsoncms.com/api/${process.env.SIMPLEJSONCMS_ID}`)
  ).json();

  return (
    <div className="container md:w-[40vw]">
      {data.map((formation) => (
        <FormationCard
          key={formation.id?.toString()}
          data={formation as any}
          className="mb-4"
          hideUser
          showDelete
          cmsData={cmsData}
        />
      ))}
    </div>
  );
}
