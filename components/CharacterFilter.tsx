import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type CharacterFilterType = {
  class: string | "All";
  faction: string | "All";
};

type CharacterClass = {
  name: string;
  imageUrl: string;
}

type CharacterFaction = {
  name: string;
  imageUrl: string;
}

export default function CharacterFilter(props: {
  characterFilter: CharacterFilterType,
  updateCharacterFilter: (filter: CharacterFilterType) => void,
  className?: string,
  classes: { [key: string]: CharacterClass },
  factions: { [key: string]: CharacterFaction }
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn(props.className, "rounded-full px-2")}>
          <Filter size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="bg-slate-400">
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(props.factions).map(([name, data]) =>
            <Image
              key={`filter-faction-${name}`}
              src={data.imageUrl}
              width={64}
              height={64}
              alt={name}
              onClick={() => props.updateCharacterFilter({ ...props.characterFilter, faction: name })} />
          )}
          <Button variant={props.characterFilter.faction === 'All' ? 'secondary' : 'ghost'} className="py-0 h-auto" onClick={() => props.updateCharacterFilter({ ...props.characterFilter, faction: "All" })}>All</Button>

          {Object.entries(props.classes).map(([name, data]) =>
            <Image
              key={`filter-class-${name}`}
              src={data.imageUrl}
              width={64}
              height={64}
              alt={name}
              onClick={() => props.updateCharacterFilter({ ...props.characterFilter, class: name })} />
          )}
          <Button variant={props.characterFilter.class === 'All' ? 'secondary' : 'ghost'} className="py-0 h-auto" onClick={() => props.updateCharacterFilter({ ...props.characterFilter, class: "All" })}>All</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
