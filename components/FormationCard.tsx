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
import { Share, Trash, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type FormationData = {
  id: string;
  formation: string;
  artifact: string;
  layout: number;
  name: string;
  user_id?: string;
  user_image?: string;
};

type FormationCardProps = {
  data: FormationData;
  cmsData: any;
  className?: string;
  hideUser?: boolean;
  showDelete?: boolean;
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

  // TODO: make this either #000 or #fff based on if the user has liked the formation
  const heartFill = "#fff";

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
      <CardFooter className="justify-between">
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
        <div className="flex gap-x-2">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/formations/${id}`,
              );
              toast.success("Link copied to clipboard!");
            }}
          >
            <Share />
          </Button>
          <Button>
            <Heart fill={heartFill} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
