"use client";

import Link from "next/link";

import { layouts } from "@/lib/layouts";
import { cn } from "@/lib/utils";
import { type CmsData } from "@/lib/cms-types";
import { type FormationData } from "@/lib/formations";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import LikeFormationButton from "@/components/LikeFormationButton";
import DeleteFormationButton from "@/components/DeleteFormationButton";
import ShareFormationButton from "@/components/ShareFormationButton";
import { Edit2 } from "lucide-react";

type FormationCardProps = {
  data: FormationData;
  cmsData: CmsData;
  className?: string;
  hideUser?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  isLink?: boolean;
};

export default function FormationCard({
  data,
  hideUser,
  className,
  showDelete,
  cmsData,
  showEdit,
  isLink,
}: FormationCardProps) {
  const { id, formation, artifact, layout, username, user_image, name } = data;

  const LayoutComponent = layouts[layout as keyof typeof layouts].Component;

  const formationCharacters = formation
    .split(",")
    .map((x) => cmsData.characters[x]);

  const cardHeaderAndContent = (
    <>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="pr-2 pl-0">
        <div className="flex flex-col items-center">
          <LayoutComponent
            formation={formationCharacters}
            artifact={artifact}
            selectedCharacter={null}
            artifacts={cmsData.artifacts}
            onCharacterSlotClick={() => {}}
          />
        </div>
      </CardContent>
    </>
  );
  return (
    <Card className={cn("w-full", className)}>
      {isLink ? (
        <Link href={`/formations/${id}`}>{cardHeaderAndContent}</Link>
      ) : (
        cardHeaderAndContent
      )}
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
        {showDelete && <DeleteFormationButton formationId={id} />}
        <div className="flex gap-x-2">
          {showEdit && (
            <Link href={`/formations/${id}/edit`}>
              <Button>
                <Edit2 />
              </Button>
            </Link>
          )}
          <ShareFormationButton formationId={id} />
          <LikeFormationButton
            formationId={id}
            liked={!!data.currentUserLiked}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
