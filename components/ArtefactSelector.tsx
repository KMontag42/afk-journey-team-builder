import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ARTEFACTS } from "@/lib/artefacts";

type Props = {
  active: string;
  onChange: (spell: string) => void;
};

export default function ArtefactSelector({ active, onChange }: Props) {
  const seasonalArtefacts = Object.values(ARTEFACTS).filter(
    (artefact) => artefact.category === "seasonal",
  );
  const permanentArtefacts = Object.values(ARTEFACTS).filter(
    (artefact) => artefact.category === "permanent",
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-16 w-14">
          <Image
            src={ARTEFACTS[active].image}
            alt={active}
            className="object-contain"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="DropdownMenuContent overflow-auto"
        collisionPadding={8}
      >
        <DropdownMenuSeparator />
        <div className="flex gap-2">
          <DropdownMenuRadioGroup value={active} onValueChange={onChange}>
            <DropdownMenuLabel>Seasonal</DropdownMenuLabel>
            {seasonalArtefacts.map((artefact) => (
              <DropdownMenuRadioItem
                value={artefact.value}
                key={artefact.label}
              >
                <Image
                  height={36}
                  src={artefact.image}
                  alt={artefact.label}
                  className="mr-2"
                />
                {artefact.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuRadioGroup value={active} onValueChange={onChange}>
            <DropdownMenuLabel>Permanent</DropdownMenuLabel>
            {permanentArtefacts.map((artefact) => (
              <DropdownMenuRadioItem
                value={artefact.value}
                key={artefact.label}
              >
                <Image
                  height={36}
                  src={artefact.image}
                  alt={artefact.label}
                  className="mr-2"
                />
                {artefact.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
