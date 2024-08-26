"use client";

import Image from "next/image";
import { Hero } from "@/lib/roster";
import { AscensionLevel } from "@/lib/characters";

type PortraitProps = {
  hero: Hero;
};

function getBackground(ascensionLevel: AscensionLevel): string {
  switch (AscensionLevel[ascensionLevel as keyof typeof AscensionLevel]) {
    case AscensionLevel.Elite:
    case AscensionLevel.EliteP:
      return "https://i.imgur.com/8tr9bwg.png";
    case AscensionLevel.Epic:
    case AscensionLevel.EpicP:
      return "https://i.imgur.com/rgNkyID.png";
    case AscensionLevel.Legendary:
    case AscensionLevel.LegendaryP:
      return "https://i.imgur.com/lK5Q4SG.png";
    case AscensionLevel.Mythic:
    case AscensionLevel.MythicP:
      return "https://i.imgur.com/GXRxNob.png";
    case AscensionLevel.Supreme:
    case AscensionLevel.SupremeP:
    case AscensionLevel.Paragon1:
    case AscensionLevel.Paragon2:
    case AscensionLevel.Paragon3:
    case AscensionLevel.Paragon4:
      return "https://i.imgur.com/xfBTfXX.png";
    default:
      return "https://i.imgur.com/gvMHYet.png";
  }
}

function getForeground(ascensionLevel: AscensionLevel): string {
  switch (AscensionLevel[ascensionLevel as keyof typeof AscensionLevel]) {
    case AscensionLevel.Elite:
      return "https://i.imgur.com/T9KtUrk.png";
    case AscensionLevel.EliteP:
      return "https://i.imgur.com/GTS9c00.png";
    case AscensionLevel.Epic:
      return "https://i.imgur.com/nEyrHgC.png";
    case AscensionLevel.EpicP:
      return "https://i.imgur.com/4h8d3YJ.png";
    case AscensionLevel.Legendary:
      return "https://i.imgur.com/PSRWzbp.png";
    case AscensionLevel.LegendaryP:
      return "https://i.imgur.com/NJO1WSl.png";
    case AscensionLevel.Mythic:
      return "https://i.imgur.com/BM6w7yt.png";
    case AscensionLevel.MythicP:
      return "https://i.imgur.com/3aI47Xw.png";
    case AscensionLevel.Supreme:
    case AscensionLevel.SupremeP:
    case AscensionLevel.Paragon1:
    case AscensionLevel.Paragon2:
    case AscensionLevel.Paragon3:
    case AscensionLevel.Paragon4:
      return "https://i.imgur.com/BM6w7yt.png";
    default:
      return "https://i.imgur.com/gvMHYet.png";
  }
}

function getFrame(ascensionLevel: AscensionLevel): string {
  switch (AscensionLevel[ascensionLevel as keyof typeof AscensionLevel]) {
    case AscensionLevel.Supreme:
      return "https://i.imgur.com/1PfvpBW.png";
    case AscensionLevel.SupremeP:
      return "https://i.imgur.com/YVXRbGq.png";
    case AscensionLevel.Paragon1:
      return "https://i.imgur.com/LL35td4.png";
    case AscensionLevel.Paragon2:
      return "https://i.imgur.com/FzlR2EA.png";
    case AscensionLevel.Paragon3:
      return "https://i.imgur.com/M7tFDu0.png";
    case AscensionLevel.Paragon4:
      return "https://i.imgur.com/6Q7igRp.png";
    default:
      return "";
  }
}

const includeFrame = (level: AscensionLevel | null): boolean => {
  if (!level) return false;
  const validLevels = Object.keys(AscensionLevel).splice(8);
  return validLevels.includes(level);
};

export default function HeroPortrait({ hero }: PortraitProps) {
  return (
    <div className="relative">
      <div className="relative">
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
          width={90}
          height={90}
          className="absolute mx-auto left-0 right-0 top-[7%] p-2"
        />
        <Image
          alt={hero.ascension}
          src={getForeground(hero.ascension)}
          width={128}
          height={128}
          className="absolute bottom-0 p-1.5"
        />
      </div>
      {includeFrame(hero.ascension) && (
        <Image
          alt={hero.ascension}
          src={getFrame(hero.ascension)}
          fill={true}
        />
      )}
    </div>
  );
}
