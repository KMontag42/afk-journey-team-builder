"use server";

import { auth } from "@clerk/nextjs/server";

import { getFormationsForUserId } from "@/lib/server/formations";
import { getCmsData } from "@/lib/server/cms-data";
import { getUser } from "@/lib/server/users";

import Link from "next/link";
import FormationCard from "@/components/FormationCard";

export default async function MyFormations() {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  const data = await getFormationsForUserId(userId);
  const { username } = await getUser(userId);

  const cmsData = await getCmsData();

  return (
    <div className="container md:w-[40vw]">
      <Link href={`/users/${username}`} className="underline text-blue-400">
        View your profile
      </Link>
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
