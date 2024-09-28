"use client";

import { useState, createRef, useCallback, type ElementType } from "react";
import { useQueryState } from "nuqs";
import { toPng } from "html-to-image";
import { track } from "@vercel/analytics";
import Image from "next/image";
import { Download } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import type { Character } from "@/lib/characters";
import type { CharacterCmsData, CmsData } from "@/lib/cms-types";

import { FormationData, updateSlotInFormation } from "@/lib/formations";
import {
  layouts,
  layoutHeights,
  layoutExportMargins,
  layoutExportWidths,
} from "@/lib/layouts";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import InputWithClear from "@/components/ui/InputWithClear";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CharacterFilter, {
  CharacterFilterType,
} from "@/components/CharacterFilter";
import BaseLayout from "@/components/layouts/base";
import SaveButton from "@/components/SaveButton";
import { useRouter } from "next/navigation";

type Props = {
  data: CmsData;
  formation?: FormationData;
};

export default function Builder({ data, formation: _formation }: Props) {
  const Characters: CharacterCmsData = data.characters;

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [formation, setFormation] = useQueryState<string[]>("formation", {
    parse: (query: string): string[] => atob(query).split(","),
    serialize: (formation: string[]) => btoa(formation.join(",")),
    defaultValue: _formation
      ? _formation.formation.split(",")
      : new Array<string>(13).fill(""),
  });
  const [artifact, setArtifact] = useQueryState<string>("artifact", {
    parse: (query: string): string => atob(query),
    serialize: (artifact: string) => btoa(artifact),
    defaultValue: _formation ? _formation.artifact : "blazing",
  });
  const [layout, setLayout] = useQueryState<number>("map", {
    parse: (query: string): number => parseInt(query),
    serialize: (layout: number) => layout.toString(),
    defaultValue: _formation ? _formation.layout : 0,
  });
  const [characterFilter, setCharacterFilter] = useState<CharacterFilterType>({
    name: "",
    class: "All",
    faction: "All",
  });

  const charactersNotInFormation = Object.values(Characters).filter(
    (character) => !formation.includes(character.id),
  );
  const charactersInFormation = formation.map((x) => {
    if (x === "" || x === undefined) {
      return undefined;
    }
    return Characters[x.toLowerCase()];
  });
  const characters = charactersNotInFormation
    .filter((character) => {
      return (
        (characterFilter.faction === "All" ||
          character.faction === characterFilter.faction) &&
        (characterFilter.class === "All" ||
          character.class === characterFilter.class) &&
        (characterFilter.name === "" ||
          character.name
            .toLowerCase()
            .includes(characterFilter.name.toLowerCase()))
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const changeLayout = (newLayoutId: number) => {
    const existingLayoutTiles = layouts[layout].numTiles;
    const newLayoutTiles = layouts[newLayoutId].numTiles;

    if (newLayoutTiles < existingLayoutTiles) {
      setFormation((formation) => formation.slice(0, newLayoutTiles));
    } else if (newLayoutTiles > existingLayoutTiles) {
      setFormation(
        Array.from({ length: newLayoutTiles }).map((_, i) => formation[i]),
      );
    }
    setLayout(newLayoutId);
  };

  const formationRef = createRef<HTMLDivElement>();
  const searchInputRef = createRef<HTMLInputElement>();

  const { isSignedIn, user } = useUser();

  function updateFormation(slot: number, character: Character) {
    setFormation(updateSlotInFormation(formation, slot, character));
    setCharacterFilter((prev) => ({ ...prev, name: "" }));
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
        artifact,
        layout,
        url: window.location.href,
      });
    });
  }, [formationRef, formation, layout, artifact]);

  function onCharacterClick(character: Character) {
    setSelectedCharacter(character);
  }

  function onCharacterSlotClick(slot: number) {
    const slotNumber = slot - 1;
    if (selectedCharacter) {
      updateFormation(slotNumber, selectedCharacter);
      setSelectedCharacter(null);
    } else if (formation[slotNumber]) {
      const _character = Characters[formation[slotNumber].toLowerCase()];
      setSelectedCharacter(_character);
    }
  }

  const Layout: ElementType = layouts[layout]?.Component ?? BaseLayout;

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
          artifact={artifact}
          setArtifact={setArtifact}
          formation={charactersInFormation}
          selectedCharacter={selectedCharacter!}
          artifacts={data.artifacts}
        />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <div className="flex gap-2">
          {isSignedIn && (
            <SaveButton
              artifact={artifact}
              formation={formation}
              layout={layout}
              user={user}
              name={_formation?.name}
              id={_formation?.id}
            />
          )}
          <Button onClick={onDownloadButtonClick} className="h-8 px-2">
            <Download />
          </Button>
        </div>
        <div className="flex gap-2 justify-between w-full px-4">
          <InputWithClear
            className="w-28"
            onChange={(e) =>
              setCharacterFilter((prev) => ({ ...prev, name: e.target.value }))
            }
            onClearClick={() => {
              setCharacterFilter((prev) => ({ ...prev, name: "" }));
              searchInputRef.current?.focus();
            }}
            placeholder="Search..."
            ref={searchInputRef}
            value={characterFilter.name}
          />
          <CharacterFilter
            characterFilter={characterFilter}
            classes={data.classes}
            factions={data.factions}
            updateCharacterFilter={setCharacterFilter}
          />
        </div>
      </div>

      <ScrollArea
        className="w-full mt-2"
        style={{
          height: `calc(100vh - ${layoutHeights[layout] ?? "24"}rem - 5rem)`,
        }}
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-2 p-4">
          {characters.map((character) => {
            if (character.hide) return null;
            const isSelected = selectedCharacter === character;
            const className = `w-14 h-16${
              isSelected ? " outline rounded outline-yellow-400 outline-4" : ""
            }`;
            return (
              <Image
                key={character.name}
                src={character.tileUrl}
                width={56}
                height={64}
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
