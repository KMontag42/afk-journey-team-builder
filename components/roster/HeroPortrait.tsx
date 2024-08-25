"use client";

import Image from "next/image";
import { Hero } from "@/lib/roster";

type PortraitProps = {
  hero: Hero;
};

export default function HeroPortrait({ hero }: PortraitProps) {
  return (
    <div className="relative">
      <Image
        alt={hero.name}
        src={hero.imageUrl}
        width={128}
        height={128}
        className="p-1"
      />
    </div>
  );
}
