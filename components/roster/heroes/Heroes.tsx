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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import HeroPortrait from "@/components/roster/heroes/HeroPortrait";
import { Check, Star, Unlock, Lock } from "lucide-react";

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
  property: "unlock" | "ascension" | "equipment";
  value: string;
  hero: Hero;
};

function reducer(heroes: Hero[], change: HeroChange) {
  const property = change.property;
  const value = change.value;
  const hero = change.hero;

  switch (property) {
    case "unlock": {
      return heroes.map((h) =>
        h.key === hero.key
          ? { ...h, unlocked: JSON.parse(value.toLowerCase()) }
          : h,
      );
    }
    case "ascension": {
      let ascensionLevel = (
        Object.keys(AscensionLevel) as Array<keyof typeof AscensionLevel>
      ).find((key) => AscensionLevel[key] === value) as AscensionLevel;
      return heroes.map((h) =>
        h.key === hero.key ? { ...h, ascension: ascensionLevel } : h,
      );
    }
    case "equipment": {
      return heroes.map((h) =>
        h.key === hero.key ? { ...h, exEquipment: parseInt(value) } : h,
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

          <DropdownMenuSeparator />
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onSelect={() =>
                dispatch({ property: heroProperty, value: option, hero: hero })
              }
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  selected === option ? "opacity-100" : "opacity-0"
                }`}
              />
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
                <Card className="relative border-0">
                  <CardContent className="flex flex-col justify-center gap-x-2 p-0">
                    <HeroPortrait hero={hero}></HeroPortrait>
                    <div className="absolute bottom-2 max-w-20 mx-auto left-0 right-0 px-1">
                      {isAscensionLevelValid(hero.ascension) ? (
                        <div className="flex flex-row justify-center px-1">
                          {Array.from(
                            { length: hero.exEquipment / 5 + 1 },
                            (_, i) => (
                              <Star
                                key={i}
                                color="#000000"
                                strokeWidth={3}
                                size={20}
                              />
                            ),
                          )}
                        </div>
                      ) : (
                        <div className="h-5"></div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{hero.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unlock-checkbox"
                      checked={hero.unlocked}
                      onCheckedChange={(checked) =>
                        dispatch({
                          property: "unlock",
                          value: checked.toString(),
                          hero: hero,
                        })
                      }
                    />
                    <Label
                      htmlFor="unlock-checkbox"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {hero.unlocked ? (
                        <span className="flex items-center">
                          <Unlock className="h-4 w-4" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Lock className="h-4 w-4" />
                          Locked
                        </span>
                      )}
                    </Label>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {hero.unlocked ? (
                  <>
                    <CustomSelectSubmenu
                      hero={hero}
                      heroProperty="ascension"
                      options={
                        hero.tier === "S"
                          ? Object.values(AscensionLevel).splice(2)
                          : Object.values(AscensionLevel)
                      }
                      selected={hero.ascension.toString()}
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
                  </>
                ) : (
                  <DropdownMenuItem disabled>
                    Unlock to access upgrade options
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
}
