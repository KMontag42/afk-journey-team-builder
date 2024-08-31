"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { type CmsData } from "@/lib/cms-types";
import { type FormationData } from "@/lib/formations";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import LikeFormationButton from "@/components/LikeFormationButton";
import DeleteFormationButton from "@/components/DeleteFormationButton";
import ShareFormationButton from "@/components/ShareFormationButton";
import { Separator } from "@/components/ui/separator";

type FormationCardProps = {
  data: FormationData;
  cmsData: CmsData;
  className?: string;
};

export default function CompactFormationCard({
  data,
  className,
  cmsData,
}: FormationCardProps) {
  const { id, formation, artifact, layout, username, user_image, name } = data;

  const formationUrl = `/formations/${data.id}`;
  const userUrl = `/users/${username}`;

  const formationCharacters = formation
    .split(",")
    .map((x) => cmsData.characters[x])
    .filter((char) => char);

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="flex flex-col justify-center p-4 sm:p-6 w-full gap-4">
        <div className="grid grid-cols-2">
          <Link className="hover:underline lg:col-span-1" href={formationUrl}>
            <div className="font-bold text-atekgold text-md truncate">
              {data.name}
            </div>
          </Link>
          <Link className="hover:underline lg:col-span-1" href={userUrl}>
            <div className="flex flex-row items-center justify-end gap-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user_image} alt={username} />
                <AvatarFallback>{username}</AvatarFallback>
              </Avatar>
              {username}
            </div>
          </Link>
        </div>
        <Link className="hover:underline lg:col-span-1" href={formationUrl}>
          <div className="flex flex-row gap-4 justify-center">
            <div>
              <Image
                src={cmsData.artifacts[data.artifact].imageUrl}
                alt={data.artifact}
                width={48}
                height={48}
              />
            </div>
            <div className="flex flex-row gap-1">
              {formationCharacters.map((char) => (
                <div key={char.id}>
                  <Image
                    src={char.imageUrl}
                    alt={char.name}
                    width={48}
                    height={48}
                  />
                </div>
              ))}
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
