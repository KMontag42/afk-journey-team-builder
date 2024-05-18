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
import { spellImages } from "@/lib/images";

type Props = {
  active: string;
  onChange: (spell: string) => void;
}

export default function ArtefactSelector({ active, onChange }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-16 w-14">
          <Image src={spellImages[active]} alt={active} className="object-contain" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <div className="flex gap-2">
          <DropdownMenuRadioGroup value={active} onValueChange={onChange}>
            <DropdownMenuLabel>Seasonal</DropdownMenuLabel>
            <DropdownMenuRadioItem value="lightheal">
              <Image height={36} src={spellImages["lightheal"]} alt="lightheal" className="mr-2" />
              Lightheal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="crescent">
              <Image height={36} src={spellImages["crescent"]} alt="crescent" className="mr-2" />
              Crescent
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="quickblade">
              <Image height={36} src={spellImages["quickblade"]} alt="quickblade" className="mr-2" />
              Quickblade
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="stormcaller">
              <Image height={36} src={spellImages["stormcaller"]} alt="stormcaller" className="mr-2" />
              Stormcaller
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="cascade">
              <Image height={36} src={spellImages["cascade"]} alt="cascade" className="mr-2" />
              Cascade
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="evocation">
              <Image height={36} src={spellImages["evocation"]} alt="evocation" className="mr-2" />
              Evocation
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="thunderbolt">
              <Image height={36} src={spellImages["thunderbolt"]} alt="thunderbolt" className="mr-2" />
              Thunderbolt
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dashing">
              <Image height={36} src={spellImages["dashing"]} alt="dashing" className="mr-2" />
              Dashing
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuRadioGroup value={active} onValueChange={onChange}>
            <DropdownMenuLabel>Permanent</DropdownMenuLabel>
            <DropdownMenuRadioItem value="awakening">
              <Image height={36} src={spellImages["awakening"]} alt="awakening" className="mr-2" />
              Awakening
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="blazing">
              <Image height={36} src={spellImages["blazing"]} alt="blazing" className="mr-2" />
              Blazing
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="confining">
              <Image height={36} src={spellImages["confining"]} alt="confining" className="mr-2" />
              Confining
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="enlightening">
              <Image height={36} src={spellImages["enlightening"]} alt="enlightening" className="mr-2" />
              Enlightening
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ironwall">
              <Image height={36} src={spellImages["ironwall"]} alt="ironwall" className="mr-2" />
              Ironwall
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="starshard">
              <Image height={36} src={spellImages["starshard"]} alt="starshard" className="mr-2" />
              Starshard
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
