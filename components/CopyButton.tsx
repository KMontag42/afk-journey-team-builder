"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export default function CopyButton({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const already_copied = localStorage.getItem("already_copied");
    if (!already_copied) {
      localStorage.setItem("already_copied", JSON.stringify({}));
    } else {
      const label_already_copied = JSON.parse(already_copied)[label];

      setCopied(label_already_copied);
    }
    setLoaded(true);
  }, [label]);

  // we don't want to render the button until we have checked if it was already copied
  if (!loaded) {
    return null;
  }

  return (
    <Button
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText(label);
        toast.success("Copied to clipboard!");

        // we can use ! here because we know that the key exists
        const already_copied = localStorage.getItem("already_copied")!;
        const parsed = JSON.parse(already_copied);
        localStorage.setItem(
          "already_copied",
          JSON.stringify({ ...parsed, [label]: true }),
        );
        setCopied(true);
      }}
    >
      {copied ? (
        <>
          <Check />
          {label}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
