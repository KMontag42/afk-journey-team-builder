"use server";

import { auth } from "@clerk/nextjs/server";

import { getRosterCmsData } from "@/lib/server/cms-data";
import { Hero, Level, type Artifact } from "@/lib/roster";
import Artifacts from "@/components/roster/artifacts/Artifacts";
import Levels from "@/components/roster/Levels";
import {
  getRosterArtifacts,
  getRosterHeroes,
  getRosterLevels,
} from "@/lib/server/roster";
import Heroes from "@/components/roster/heroes/Heroes";
import { getUser } from "@/lib/server/users";
import UserAvatar from "@/components/UserAvatar";
import { AscensionLevel } from "@/lib/characters";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function MyRoster() {
  const { userId } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  const { user_image, username } = await getUser(userId);

  const rosterJsonData = await getRosterCmsData();

  const rosterLevels = await getRosterLevels(userId);
  const rosterHeroes = await getRosterHeroes(userId);
  const rosterArtifacts = await getRosterArtifacts(userId);

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

  const heroes: Hero[] = Object.entries(rosterJsonData.characters).map(
    ([key, data]: [string, any]) => {
      const foundHero = rosterHeroes.find(
        (hero) => key === hero.heroId.toString(),
      );

      return {
        key: key,
        name: data["name"],
        faction: data["faction"],
        heroClass: data["class"],
        tier: data["tier"],
        imageUrl: data["imageUrl"],
        ascension: foundHero
          ? foundHero.ascension
          : data["tier"] === "S"
            ? AscensionLevel.Epic
            : AscensionLevel.Elite,
        exEquipment: foundHero ? foundHero.equipment : 0,
        unlocked: foundHero ? true : false,
      };
    },
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
      <Tabs className="flex flex-col items-center pb-8" defaultValue="heroes">
        <TabsList className="grid max-w-screen-md grid-cols-3">
          <TabsTrigger value="heroes">Heroes</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>
        <TabsContent value="heroes">
          <Card className="bg-slate-900">
            <CardContent className="p-2 md:p-6">
              <Heroes heroList={heroes} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="artifacts">
          <Card className="bg-slate-900">
            <CardContent className="p-2 md:p-6">
              <Artifacts artifactList={artifacts} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
