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
import { type AllArtifacts, type Artifact } from "@/lib/artifacts";

type Props = {
  active: string;
  onChange: (spell: string) => void;
  artifacts: AllArtifacts;
};

export default function ArtifactSelector({
  active,
  onChange,
  artifacts,
}: Props) {
  const seasonalArtifacts: Artifact[] = Object.values(artifacts).filter(
    (artifact) => artifact.category === "seasonal",
  );
  const permanentArtifacts: Artifact[] = Object.values(artifacts).filter(
    (artifact) => artifact.category === "permanent",
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-16 w-14">
          <Image
            src={artifacts[active].imageUrl}
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
            {seasonalArtifacts.map((artifact) => (
              <DropdownMenuRadioItem
                value={artifact.value}
                key={artifact.label}
              >
                <Image
                  height={36}
                  width={31}
                  src={artifact.imageUrl}
                  alt={artifact.label}
                  className="mr-2"
                />
                {artifact.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuRadioGroup value={active} onValueChange={onChange}>
            <DropdownMenuLabel>Permanent</DropdownMenuLabel>
            {permanentArtifacts.map((artifact) => (
              <DropdownMenuRadioItem
                value={artifact.value}
                key={artifact.label}
              >
                <Image
                  height={36}
                  width={31}
                  src={artifact.imageUrl}
                  alt={artifact.label}
                  className="mr-2"
                />
                {artifact.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
