"use client";

import { useState, createRef, useCallback } from "react";
import { useQueryState } from "nuqs";
import { type Character, Characters } from "@/lib/characters";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { track } from "@vercel/analytics";
import Image from "next/image";
import { Share, Download } from "lucide-react";

import CharacterFilter, {
  CharacterFilterType,
} from "@/components/CharacterFilter";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import BaseLayout from "@/components/layouts/base";
import Arena1Layout from "@/components/layouts/Arena1";
import Arena2Layout from "@/components/layouts/Arena2";
import Arena3Layout from "@/components/layouts/Arena3";
import Arena4Layout from "@/components/layouts/Arena4";
import { characterImages } from "@/lib/images";

const layouts: {
  [key: number]: { Component: React.ElementType; numTiles: number };
} = {
  0: { Component: BaseLayout, numTiles: 13 },
  1: { Component: Arena1Layout, numTiles: 10 },
  2: { Component: Arena2Layout, numTiles: 10 },
  3: { Component: Arena3Layout, numTiles: 9 },
  4: { Component: Arena4Layout, numTiles: 11 },
};

const layoutHeights: { [key: number]: number } = {
  0: 24,
  1: 24,
  2: 32,
  3: 32,
  4: 32,
};

const layoutExportWidths: { [key: number]: number } = {
  0: 360,
  1: 360,
  2: 300,
  3: 360,
  4: 460,
};

const layoutExportMargins: { [key: number]: string } = {
  0: "-1rem",
  1: "-1rem",
  2: "1rem",
  3: "-1rem",
  4: "0",
};

