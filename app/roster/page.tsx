"use server";

import { auth } from "@clerk/nextjs/server";

import { getRosterCmsData } from "@/lib/server/cms-data";
import Equipment from "@/components/roster/Equipment";
import { CharacterClass, Season } from "@/lib/roster";

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
  const seasons: Season[] = Object.entries(jsonData.seasons).map(
    ([key, data]: [string, any]) => ({
      key: key,
      name: data["name"],
    }),
  );

  return (
    <div className="container">
      <Equipment
        user={userId}
        characterClasses={classes}
        seasonList={seasons}
      ></Equipment>
    </div>
  );
}
