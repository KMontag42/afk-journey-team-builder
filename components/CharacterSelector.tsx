"use client";

import { useState } from "react";
import Image from "next/image";

import { type Character } from "@/lib/characters";

import { ScrollArea } from "@/components/ui/scroll-area";
import CharacterFilter, { CharacterFilterType } from "@/components/CharacterFilter";

export default function CharacterSelector({ heroes, characterSelector }: { heroes: any, characterSelector: Function }) {
  const Characters: { [key: string]: Character } = heroes.characters;

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const [characterFilter, setCharacterFilter] = useState<CharacterFilterType>({
    class: "All",
    faction: "All",
  });

  const characterObjects = Object.values(Characters);

  const characters = characterObjects
    .filter((character) => {
      return (
        (characterFilter.faction === "All" || character.faction === characterFilter.faction) &&
        (characterFilter.class === "All" || character.class === characterFilter.class)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  function onCharacterClick(character: Character) {
    setSelectedCharacter(character);
    characterSelector(character.id);
  }

  return (
    <>
      <div className="flex flex-col py-4 justify-center items-center">
        <CharacterFilter
          classes={heroes.classes}
          factions={heroes.factions}
          characterFilter={characterFilter}
          updateCharacterFilter={setCharacterFilter}
        />

        <ScrollArea
          className="flex flex-col justify-center items-center max-w-screen-md mt-4 max-h-64"
        >
          <div className={`grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2`}>
            {characters.map((character) => {
              if (character.hide) return null;
              const isSelected = selectedCharacter === character;
              const className = `w-14 h-16`;
              return (
                <Image
                  key={character.name}
                  src={character.tileUrl}
                  width={56}
                  height={64}
                  alt={character.name}
                  className={className}
                  onClick={() => onCharacterClick(character)}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
