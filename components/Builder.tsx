"use client";

import { useState, createRef, useCallback } from "react";
import { useQueryState } from "nuqs";
import { Characters, getCharacterImage } from "@/lib/characters";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { track } from "@vercel/analytics";

import BaseLayout from "./layouts/base";

export default function Builder() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null,
  );
  const [formation, setFormation] = useQueryState<string[]>("formation", {
    parse: (query: string): string[] => atob(query).split(","),
    serialize: (formation: string[]) => btoa(formation.join(",")),
    defaultValue: new Array<string>(13).fill(""),
  });
  const charactersNotInFormation = Characters.filter(
    (character) => !formation.includes(character),
  );
  const [characters, setCharacters] = useState<string[]>(
    charactersNotInFormation.sort(),
  );
  const [spell, setSpell] = useQueryState<string>("spell", {
    parse: (query: string): string => atob(query),
    serialize: (spell: string) => btoa(spell),
    defaultValue: "blazing",
  });
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
      height: 300,
      style: { marginLeft: "-1rem" },
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

  function onCharacterClick(character: string) {
    setSelectedCharacter(character);
  }

  function onCharacterSlotClick(slot: number) {
    const slotNumber = slot - 1;
    if (selectedCharacter) {
      updateFormation(slotNumber, selectedCharacter);
      setSelectedCharacter(null);
    } else if (formation[slotNumber]) {
      setSelectedCharacter(formation[slotNumber]);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center mr-6 my-4" ref={formationRef}>
        <BaseLayout
          onCharacterSlotClick={onCharacterSlotClick}
          spell={spell}
          setSpell={setSpell}
          formation={formation}
          selectedCharacter={selectedCharacter!}
        />
      </div>

      <ScrollArea
        className="flex flex-col items-center"
        style={{ height: "calc(100vh - 382px - 65px)" }}
      >
        <div className={`grid grid-cols-5 sm:grid-cols-10 gap-2 pt-4 mx-6`}>
          {characters.map((character) => {
            const isSelected = selectedCharacter === character;
            const className = `w-14 h-14 ${isSelected ? "border border-yellow-400 border-4" : ""}`;
            return (
              <Avatar
                className={className}
                onClick={() => onCharacterClick(character)}
                key={character}
              >
                <AvatarImage src={getCharacterImage(character)} />
                <AvatarFallback>{character}</AvatarFallback>
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
