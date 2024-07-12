"use server";

import { getCharacterDetailsCmsData, getCmsData } from "@/lib/server/cms-data";
import CharacterDetails from "@/components/CharacterDetails";
import CharacterSelector from "@/components/CharacterSelector";
import { type CharacterDetail, Character } from "@/lib/characters";

export default async function HeroesPage() {
  const characterJsonData = await getCmsData();
  const detailJsonData = await getCharacterDetailsCmsData();

  return (
    <div className="container md:text-center">
        <CharacterDetails heroes={characterJsonData} heroDetails={detailJsonData}></CharacterDetails>
    </div>
  );
}
