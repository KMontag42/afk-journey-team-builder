"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CopyButton({ label }: { label: string }) {
  return (
    <Button
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText(label);
        toast.success("Link copied to clipboard!");
      }}
    >
      {label}
    </Button>
  );
}
