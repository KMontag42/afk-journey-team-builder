"use client";

import Image from "next/image";
import { Hero } from "@/lib/roster";
import { AscensionLevel } from "@/lib/characters";
import { Star } from "lucide-react";

type PortraitProps = {
  hero: Hero;
};

function getBackground(ascensionLevel: AscensionLevel): string {
  switch (AscensionLevel[ascensionLevel as keyof typeof AscensionLevel]) {
    case AscensionLevel.Elite:
      return "https://i.imgur.com/7WIkXCw.png";
    case AscensionLevel.EliteP:
      return "https://i.imgur.com/3TwZnb4.png";
    case AscensionLevel.Epic:
      return "https://i.imgur.com/mmdu9Jd.png";
    case AscensionLevel.EpicP:
      return "https://i.imgur.com/KrPayAy.png";
    case AscensionLevel.Legendary:
      return "https://i.imgur.com/qrLyrtC.png";
    case AscensionLevel.LegendaryP:
      return "https://i.imgur.com/X28kNi4.png";
    case AscensionLevel.Mythic:
      return "https://i.imgur.com/2cZEihz.png";
    case AscensionLevel.MythicP:
      return "https://i.imgur.com/nNVXPTk.png";
    case AscensionLevel.Supreme:
      return "https://i.imgur.com/FN90HOz.png";
    case AscensionLevel.SupremeP:
      return "https://i.imgur.com/gUD5Iyc.png";
    case AscensionLevel.Paragon1:
      return "https://i.imgur.com/rE9cncY.png";
    case AscensionLevel.Paragon2:
      return "https://i.imgur.com/WOInJyt.png";
    case AscensionLevel.Paragon3:
      return "https://i.imgur.com/ZgFFVY2.png";
    case AscensionLevel.Paragon4:
      return "https://i.imgur.com/zc4yoVj.png";
    default:
      return "https://i.imgur.com/gvMHYet.png";
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
        width={90}
        height={90}
        className="absolute mx-auto left-0 right-0 top-[7%] p-2"
      />
    </div>
  );
}
