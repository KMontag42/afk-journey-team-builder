'use client'

import Link from "next/link";

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

import { type FormationData } from "@/lib/formations";
import LikeFormationButton from "@/components/LikeFormationButton";
import DeleteFormationButton from "@/components/DeleteFormationButton";
import ShareFormationButton from "@/components/ShareFormationButton";

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

  const LayoutComponent = layouts[layout as keyof typeof layouts].Component;

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
        {showDelete && <DeleteFormationButton formationId={id} />}
        <div className="flex gap-x-2">
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
