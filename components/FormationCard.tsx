'use client';

import { layouts } from "@/lib/layouts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type FormationCardProps = {
  data: {
    formation: string;
    spell: string;
    layout: number;
    user_id: string;
    user_image: string;
    name: string;
    tag: string;
  }
};

export default function FormationCard({ data }: FormationCardProps) {
  const { formation, spell, layout, user_id, user_image, name, tag } = data;

  const LayoutComponent = layouts[layout as keyof typeof layouts];

  const onCharacterSlotClick = (_: number) => {};
  const setSpell = (_: string) => {};

  return (
    <div>
      <div>{name} <Badge>{tag}</Badge></div>
      <div className="flex flex-col items-center mr-6 my-4 border p-4">
        <LayoutComponent 
          formation={formation.split(",")} 
          spell={spell} 
          selectedCharacter={null}
          onCharacterSlotClick={onCharacterSlotClick}
          setSpell={setSpell}
        />
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user_image} alt={user_id} />
          <AvatarFallback>{user_id}</AvatarFallback>
        </Avatar>
        {user_id}
      </div>
    </div>
  );
}
