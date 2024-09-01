"use server";

import { auth } from "@clerk/nextjs/server";

import { getRosterCmsData } from "@/lib/server/cms-data";
import { Hero, Level, type Artifact } from "@/lib/roster";
import Artifacts from "@/components/roster/artifacts/Artifacts";
import Levels from "@/components/roster/Levels";
import { getRosterArtifacts, getRosterLevels } from "@/lib/server/roster";
import Heroes from "@/components/roster/heroes/Heroes";
import { getUser } from "@/lib/server/users";
import UserAvatar from "@/components/UserAvatar";
import { AscensionLevel } from "@/lib/characters";

export default async function MyRoster() {
  const { userId } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  const { user_image, username } = await getUser(userId);

  const rosterJsonData = await getRosterCmsData();

  const rosterArtifacts = await getRosterArtifacts(userId);
  const rosterLevels = await getRosterLevels(userId);

  function getLevelForLevelsFromData(key: string): number {
    let level = rosterLevels.find(
      (level) => level.levelId.toString() === key,
    )?.level;

    return level ? level : 0;
  }

  const levels: Level[] = Object.entries(rosterJsonData.seasons).map(
    ([key, data]: [string, any]) => ({
      key: key,
      seasonName: data["name"],
      maxLevel: data["maxLevel"],
      active: data["active"],
      level: getLevelForLevelsFromData(key),
    }),
  );

  // function getHeroesFromData

  const heroes: Hero[] = Object.entries(rosterJsonData.characters).map(
    ([key, data]: [string, any]) => ({
      key: key,
      name: data["name"],
      faction: data["faction"],
      heroClass: data["class"],
      tier: data["tier"],
      imageUrl: data["imageUrl"],
      ascension:
        data["tier"] === "S" ? AscensionLevel.Epic : AscensionLevel.Elite,
      exEquipment: 0,
      unlocked: false,
    }),
  );

  function getLevelForArtifactFromData(key: string): number {
    let level = rosterArtifacts.find(
      (artifact) => artifact.artifactId.toString() === key,
    )?.level;

    return level ? level : 0;
  }

  const artifacts: Artifact[] = Object.entries(rosterJsonData.artifacts).map(
    ([key, data]: [string, any]) => ({
      key: key,
      imageUrl: data["imageUrl"],
      label: data["label"],
      category: data["category"],
      active: data["active"],
      maxLevel: data["maxLevel"],
      level: getLevelForArtifactFromData(key),
    }),
  );

  return (
    <div className="container flex flex-col flex-wrap justify-center">
      <div className="flex flex-row justify-center items-center gap-x-4">
        <UserAvatar userName={username!} userImage={user_image} />
      </div>
      <Levels levelList={levels} />
      <div className="flex flex-row flex-wrap justify-center gap-8 pb-8">
        <div>
          <Heroes heroList={heroes} />
        </div>
        <div>
          <Artifacts artifactList={artifacts} />
        </div>
      </div>
    </div>
  );
}
