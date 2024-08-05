"use server";

import { auth } from "@clerk/nextjs/server";

import { getRosterCmsData } from "@/lib/server/cms-data";
import Equipment from "@/components/roster/Equipment";

type CharacterClass = {
  name: string;
  imageUrl: string;
};

export default async function MyRoster() {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  const jsonData = await getRosterCmsData();
  const classes: CharacterClass[] = Object.entries(jsonData.classes).map(
    ([key, data]: [string, any]) => ({
      key: key,
      name: data["name"],
      imageUrl: data["imageUrl"],
    }),
  );

  return (
    <div className="container">
      <Equipment user={userId} characterClasses={classes}></Equipment>
    </div>
  );
}
