import Image from "next/image";
import emptySlot from "@/public/emptySlot.png";
import { characterImages, slotImages } from "@/lib/images";

export default function CharacterSlot(props: {
  index: number;
  onClick?: () => void;
  formation: string[];
  selectedCharacter: string | null;
}) {
  const slotNumber = props.index - 1;
  const character = props.formation[slotNumber];
  if (character) {
    const isSelected = props.selectedCharacter === character;
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