export default function Builder({ data }: { data: any }) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [formation, setFormation] = useQueryState<string[]>("formation", {
    parse: (query: string): string[] => atob(query).split(","),
    serialize: (formation: string[]) => btoa(formation.join(",")),
    defaultValue: new Array<string>(13).fill(""),
  });
  const charactersNotInFormation = Characters.filter(
    (character) => !formation.includes(character.name),
  );
  const [characters, setCharacters] = useState<Character[]>(
    charactersNotInFormation.sort(),
  );
  const [spell, setSpell] = useQueryState<string>("spell", {
    parse: (query: string): string => atob(query),
    serialize: (spell: string) => btoa(spell),
    defaultValue: "blazing",
  });
  const [layout, setLayout] = useQueryState<number>("map", {
    parse: (query: string): number => parseInt(query),
    serialize: (layout: number) => layout.toString(),
    defaultValue: 0,
  });
  const [characterFilter, setCharacterFilter] = useState<CharacterFilterType>({
    class: "All",
    faction: "All",
  });

  const changeLayout = (newLayoutId: number) => {
    const existingLayoutTiles = layouts[layout].numTiles;
    const newLayoutTiles = layouts[newLayoutId].numTiles;

    if (newLayoutTiles < existingLayoutTiles) {
      setFormation((formation) => formation.slice(0, newLayoutTiles));
      setCharacters(
        Characters.filter((character) => !formation.includes(character.name)),
      );
    } else if (newLayoutTiles > existingLayoutTiles)
      setFormation(
        Array.from({ length: newLayoutTiles }).map((_, i) => formation[i]),
      );
    setLayout(newLayoutId);
  };

  const formationRef = createRef<HTMLDivElement>();

  function updateFormation(slot: number, character: Character) {
    const characterInSlot = formation[slot];
    const characterIndex = formation.indexOf(character.name);
    const formationCharacters = formation.filter(
      (character) => character !== "",
    );
    const formationCopy = [...formation];
    const formationHasPhraesto = formation.includes("Phraesto");
    let newCharacters = [...characters];
    let maxCharacters = formationHasPhraesto ? 6 : 5;

    if (characterInSlot === character.name) {
      // remove character from slot, add back to characters
      formationCopy[slot] = "";
      newCharacters.push(character);

      if (character.name === "Phraesto" || character.name === "PhraestoClone") {
        // remove Phraesto from formation
        formationCopy[formationCopy.indexOf("Phraesto")] = "";
        formationCopy[formationCopy.indexOf("PhraestoClone")] = "";
        newCharacters.push(Characters.find((x) => x.name === "Phraesto")!);
      }
    } else if (characterIndex !== -1) {
      // swap characters
      formationCopy[slot] = character.name;
      formationCopy[characterIndex] = characterInSlot;
      newCharacters = newCharacters.filter(
        (character) => character.name !== characterInSlot,
      );
      newCharacters = newCharacters.filter(
        (character) => character !== selectedCharacter,
      );
    } else if (formationCharacters.length < maxCharacters) {
      // add character to slot
      newCharacters = newCharacters.filter(
        (character) => character !== selectedCharacter,
      );

      if (characterInSlot !== "") {
        newCharacters.push(Characters.find((x) => x.name === characterInSlot)!);
      }

      formationCopy[slot] = character.name;

      if (character.name === "Phraesto") {
        const firstOpenSlot = formationCopy.indexOf("");
        formationCopy[firstOpenSlot] = "PhraestoClone";
      }
    } else if (
      formationCharacters.length === maxCharacters &&
      characterInSlot !== ""
    ) {
      // swap characters
      newCharacters = newCharacters.filter(
        (character) => character !== selectedCharacter,
      );
      newCharacters.push(Characters.find((x) => x.name === characterInSlot)!);

      formationCopy[slot] = character.name;
    }

    // remove duplicates
    newCharacters = newCharacters.filter(
      (value, index, self) => self.indexOf(value) === index,
    );

    setFormation(formationCopy);
    setCharacters(newCharacters.sort((a, b) => a.name.localeCompare(b.name)));
  }

  function updateCharacterFilter(filter: CharacterFilterType) {
    setCharacterFilter(filter);
    setCharacters(
      charactersNotInFormation
        .filter((character) => {
          return (
            (filter.faction === "All" ||
              character.faction === filter.faction) &&
            (filter.class === "All" || character.class === filter.class)
          );
        })
        .sort(),
    );
  }

  const onDownloadButtonClick = useCallback(() => {
    toPng(formationRef.current!, {
      height: (layoutHeights[layout] ?? 24) * 13, // 16px per rem
      width: layoutExportWidths[layout] ?? 420,
      style: { marginLeft: layoutExportMargins[layout] ?? "-1rem" },
      includeQueryParams: true,
      cacheBust: true,
    }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "formation.png";
      link.href = dataUrl;
      link.click();
      track("formation_downloaded", {
        formation: formation.join(","),
        spell: spell,
        url: window.location.href,
      });
    });
  }, [formationRef]);

  function onCharacterClick(character: Character) {
    setSelectedCharacter(character);
  }

  function onCharacterSlotClick(slot: number) {
    const slotNumber = slot - 1;
    if (selectedCharacter) {
      updateFormation(slotNumber, selectedCharacter);
      setSelectedCharacter(null);
    } else if (formation[slotNumber]) {
      const _character = Characters.find(
        (character) => character.name === formation[slotNumber],
      );
      setSelectedCharacter(_character!);
    }
  }

  const Layout: any = layouts[layout]?.Component ?? BaseLayout;

  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <Select
          onValueChange={(e) => changeLayout(parseInt(e))}
          value={layout.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Map Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Default/Arena 1</SelectItem>
            <SelectItem value="1">Arena 2</SelectItem>
            <SelectItem value="2">Arena 3</SelectItem>
            <SelectItem value="3">Arena 4</SelectItem>
            <SelectItem value="4">Arena 5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-center mr-6 my-4" ref={formationRef}>
        <Layout
          onCharacterSlotClick={onCharacterSlotClick}
          spell={spell}
          setSpell={setSpell}
          formation={formation}
          selectedCharacter={selectedCharacter!}
          spells={data.spells}
        />
      </div>

      <div className="flex gap-2 justify-center items-center">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast("Formation link copied to clipboard");
            track("formation_shared", {
              formation: formation.join(","),
              spell: spell,
              url: window.location.href,
            });
          }}
          className="h-8 px-2"
        >
          <Share />
        </Button>
        <Button onClick={onDownloadButtonClick} className="h-8 px-2">
          <Download />
        </Button>
        <CharacterFilter
          classes={data.classes}
          factions={data.factions}
          characterFilter={characterFilter}
          updateCharacterFilter={updateCharacterFilter}
          className="relative -ml-12 left-[4.5rem] md:left-[10.5rem]"
        />
      </div>

      <ScrollArea
        className="flex flex-col items-center"
        style={{
          height: `calc(100vh - ${layoutHeights[layout] ?? "24"}rem - 5rem)`,
        }}
      >
        <div className={`grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2 mx-6`}>
          {characters.map((character) => {
            if (character.hide) return null;
            const isSelected = selectedCharacter === character;
            const className = `w-14 h-16 ${isSelected ? "outline rounded outline-yellow-400 outline-4" : ""}`;
            return (
              <Image
                key={character.name}
                src={characterImages[character.name.toLowerCase()]}
                alt={character.name}
                className={className}
                onClick={() => onCharacterClick(character)}
              />
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
