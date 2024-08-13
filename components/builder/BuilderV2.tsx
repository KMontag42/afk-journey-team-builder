"use client";

import Image from "next/image";
import { useState } from "react";

import type {
  ArtifactsCmsData,
  CharacterCmsData,
  CharacterData,
} from "@/lib/cms-types";
import { cn } from "@/lib/utils";
import { slotImageUrls } from "@/lib/images";
import { mapLayout, type MapTile } from "@/components/builder/mapData";

import { Separator } from "@/components/ui/separator";
import HeroDrawer from "@/components/builder/HeroDrawer";

type BuilderProps = {
  characters: CharacterCmsData;
  artifacts: ArtifactsCmsData;
};

type FormationEntry = {
  character: CharacterData;
  ally: Boolean;
  row: number;
  col: number;
};

export default function BuilderV2({ characters, artifacts }: BuilderProps) {
  // TODO: make this read from the profile's roster later on
  const favoriteCharacters = Object.values(characters).slice(0, 5);

  const [formation, setFormation] = useState<FormationEntry[]>(
    favoriteCharacters.map(
      (character, i) =>
        ({
          character,
          ally: false,
          row: mapLayout.length - 1 - Math.floor(i / 2),
          col: i % 2 === 0 ? 2 : 4,
        }) as FormationEntry,
    ),
  );

  return (
    <>
      <section className="flex flex-col items-center rotate-[30deg]">
        {mapLayout.map((row: MapTile[], i) => (
          <div
            className={cn("grid grid-cols-7 gap-0", i > 0 ? "-mt-[25px]" : "")}
            key={i}
          >
            {row.map((tile: MapTile, j) =>
              tile.type !== "empty" ? (
                <div key={j}>
                  <Image
                    src={slotImageUrls[tile.position?.toString() ?? "1"]}
                    height={50}
                    width={42}
                    alt="Tile"
                    className={cn(
                      "rotate-[-30deg]",
                      tile.type !== "ally" ? "brightness-50" : "",
                    )}
                  />
                </div>
              ) : (
                <div key={j} className="invisible w-8" />
              ),
            )}
          </div>
        ))}
      </section>
      <section className="flex gap-4 pt-8">
        <div>
          {Object.values(artifacts)
            .slice(0, 1)
            .map((artifact) => (
              <div key={artifact.value} className="w-12 h-14 relative">
                <Image src={artifact.imageUrl} fill alt={artifact.label} />
              </div>
            ))}
        </div>
        <Separator orientation="vertical" />
        <div className="flex gap-2">
          {Object.values(characters)
            .slice(0, 5)
            .map((character) => (
              <HeroDrawer
                key={character.id}
                character={character}
                characters={characters}
              />
            ))}
        </div>
      </section>
    </>
  );
}
