"use client";

import { layouts } from "@/lib/layouts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

type FormationCardProps = {
  data: {
    id: string;
    formation: string;
    spell: string;
    layout: number;
    user_id: string;
    user_image: string;
    name: string;
    tag: string;
  };
  hideUser?: boolean;
  className?: string;
};

export default function FormationCard({ data, hideUser, className }: FormationCardProps) {
  const { id, formation, spell, layout, user_id, user_image, name, tag } = data;

  const LayoutComponent = layouts[layout as keyof typeof layouts];

  const onCharacterSlotClick = (_: number) => {};
  const setSpell = (_: string) => {};

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{tag}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/formations/${id}`}>
          <div className="flex flex-col items-center gap-2">
            <LayoutComponent
              formation={formation.split(",")}
              spell={spell}
              selectedCharacter={null}
              onCharacterSlotClick={onCharacterSlotClick}
              setSpell={setSpell}
            />
          </div>
        </Link>
      </CardContent>
      {!hideUser && (
        <CardFooter>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user_image} alt={user_id} />
              <AvatarFallback>{user_id}</AvatarFallback>
            </Avatar>
            {user_id}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
