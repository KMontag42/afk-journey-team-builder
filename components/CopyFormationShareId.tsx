"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CopyFormationShareId({
  formationShareId,
}: {
  formationShareId: string;
}) {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(formationShareId);
        toast.success("Formation share ID copied to clipboard!");
      }}
    >
      <Copy />
    </Button>
  );
}
