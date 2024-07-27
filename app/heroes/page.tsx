"use server";

import { getCmsData } from "@/lib/server/cms-data";
import CharacterSelector from "@/components/CharacterSelector";

export default async function HeroesPage() {
  const characterJsonData = await getCmsData();

  return (
    <div className="container md:text-center">
      <CharacterSelector heroes={characterJsonData}></CharacterSelector>
    </div>
  );
}
