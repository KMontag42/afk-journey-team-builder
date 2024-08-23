"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type AvatarProps = {
  userName: string;
  userImage: string;
};

export default function UserAvatar({ userName, userImage }: AvatarProps) {
  return (
    <Link href={`/users/${userName}`}>
      <div className="flex justify-center items-center gap-2 text-2xl">
        <Avatar>
          <AvatarFallback>{userName}</AvatarFallback>
          <AvatarImage src={userImage} alt={userName} />
        </Avatar>
        <h1>{userName}</h1>
      </div>
    </Link>
  );
}
