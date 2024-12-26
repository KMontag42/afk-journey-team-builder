import Link from "next/link";

import { layouts } from "@/lib/layouts";
import { cn } from "@/lib/utils";
import { type CmsData } from "@/lib/cms-types";
import { userLikedFormation, type FormationData } from "@/lib/formations";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import LikeFormationButton from "@/components/LikeFormationButton";
import DeleteFormationButton from "@/components/DeleteFormationButton";
import ShareFormationButton from "@/components/ShareFormationButton";
import { Edit2 } from "lucide-react";
import CopyFormationShareId from "@/components/CopyFormationShareId";

type FormationCardProps = {
  data: FormationData;
  cmsData: CmsData;
  className?: string;
  hideUser?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  isLink?: boolean;
  currentUserId?: string | null;
};

export default function FormationCard({
  data,
  hideUser,
  className,
  showDelete,
  cmsData,
  showEdit,
  isLink,
  currentUserId,
}: FormationCardProps) {
  const {
    id,
    formation,
    artifact,
    username,
    user_image,
    name,
    votes,
    tags,
    formationShareId,
  } = data;

  const layout = Math.trunc(data.layout);

  const LayoutComponent = layouts[layout as keyof typeof layouts].Component;

  const formationCharacters = formation
    .split(",")
    .map((x) => cmsData.characters[x]);

  const currentUserLiked = userLikedFormation(data, currentUserId ?? "");

  const cardHeaderAndContent = (
    <>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <p>{name}</p>
              <div>
                {tags && tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
            </div>
            {formationShareId && (
              <CopyFormationShareId formationShareId={formationShareId} />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pr-2 pl-0">
        <div className="flex flex-col items-center">
          <LayoutComponent
            formation={formationCharacters}
            artifact={artifact}
            selectedCharacter={null}
            artifacts={cmsData.artifacts}
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
          {votes && (
            <LikeFormationButton formationId={id} liked={currentUserLiked} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
