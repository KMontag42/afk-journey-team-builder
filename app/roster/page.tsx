"use server";

import { auth } from "@clerk/nextjs/server";

import { getRosterCmsData } from "@/lib/server/cms-data";
import { type Artifact } from "@/lib/roster";
import Artifacts from "@/components/roster/artifacts/Artifacts";

export default async function MyRoster() {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  const jsonData = await getRosterCmsData();
  const artifacts: Artifact[] = Object.entries(jsonData.artifacts).map(
    ([key, data]: [string, any]) => ({
      key: key,
      imageUrl: data["imageUrl"],
      label: data["label"],
      category: data["category"],
      active: data["active"],
      level: 0,
    }),
  );

  return (
    <div className="container">
      <Artifacts user={userId} artifactList={artifacts} />
    </div>
  );
}
