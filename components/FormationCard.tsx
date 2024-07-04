"use client";

import { layouts } from "@/lib/layouts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
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
import { cn } from "@/lib/utils";

type FormationCardProps = {
  data: {
    id: string;
    formation: string;
    artifact: string;
    layout: number;
    user_id: string;
    user_image: string;
    name: string;
  };
  hideUser?: boolean;
  className?: string;
  showDelete?: boolean;
  cmsData: any;
};

export default function FormationCard({
  data,
  hideUser,
  className,
  showDelete,
  cmsData,
}: FormationCardProps) {
  const { id, formation, artifact, layout, user_id, user_image, name } = data;

  const LayoutComponent = layouts[layout as keyof typeof layouts].Component;

  const onCharacterSlotClick = (_: number) => {};
  const setArtifact = (_: string) => {};
  const formationCharacters = formation
    .split(",")
    .map((x) => cmsData.characters[x]);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="pr-2 pl-0">
        <Link href={`/formations/${id}`}>
          <div className="flex flex-col items-center">
            <LayoutComponent
              formation={formationCharacters}
              artifact={artifact}
              selectedCharacter={null}
              onCharacterSlotClick={onCharacterSlotClick}
              setArtifact={setArtifact}
              artifacts={cmsData.artifacts}
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
