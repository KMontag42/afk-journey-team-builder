import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type CharacterFilterType = {
  class: string | "All";
  faction: string | "All";
  name: string | "";
};

type CharacterClass = {
  name: string;
  imageUrl: string;
};

type CharacterFaction = {
  name: string;
  imageUrl: string;
};

type Props = {
  characterFilter: CharacterFilterType;
  updateCharacterFilter(filter: CharacterFilterType): void;
  className?: string;
  classes: { [key: string]: CharacterClass };
  factions: { [key: string]: CharacterFaction };
};

export default function CharacterFilter({
  characterFilter,
  updateCharacterFilter,
  className,
  classes,
  factions,
}: Props) {
  const activeFactionFilter =
    characterFilter.faction !== "All" && factions[characterFilter.faction.toLowerCase()]
  const activeClassFilter =
    characterFilter.class !== "All" && classes[characterFilter.class.toLowerCase()];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn(className, "rounded-full px-2")}>
          <Filter size={24} />
          {activeFactionFilter && (
            <Image
              alt={characterFilter.faction}
              src={activeFactionFilter.imageUrl}
              width={24}
              height={24}
            />
          )}
          {activeClassFilter && characterFilter.class !== "All" && (
            <Image
              alt={characterFilter.faction}
              src={activeClassFilter.imageUrl}
              width={24}
              height={24}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="bg-slate-400">
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(factions).map(([name, data]) => (
            <Image
              key={`filter-faction-${name}`}
              src={data.imageUrl}
              width={64}
              height={64}
              alt={name}
              onClick={() =>
                updateCharacterFilter({
                  ...characterFilter,
                  faction: data.name,
                })
              }
            />
          ))}
          <Button
            variant={characterFilter.faction === "All" ? "secondary" : "ghost"}
            className="py-0 h-auto"
            onClick={() =>
              updateCharacterFilter({
                ...characterFilter,
                faction: "All",
              })
            }
          >
            All
          </Button>

          {Object.entries(classes).map(([name, data]) => (
            <Image
              key={`filter-class-${name}`}
              src={data.imageUrl}
              width={64}
              height={64}
              alt={name}
              onClick={() =>
                updateCharacterFilter({
                  ...characterFilter,
                  class: data.name,
                })
              }
            />
          ))}
          <Button
            variant={characterFilter.class === "All" ? "secondary" : "ghost"}
            className="py-0 h-auto"
            onClick={() =>
              updateCharacterFilter({
                ...characterFilter,
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
