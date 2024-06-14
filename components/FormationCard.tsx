'use client';

import { layouts } from "@/lib/layouts";

type FormationCardProps = {
  data: {
    formation: string;
    spell: string;
    layout: number;
    user_id: string;
    name: string;
    tag: string;
  }
};

export default function FormationCard({ data }: FormationCardProps) {
  const { formation, spell, layout, user_id, name, tag } = data;

  const LayoutComponent = layouts[layout as keyof typeof layouts];

  const onCharacterSlotClick = (_: number) => {};
  const setSpell = (_: string) => {};

  return (
    <div>
      <h1>{name}</h1>
      <p>{tag}</p>
      <div className="flex flex-col items-center mr-6 my-4">
        <LayoutComponent 
          formation={formation.split(",")} 
          spell={spell} 
          selectedCharacter={null}
          onCharacterSlotClick={onCharacterSlotClick}
          setSpell={setSpell}
        />
      </div>
      <p>{user_id}</p>
    </div>
  );
}
