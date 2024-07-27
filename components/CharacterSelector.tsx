"use client";

import { useState } from "react";
import Image from "next/image";

import { type Character } from "@/lib/characters";

import { ScrollArea } from "@/components/ui/scroll-area";
import CharacterFilter, {
  CharacterFilterType,
} from "@/components/CharacterFilter";
import Link from "next/link";

export default function CharacterSelector({ heroes }: { heroes: any }) {
  const Characters: { [key: string]: Character } = heroes.characters;

  const [characterFilter, setCharacterFilter] = useState<CharacterFilterType>({
    class: "All",
    faction: "All",
    name: "",
  });

  const characterObjects = Object.values(Characters);

  const characters = characterObjects
    .filter((character) => {
      return (
        (characterFilter.faction === "All" ||
          character.faction === characterFilter.faction) &&
        (characterFilter.class === "All" ||
          character.class === characterFilter.class)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col py-4 justify-center items-center">
      <CharacterFilter
        classes={heroes.classes}
        factions={heroes.factions}
        characterFilter={characterFilter}
        updateCharacterFilter={setCharacterFilter}
      />

      <ScrollArea className="flex flex-col justify-center items-center max-w-screen-md mt-4">
        <div className={`grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2 mx-2`}>
          {characters.map((character) => {
            if (character.hide) return null;
            const className = "w-24 h-26 cursor-pointer";
            return (
              <Link href={"/heroes/" + character.id}>
                <Image
                  key={character.name}
                  src={character.tileUrl}
                  width={56}
                  height={64}
                  alt={character.name}
                  className={className}
                />
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
