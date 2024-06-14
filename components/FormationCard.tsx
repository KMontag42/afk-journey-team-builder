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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

type FormationCardProps = {
  data: {
    id: string;
    formation: string;
    spell: string;
    layout: number;
    user_id: string;
    user_image: string;
    name: string;
  };
  hideUser?: boolean;
  className?: string;
  showDelete?: boolean;
};

export default function FormationCard({
  data,
  hideUser,
  className,
  showDelete,
}: FormationCardProps) {
  const { id, formation, spell, layout, user_id, user_image, name } = data;

  const LayoutComponent = layouts[layout as keyof typeof layouts];

  const onCharacterSlotClick = (_: number) => {};
  const setSpell = (_: string) => {};

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`/formations/${id}`}>
          <div className="flex flex-col items-center">
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
      <CardFooter>
        {!hideUser && (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user_image} alt={user_id} />
              <AvatarFallback>{user_id}</AvatarFallback>
            </Avatar>
            {user_id}
          </div>
        )}
        {showDelete && (
          <AlertDialog>
            <AlertDialogTrigger className="text-red-400">
              <Trash />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this formation and remove it from our database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await fetch(`/api/formations/${id}`, {
                      method: "DELETE",
                    });
                    window.location.reload();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
