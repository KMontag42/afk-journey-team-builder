"use client";

import { useReducer } from "react";
import { Hero } from "@/lib/roster";
import { Card, CardContent } from "@/components/ui/card";
import { AscensionLevel } from "@/lib/characters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HeroPortrait from "@/components/roster/heroes/HeroPortrait";

type SubSelectProps = {
  hero: Hero;
  heroProperty: "ascension" | "equipment";
  options: AscensionLevel[] | string[];
  selected: AscensionLevel | string | null | undefined;
  label: string;
  disabled: boolean;
};

type HeroProps = {
  heroList: Hero[];
};

const isAscensionLevelValid = (level: AscensionLevel | null): boolean => {
  if (!level) return false;
  const validLevels = Object.keys(AscensionLevel).splice(7);
  return validLevels.includes(level);
};

const exclusiveEquipmentOptions = Array.from(
  { length: 6 },
  (_, i) => `${i * 5}`,
);

type HeroChange = {
  property: "ascension" | "equipment";
  level: string;
  hero: Hero;
};

function reducer(heroes: Hero[], change: HeroChange) {
  const property = change.property;
  const level = change.level;
  const hero = change.hero;

  switch (property) {
    case "ascension": {
      let ascensionLevel = (
        Object.keys(AscensionLevel) as Array<keyof typeof AscensionLevel>
      ).find((key) => AscensionLevel[key] === level) as AscensionLevel;
      return heroes.map((h) =>
        h.key === hero.key ? { ...h, ascension: ascensionLevel } : h,
      );
    }
    case "equipment": {
      return heroes.map((h) =>
        h.key === hero.key ? { ...h, exEquipment: parseInt(level) } : h,
      );
    }
    default:
      return heroes;
  }
}

export default function Heroes({ heroList }: HeroProps) {
  const [heroes, dispatch] = useReducer(reducer, heroList);

  const CustomSelectSubmenu = ({
    hero,
    options,
    selected,
    heroProperty,
    label,
    disabled = false,
  }: SubSelectProps) => (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        className={`w-full ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={disabled}
      >
        <span>{label}</span>
      </DropdownMenuSubTrigger>
      {!disabled && (
        <DropdownMenuSubContent className="w-48">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onSelect={() =>
                dispatch({ property: heroProperty, level: option, hero: hero })
              }
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      )}
    </DropdownMenuSub>
  );

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="font-bold text-2xl text-atekgold">Heroes</div>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-1">
        {heroes.map((hero) => (
          <div key={hero.key} className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Card className="border-0">
                  <CardContent className="flex flex-col justify-center gap-x-2 p-0">
                    <HeroPortrait hero={hero}></HeroPortrait>
                  </CardContent>
                </Card>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{hero.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <CustomSelectSubmenu
                  hero={hero}
                  heroProperty="ascension"
                  options={
                    hero.tier === "S"
                      ? Object.values(AscensionLevel).splice(2)
                      : Object.values(AscensionLevel)
                  }
                  selected={hero.ascension}
                  label="Ascension"
                  disabled={false}
                />
                <DropdownMenuSeparator />
                <CustomSelectSubmenu
                  hero={hero}
                  heroProperty="equipment"
                  options={exclusiveEquipmentOptions}
                  selected={hero.exEquipment?.toString()}
                  label="Exclusive Equipment"
                  disabled={!isAscensionLevelValid(hero.ascension)}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
}
