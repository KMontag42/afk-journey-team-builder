"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import Image from "next/image";
import { FactionImages, ClassImages } from "@/lib/images";
import { Faction, CharacterClass } from "@/lib/characters";
import { cn } from "@/lib/utils";

export type CharacterFilterType = {
  class: CharacterClass | "All";
  faction: Faction | "All";
};

export default function CharacterFilter(props: {
  characterFilter: CharacterFilterType;
  updateCharacterFilter: (filter: CharacterFilterType) => void;
  className?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn(props.className, "rounded-full px-2")}>
          <Filter size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="bg-slate-400">
        <div className="grid grid-cols-7 gap-2">
          <Image
            src={FactionImages[Faction.Celestial.toString()]}
            width={64}
            height={64}
            alt="Celestial"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                faction: Faction.Celestial,
              })
            }
          />
          <Image
            src={FactionImages[Faction.Graveborn.toString()]}
            width={64}
            height={64}
            alt="Graveborn"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                faction: Faction.Graveborn,
              })
            }
          />
          <Image
            src={FactionImages[Faction.Hypogean.toString()]}
            width={64}
            height={64}
            alt="Hypogean"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                faction: Faction.Hypogean,
              })
            }
          />
          <Image
            src={FactionImages[Faction.Lightbearer.toString()]}
            width={64}
            height={64}
            alt="Lightbearer"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                faction: Faction.Lightbearer,
              })
            }
          />
          <Image
            src={FactionImages[Faction.Mauler.toString()]}
            width={64}
            height={64}
            alt="Mauler"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                faction: Faction.Mauler,
              })
            }
          />
          <Image
            src={FactionImages[Faction.Wilder.toString()]}
            width={64}
            height={64}
            alt="Wilder"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                faction: Faction.Wilder,
              })
            }
          />
          <Button
            variant={
              props.characterFilter.faction === "All" ? "secondary" : "ghost"
            }
            className="py-0 h-auto"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                faction: "All",
              })
            }
          >
            All
          </Button>

          <Image
            src={ClassImages[CharacterClass.Mage.toString()]}
            width={64}
            height={64}
            alt="Mage"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                class: CharacterClass.Mage,
              })
            }
          />
          <Image
            src={ClassImages[CharacterClass.Marksman.toString()]}
            width={64}
            height={64}
            alt="Marksman"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                class: CharacterClass.Marksman,
              })
            }
          />
          <Image
            src={ClassImages[CharacterClass.Rogue.toString()]}
            width={64}
            height={64}
            alt="Rogue"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                class: CharacterClass.Rogue,
              })
            }
          />
          <Image
            src={ClassImages[CharacterClass.Support.toString()]}
            width={64}
            height={64}
            alt="Support"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                class: CharacterClass.Support,
              })
            }
          />
          <Image
            src={ClassImages[CharacterClass.Tank.toString()]}
            width={64}
            height={64}
            alt="Tank"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                class: CharacterClass.Tank,
              })
            }
          />
          <Image
            src={ClassImages[CharacterClass.Warrior.toString()]}
            width={64}
            height={64}
            alt="Warrior"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                class: CharacterClass.Warrior,
              })
            }
          />
          <Button
            variant={
              props.characterFilter.class === "All" ? "secondary" : "ghost"
            }
            className="py-0 h-auto"
            onClick={() =>
              props.updateCharacterFilter({
                ...props.characterFilter,
                class: "All",
              })
            }
          >
            All
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
