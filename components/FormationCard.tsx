"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Share, Trash, Heart } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

import { layouts } from "@/lib/layouts";
import { cn } from "@/lib/utils";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { type FormationData } from "@/lib/formations";

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
  const { id, formation, artifact, layout, username, user_image, name } = data;
  const { isSignedIn } = useUser();
  const [liked, setLiked] = useState(!!data.currentUserLiked);

  const LayoutComponent = layouts[layout as keyof typeof layouts].Component;

  const onCharacterSlotClick = (_: number) => {};
  const setArtifact = (_: string) => {};
  const formationCharacters = formation
    .split(",")
    .map((x) => cmsData.characters[x]);

  const heartFill = liked ? "#000" : "#fff";

  const onHeartClick = useCallback(() => {
    if (!isSignedIn) {
      toast.error("You must be logged in to vote on formations");
      return;
    }
    const method = liked ? "DELETE" : "POST";
    const message = liked ? "unlike" : "like";

    fetch("/api/votes", {
      method,
      body: JSON.stringify({ formation_id: id }),
    })
      .then((res) => {
        if (!res.ok) {
          toast.error(`Failed to ${message} formation`);
          return;
        }
        toast.success(`Formation ${message}d!`);
        setLiked(!liked);
      })
      .catch((_) => {
        toast.error(`Failed to ${message} formation`);
      });
  }, [liked, id, isSignedIn]);

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
          <Link href={`/users/${username}`}>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user_image} alt={username} />
                <AvatarFallback>{username}</AvatarFallback>
              </Avatar>
              {username}
            </div>
          </Link>
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
          {isSignedIn && (
            <Button onClick={onHeartClick}>
              <Heart fill={heartFill} />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
