"use server";

import { auth } from "@clerk/nextjs/server";

import { getFormationsForUserId } from "@/lib/server/formations";
import { getCmsData } from "@/lib/server/cms-data";
import { getUser } from "@/lib/server/users";

import Link from "next/link";
import FormationCard from "@/components/FormationCard";
import { Button } from "@/components/ui/button";

export default async function MyFormations() {
  const { userId } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  const data = await getFormationsForUserId(userId);
  const { username } = await getUser(userId);

  const cmsData = await getCmsData();

  return (
    <div className="container">
      <Link href={`/users/${username}`}>
        <Button variant="analytica" className="mb-4">
          View your profile
        </Button>
      </Link>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((formation) => (
          <FormationCard
            key={formation.id?.toString()}
            data={formation}
            className="mb-4"
            hideUser
            showDelete
            showEdit
            isLink
            cmsData={cmsData}
          />
        ))}
      </div>
    </div>
  );
}
