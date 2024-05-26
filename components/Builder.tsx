"use client";

import { useState, createRef, useCallback } from "react";
import { useQueryState } from "nuqs";
import { type Character, Characters, getCharacterImage } from "@/lib/characters";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { track } from "@vercel/analytics";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import BaseLayout from "@/components/layouts/base";
import Arena1Layout from "@/components/layouts/Arena1";
import Arena2Layout from "@/components/layouts/Arena2";
import Arena3Layout from "@/components/layouts/Arena3";
import Arena4Layout from "@/components/layouts/Arena4";

const layouts: { [key: number]: { Component: React.ElementType, numTiles: number} } = {
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

export default function Builder() {
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

  const changeLayout = (newLayoutId: number) => {
    const existingLayoutTiles = layouts[layout].numTiles;
    const newLayoutTiles = layouts[newLayoutId].numTiles;

    if (newLayoutTiles < existingLayoutTiles) {
      setFormation((formation) => formation.slice(0, newLayoutTiles));
      setCharacters(
        Characters.filter((character) => !formation.includes(character.name)),
      );
    }
    else if (newLayoutTiles > existingLayoutTiles) setFormation(Array.from({length: newLayoutTiles}).map((_,i) => formation[i]));
    setLayout(newLayoutId)
  }
  
  const formationRef = createRef<HTMLDivElement>();

  function updateFormation(slot: number, character: string) {
    const characterInSlot = formation[slot];
    const characterIndex = formation.indexOf(character);
    const formationCharacters = formation.filter(
      (character) => character !== "",
    );
    const formationCopy = [...formation];
    let newCharacters = [...characters];

    if (characterInSlot === character) {
      formationCopy[slot] = "";
      newCharacters.push(character);
    } else if (characterIndex !== -1) {
      formationCopy[slot] = character;
      formationCopy[characterIndex] = characterInSlot;
      newCharacters = newCharacters.filter(
        (character) => character !== characterInSlot,
      );
      newCharacters = newCharacters.filter(
        (character) => character !== selectedCharacter,
      );
    } else if (formationCharacters.length < 5) {
      newCharacters = newCharacters.filter(
        (character) => character !== selectedCharacter,
      );

      if (characterInSlot !== "") {
        newCharacters.push(characterInSlot);
      }

      formationCopy[slot] = character;
    } else if (formationCharacters.length === 5 && characterInSlot !== "") {
      newCharacters = newCharacters.filter(
        (character) => character !== selectedCharacter,
      );
      newCharacters.push(characterInSlot);
      formationCopy[slot] = character;
    }

    newCharacters = newCharacters.filter(
      (value, index, self) => self.indexOf(value) === index,
    );

    setFormation(formationCopy);
    setCharacters(newCharacters.sort());
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
      updateFormation(slotNumber, selectedCharacter.name);
      setSelectedCharacter(null);
    } else if (formation[slotNumber]) {
      console.log("formation[slotNumber]", formation[slotNumber]);
      const _character = Characters.find(
        (character) => character.name === formation[slotNumber],
      );
      console.log("_character", _character);
      setSelectedCharacter(_character!);
    }
  }

  const Layout: any = layouts[layout]?.Component ?? BaseLayout;

  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <Select onValueChange={(e) => changeLayout(parseInt(e))} value={layout.toString()}>
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
        />
      </div>

      <ScrollArea
        className="flex flex-col items-center"
        style={{ height: `calc(100vh - ${layoutHeights[layout] ?? '24'}rem - 6.5rem)` }}
      >
        <div className={`grid grid-cols-5 sm:grid-cols-10 gap-2 pt-4 mx-6`}>
          {characters.map((character) => {
            const isSelected = selectedCharacter === character;
            const className = `w-14 h-14 ${isSelected ? "border border-yellow-400 border-4" : ""}`;
            return (
              <Avatar
                className={className}
                onClick={() => onCharacterClick(character)}
                key={character.name}
              >
                <AvatarImage src={getCharacterImage(character)} />
                <AvatarFallback>{character.name}</AvatarFallback>
              </Avatar>
            );
          })}
        </div>
      </ScrollArea>

      <div className="pt-2 flex gap-2">
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
          className="h-8"
        >
          Share this formation
        </Button>
        <Button onClick={onDownloadButtonClick} className="h-8">
          Download as Image
        </Button>
      </div>
    </>
  );
}
