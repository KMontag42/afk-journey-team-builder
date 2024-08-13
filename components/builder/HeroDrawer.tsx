import Image from "next/image";
import Tile from "@/components/builder/Tile1.png";

import type { CharacterData, CharacterCmsData } from "@/lib/cms-types";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

type HeroDrawerProps = {
  character: CharacterData;
  characters: CharacterCmsData;
};

export default function HeroDrawer({ character, characters }: HeroDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div key={character.name} className="w-12 h-14 relative">
          <Image src={character.tileUrl} fill alt={character.name} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="h-96 pt-4 px-4" data-vaul-no-drag>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-y-2">
            <DrawerClose>
              <Image src={Tile} alt="Empty" width={50} height={50} />
            </DrawerClose>
            {Object.values(characters).map((character) => (
              <DrawerClose key={character.id}>
                <Image
                  src={character.imageUrl}
                  width={50}
                  height={50}
                  alt={character.name}
                />
              </DrawerClose>
            ))}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
