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

type Artefact = {
  value: string;
  imageUrl: string;
  label: string;
  category: "permanent" | "seasonal";
};

type Props = {
  active: string;
  onChange: (spell: string) => void;
  artefacts: { [key: string]: Artefact };
};

export default function ArtefactSelector({
  active,
  onChange,
  artefacts,
}: Props) {
  const seasonalArtefacts: Artefact[] = Object.values(artefacts).filter(
    (artefact) => artefact.category === "seasonal",
  );
  const permanentArtefacts: Artefact[] = Object.values(artefacts).filter(
    (artefact) => artefact.category === "permanent",
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-16 w-14">
          <Image
            src={artefacts[active].imageUrl}
            alt={active}
            className="object-contain"
            width={74}
            height={74}
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
                  width={31}
                  src={artefact.imageUrl}
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
                  width={31}
                  src={artefact.imageUrl}
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
