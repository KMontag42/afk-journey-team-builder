"use client";

import Link from "next/link";

import { layouts } from "@/lib/layouts";
import { cn } from "@/lib/utils";
import { type CmsData } from "@/lib/cms-types";
import { type FormationData } from "@/lib/formations";

import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import LikeFormationButton from "@/components/LikeFormationButton";
import DeleteFormationButton from "@/components/DeleteFormationButton";
import ShareFormationButton from "@/components/ShareFormationButton";
import UserAvatar from "@/components/UserAvatar";

type FormationCardProps = {
  data: FormationData;
  cmsData: CmsData;
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
          <UserAvatar userName={username!} userImage={user_image}></UserAvatar>
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
