"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Heart } from "lucide-react";

type LikeFormationButtonProps = {
  formationId: number;
  liked: boolean;
};

export default function LikeFormationButton({
  formationId,
  liked,
}: LikeFormationButtonProps) {
  const { isSignedIn } = useUser();
  const [localLiked, setLocalLiked] = useState(liked);
  const [heartFill, setHeartFill] = useState(liked ? "#000" : "#fff");

  useEffect(() => {
    setHeartFill(localLiked ? "#000" : "#fff");
  }, [localLiked]);

  let onHeartClick = useCallback(() => {
    if (!isSignedIn) {
      toast.error("You must be logged in to vote on formations");
      return;
    }
    const method = localLiked ? "DELETE" : "POST";
    const message = localLiked ? "unlike" : "like";

    fetch("/api/votes", {
      method,
      body: JSON.stringify({ formation_id: formationId }),
    })
      .then((res) => {
        if (!res.ok) {
          toast.error(`Failed to ${message} formation`);
          return;
        }
        toast.success(`Formation ${message}d!`);
        setLocalLiked(!localLiked);
      })
      .catch((_) => {
        toast.error(`Failed to ${message} formation`);
      });
  }, [localLiked, formationId, isSignedIn]);

  if (!isSignedIn) {
    onHeartClick = () => {
      toast.error("You must be logged in to like formations");
    };
  }
  return (
    <Button onClick={onHeartClick}>
      <Heart fill={heartFill} />
    </Button>
  );
}
