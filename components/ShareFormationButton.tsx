"use client";

import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";

export default function ShareFormationButton({
  formationId,
}: {
  formationId: number;
}) {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/formations/${formationId}`,
        );
        toast.success("Link copied to clipboard!");
      }}
    >
      <Share />
    </Button>
  );
}
