"use client";

import Image, { StaticImageData } from "next/image";
import { Hero } from "@/lib/roster";
import { AscensionLevel, CharacterClass, Faction } from "@/lib/characters";
import { heroImages, rosterImages, tekImages } from "@/lib/images";

type PortraitProps = {
  hero: Hero;
};

function getBackground(ascensionLevel: AscensionLevel): StaticImageData {
  switch (AscensionLevel[ascensionLevel as keyof typeof AscensionLevel]) {
    case AscensionLevel.Elite:
      return rosterImages.eliteBackground;
    case AscensionLevel.EliteP:
      return rosterImages.elitePBackground;
    case AscensionLevel.Epic:
      return rosterImages.epicBackground;
    case AscensionLevel.EpicP:
      return rosterImages.epicPBackground;
    case AscensionLevel.Legendary:
      return rosterImages.legendaryBackground;
    case AscensionLevel.LegendaryP:
      return rosterImages.legendaryPBackground;
    case AscensionLevel.Mythic:
      return rosterImages.mythicBackground;
    case AscensionLevel.MythicP:
      return rosterImages.mythicPBackground;
    case AscensionLevel.Supreme:
      return rosterImages.supremeBackground;
    case AscensionLevel.SupremeP:
      return rosterImages.supremePBackground;
    case AscensionLevel.Paragon1:
      return rosterImages.paragon1Background;
    case AscensionLevel.Paragon2:
      return rosterImages.paragon2Background;
    case AscensionLevel.Paragon3:
      return rosterImages.paragon3Background;
    case AscensionLevel.Paragon4:
      return rosterImages.paragon4Background;
    default:
      return rosterImages.eliteBackground;
  }
}

function getFaction(faction: Faction): StaticImageData {
  switch (faction.toLocaleLowerCase()) {
    case Faction.Lightbearer:
      return heroImages.Lightbearer;
    case Faction.Mauler:
      return heroImages.Mauler;
    case Faction.Wilder:
      return heroImages.Wilder;
    case Faction.Graveborn:
      return heroImages.Graveborn;
    case Faction.Celestial:
      return heroImages.Celestial;
    case Faction.Hypogean:
      return heroImages.Hypogean;
    default:
      return tekImages.emptyHex;
  }
}

function getClass(heroClass: CharacterClass): StaticImageData {
  switch (heroClass.toLocaleLowerCase()) {
    case CharacterClass.Mage:
      return heroImages.Mage;
    case CharacterClass.Marksman:
      return heroImages.Marksman;
    case CharacterClass.Rogue:
      return heroImages.Rogue;
    case CharacterClass.Support:
      return heroImages.Support;
    case CharacterClass.Tank:
      return heroImages.Tank;
    case CharacterClass.Warrior:
      return heroImages.Warrior;
    default:
      return tekImages.emptyHex;
  }
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
