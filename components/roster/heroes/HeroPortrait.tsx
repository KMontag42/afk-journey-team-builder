"use client";

import Image, { StaticImageData } from "next/image";
import {
  CharacterClasses,
  FactionIcons,
  Hero,
  HeroBackgrounds,
} from "@/lib/roster";
import { AscensionLevel, CharacterClass, Faction } from "@/lib/characters";

type PortraitProps = {
  hero: Hero;
};

function getBackground(ascensionLevel: AscensionLevel): StaticImageData {
  return HeroBackgrounds[AscensionLevel[ascensionLevel]];
}

function getFaction(faction: Faction): StaticImageData {
  return FactionIcons[faction.toLocaleLowerCase()];
}

function getClass(heroClass: CharacterClass): StaticImageData {
  return CharacterClasses[heroClass.toLocaleLowerCase()];
}

export default function HeroPortrait({ hero }: PortraitProps) {
  return (
    <div className={hero.unlocked ? "relative" : "grayscale relative"}>
      <Image
        alt={hero.ascension}
        src={getBackground(hero.ascension)}
        width={96}
        height={96}
        className="p-1"
      />
      <Image
        alt={hero.name}
        src={hero.imageUrl}
        width={84}
        height={84}
        className="absolute mx-auto left-0 right-0 top-[15%] p-2 rounded-full"
      />
      <Image
        alt={hero.faction}
        src={getFaction(hero.faction)}
        width={16}
        height={16}
        className="absolute mx-auto left-2 bottom-2"
      />
      <Image
        alt={hero.heroClass}
        src={getClass(hero.heroClass)}
        width={14}
        height={14}
        className="absolute mx-auto right-2 bottom-2"
      />
    </div>
  );
}
