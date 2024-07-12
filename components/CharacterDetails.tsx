"use client";

import { useState } from "react";

import { type CharacterDetail, type SkillDetail } from "@/lib/characters";
import CharacterSelector from "./CharacterSelector";

export default function CharacterDetails({ heroes, heroDetails }: { heroes: any; heroDetails: any }) {
  const CharacterDetails: { [key: string]: CharacterDetail } = heroDetails.characters;

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterDetail | null>(null);

  const setCharacterFromSelector = (id: number) => {
    setSelectedCharacter(CharacterDetails[id]);
  };

  return (
    <>
      <h2>Hero</h2>
      {selectedCharacter && (
        <div>
          <div>Name: {selectedCharacter.name}</div>
          <div>Initial Energy: {selectedCharacter.initialEnergy}</div>
          <div>Ultimate: {selectedCharacter.ultimate.name}</div>
          <div>Skill I: {selectedCharacter.skill1.name}</div>
          <div>Skill II: {selectedCharacter.skill2.name}</div>
          <div>Hero Focus: {selectedCharacter.heroFocus.name}</div>
          <div>Ex Equipment: {selectedCharacter.equipmentSkill.name}</div>
          <div>Enhance Force: {selectedCharacter.enhanceForce.name}</div>
          <div>Seasonal: {selectedCharacter.songOfStrifeSeasonSkill.name}</div>
        </div>
      )}
      <CharacterSelector heroes={heroes} characterSelector={setCharacterFromSelector}></CharacterSelector>
    </>
  );
}
