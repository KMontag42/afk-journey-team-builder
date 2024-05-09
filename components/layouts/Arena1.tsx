import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CharacterSlot from "@/components/CharacterSlot";
import Image from "next/image";
import { spellImages, tekImages } from "@/lib/images";

export default function Arena1Layout(props: {
  onCharacterSlotClick: (index: number) => void;
  spell: string;
  setSpell: (spell: string) => void;
  formation: string[];
  selectedCharacter: string;
}) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <CharacterSlot
          index={9}
          onClick={() => props.onCharacterSlotClick(9)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
        <CharacterSlot
          index={10}
          onClick={() => props.onCharacterSlotClick(10)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <CharacterSlot
          index={5}
          onClick={() => props.onCharacterSlotClick(5)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
        <CharacterSlot
          index={7}
          onClick={() => props.onCharacterSlotClick(7)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        <div className="invisible h-14 w-14 bg-gray-400 rounded-full"></div>
        <CharacterSlot
          index={2}
          onClick={() => props.onCharacterSlotClick(2)}
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
          index={6}
          onClick={() => props.onCharacterSlotClick(6)}
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
      <div className="grid grid-cols-4 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-16 w-14">
              <Image
                src={spellImages[props.spell]}
                alt={props.spell}
                className="object-contain"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={props.spell}
              onValueChange={props.setSpell}
            >
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
          className="h-16 w-16 grid grid-cols-1 place-items-center opacity-30"
          id="watermark-logo"
        >
          <Image
            src={tekImages["logo"]}
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
          index={3}
          onClick={() => props.onCharacterSlotClick(3)}
          formation={props.formation}
          selectedCharacter={props.selectedCharacter}
        />
      </div>
    </>
  );
}
