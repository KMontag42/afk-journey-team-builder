"use client";

import CharacterSlot from "@/components/CharacterSlot";
import Image from "next/image";
import { tekImages } from "@/lib/images";
import ArtifactSelector from "@/components/ArtifactSelector";
import { Character } from "@/lib/characters";
import { type AllArtifacts } from "@/lib/artifacts";

export default function Arena3Layout(props: {
  onCharacterSlotClick: (index: number) => void;
  artifact: string;
  setArtifact: (artifact: string) => void;
  formation: Character[];
  selectedCharacter: Character | null;
  artifacts: AllArtifacts;
}) {
  return (
    <>
      <div className="grid grid-cols-3">
        <CharacterSlot
          index={9}
          onClick={() => props.onCharacterSlotClick(9)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
      </div>
      <div className="grid grid-cols-4 -mt-2">
        <CharacterSlot
          index={7}
          onClick={() => props.onCharacterSlotClick(7)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
        <CharacterSlot
          index={8}
          onClick={() => props.onCharacterSlotClick(8)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
      </div>
      <div className="grid grid-cols-3 -mt-2">
        <div className="h-16" />
      </div>
      <div className="grid grid-cols-4 -mt-2">
        <div />
        <div />
        <CharacterSlot
          index={6}
          onClick={() => props.onCharacterSlotClick(6)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
      </div>
      <div className="grid grid-cols-5 -mt-2">
        <div />
        <div />
        <CharacterSlot
          index={3}
          onClick={() => props.onCharacterSlotClick(3)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
        <CharacterSlot
          index={4}
          onClick={() => props.onCharacterSlotClick(4)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
        <CharacterSlot
          index={5}
          onClick={() => props.onCharacterSlotClick(5)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
      </div>
      <div className="grid grid-cols-4 -mt-2">
        <ArtifactSelector
          active={props.artifact}
          onChange={props.setArtifact}
          artifacts={props.artifacts}
        />

        <div
          className="h-16 w-16 grid grid-cols-1 place-items-center opacity-60"
          id="watermark-logo"
        >
          <Image
            src={tekImages["formationLogo"]}
            alt="Empty Slot"
            className="w-1/2 -ml-1"
          />
        </div>
        <CharacterSlot
          index={1}
          onClick={() => props.onCharacterSlotClick(1)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
        <CharacterSlot
          index={2}
          onClick={() => props.onCharacterSlotClick(2)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
      </div>
    </>
  );
}
