"use client";

import { useState, createRef, useCallback } from "react";
import { useQueryState } from "nuqs";
import { Characters, getCharacterImage } from "@/lib/characters";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import emptySlot from "@/public/emptySlot.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toPng } from "html-to-image";

import {
  spellImages,
  tekImages,
  slotImages,
  characterImages,
} from "@/lib/images";

export default function Home() {
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
    document.getElementById("watermark-logo")!.classList.remove("invisible");
    toPng(formationRef.current!, {
      height: 300,
      style: { marginLeft: "-1rem" },
      includeQueryParams: true,
      cacheBust: true,
    }).then((dataUrl) => {
      document.getElementById("watermark-logo")!.classList.add("invisible");
      const link = document.createElement("a");
      link.download = "formation.png";
      link.href = dataUrl;
      link.click();
    });
  }, [formationRef]);

  function CharacterSlot(props: { index: number; onClick?: () => void }) {
    const slotNumber = props.index - 1;
    const character = formation[slotNumber];
    if (character) {
      const isSelected = selectedCharacter === character;
      const className = `rounded h-16 w-16 ${isSelected ? "border border-yellow-400 border-4" : ""}`;
      return (
        <div className={className} onClick={props.onClick}>
          <Image
            src={characterImages[character.toLowerCase()]}
            alt={character}
            className="-mt-1"
            style={{ width: 64 }}
            width={64}
          />
        </div>
      );
    }
    return (
      <div className="h-16 w-16" onClick={props.onClick}>
        <Image
          src={slotImages[`Tile${props.index}`] || emptySlot}
          alt="Empty Slot"
          style={{ objectFit: "cover", width: 64 }}
          width={64}
          className="-mt-1"
        />
      </div>
    );
  }

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
    <main className="flex min-h-screen flex-col items-center pt-8">
      <Popover>
        <PopoverTrigger>
          <p className="text-xl underline absolute top-4 end-8">?</p>
        </PopoverTrigger>
        <PopoverContent>
          <ul className="p-4 list-disc">
            <li>
              Click on a character to select it, then click on a slot to place
              it.
            </li>
            <li>
              Click on a character in a slot to select it, then click on a
              different slot to swap them.
            </li>
            <li>
              Click on a character in a slot to select it, then click on the
              character to remove it.
            </li>
            <li>Click on the spell icon to change the formation spell.</li>
          </ul>
        </PopoverContent>
      </Popover>

      <div className="flex flex-col items-center">
        <Image
          src={tekImages["tekLogo"]}
          alt="Tekken Emblem"
          className="w-56"
        />
      </div>

      <div className="flex flex-col items-center mr-6 my-4" ref={formationRef}>
        <div className="grid grid-cols-3 gap-2">
          <CharacterSlot index={10} onClick={() => onCharacterSlotClick(10)} />
          <CharacterSlot index={12} onClick={() => onCharacterSlotClick(12)} />
          <CharacterSlot index={13} onClick={() => onCharacterSlotClick(13)} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <CharacterSlot index={5} onClick={() => onCharacterSlotClick(5)} />
          <CharacterSlot index={7} onClick={() => onCharacterSlotClick(7)} />
          <CharacterSlot index={9} onClick={() => onCharacterSlotClick(9)} />
          <CharacterSlot index={11} onClick={() => onCharacterSlotClick(11)} />
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="invisible h-14 w-14 bg-gray-400 rounded-full"></div>
          <CharacterSlot index={2} onClick={() => onCharacterSlotClick(2)} />
          <CharacterSlot index={4} onClick={() => onCharacterSlotClick(4)} />
          <CharacterSlot index={6} onClick={() => onCharacterSlotClick(6)} />
          <CharacterSlot index={8} onClick={() => onCharacterSlotClick(8)} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="h-16 w-14">
                <Image
                  src={spellImages[spell]}
                  alt={spell}
                  className="object-contain"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={spell} onValueChange={setSpell}>
                <DropdownMenuRadioItem value="awakening">
                  <Image
                    height={36}
                    src={spellImages["awakening"]}
                    alt="awakening"
                    className="mr-2"
                  />
                  Awakening
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="blazing">
                  <Image
                    height={36}
                    src={spellImages["blazing"]}
                    alt="blazing"
                    className="mr-2"
                  />
                  Blazing
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="confining">
                  <Image
                    height={36}
                    src={spellImages["confining"]}
                    alt="confining"
                    className="mr-2"
                  />
                  Confining
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="enlightening">
                  <Image
                    height={36}
                    src={spellImages["enlightening"]}
                    alt="enlightening"
                    className="mr-2"
                  />
                  Enlightening
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ironwall">
                  <Image
                    height={36}
                    src={spellImages["ironwall"]}
                    alt="ironwall"
                    className="mr-2"
                  />
                  Ironwall
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="starshard">
                  <Image
                    height={36}
                    src={spellImages["starshard"]}
                    alt="starshard"
                    className="mr-2"
                  />
                  Starshard
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            className="h-16 w-16 invisible grid grid-cols-1 place-items-center"
            id="watermark-logo"
          >
            <Image
              src={tekImages["logoAnimated"]}
              alt="Empty Slot"
              className="w-1/2 -ml-1"
            />
          </div>
          <CharacterSlot index={1} onClick={() => onCharacterSlotClick(1)} />
          <CharacterSlot index={3} onClick={() => onCharacterSlotClick(3)} />
        </div>
      </div>

      <ScrollArea
        className="h-[35vh] flex flex-col items-center"
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
          }}
          className="h-8"
        >
          Share this formation
        </Button>
        <Button onClick={onDownloadButtonClick} className="h-8">
          Download as Image
        </Button>
      </div>
      <p className="mt-1 text-xs">
        Made with &hearts; by{" "}
        <Link
          className="underline"
          href={"https://discordapp.com/users/89367326989770752"}
        >
          0xKRM
        </Link>
      </p>
    </main>
  );
}
