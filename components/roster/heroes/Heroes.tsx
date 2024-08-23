"use client";

import Image from "next/image";
import { Hero } from "@/lib/roster";
import { Card, CardContent } from "@/components/ui/card";
import { AscensionLevel } from "@/lib/characters";
import { Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeroProps = {
  heroList: Hero[];
};

export default function Heroes({ heroList }: HeroProps) {
  function getBackgroundColor(ascensionLevel: AscensionLevel): string {
    switch (ascensionLevel) {
      case AscensionLevel.Elite:
        return "elite";
      case AscensionLevel.Epic:
        return "epic";
      default:
        return "elite";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="font-bold text-2xl text-atekgold">Heroes</div>
      <div className="grid grid-cols-3 md:grid-cols-8 gap-4">
        {heroList.map((hero) => (
          <div key={hero.key} className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Card className={getBackgroundColor(hero.ascension)}>
                  <CardContent className="flex flex-col justify-center gap-x-2 p-0">
                    <div>
                      <Image
                        alt={hero.name}
                        src={hero.imageUrl}
                        width={128}
                        height={128}
                        className="p-1"
                      />
                      <div className="flex flex-row justify-center px-1">
                        {Array.from({ length: 6 }, (_, i) => (
                          <Star
                            key={i}
                            color="#000000"
                            strokeWidth={3}
                            size={20}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{hero.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Ascension Tier
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {hero.tier === "S"
                          ? Object.values(AscensionLevel)
                              .splice(2)
                              .map((ascLevel) => (
                                <DropdownMenuItem key={ascLevel}>
                                  {ascLevel}
                                </DropdownMenuItem>
                              ))
                          : Object.values(AscensionLevel).map((ascLevel) => (
                              <DropdownMenuItem key={ascLevel}>
                                {ascLevel}
                              </DropdownMenuItem>
                            ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Exclusive Equipment
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>More...</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
}
