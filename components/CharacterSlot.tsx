import Image from "next/image";
import emptySlot from "@/public/emptySlot.png";
import { slotImages } from "@/lib/images";
import { Character } from "@/lib/characters";

export default function CharacterSlot(props: {
  index: number;
  onClick?: () => void;
  formation: Character[];
  selectedCharacter: Character | null;
}) {
  const slotNumber = props.index - 1;
  const character = props.formation[slotNumber];
  if (character) {
    const isSelected = props.selectedCharacter?.name === character.name;
    const className = `rounded h-16 w-16${isSelected ? " border border-yellow-400 border-4" : ""}`;
    return (
      <div className={className} onClick={props.onClick}>
        <Image
          src={character.tileUrl}
          alt={character.name}
          className="-mt-1"
          width={64}
          height={74}
        />
      </div>
    );
  }
  return (
    <div className="h-16 w-16" onClick={props.onClick}>
      <Image
        src={slotImages[`Tile${props.index}`] || emptySlot}
        alt="Empty Slot"
        style={{ objectFit: "cover" }}
        width={64}
        height={74}
        className="-mt-1"
      />
    </div>
  );
}
