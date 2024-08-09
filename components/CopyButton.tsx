"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const alreadyCopied = localStorage.getItem("already_copied");
    if (!alreadyCopied) {
      localStorage.setItem("already_copied", JSON.stringify({}));
    } else {
      const codeAlreadyCopied = JSON.parse(alreadyCopied)[code];

      setCopied(codeAlreadyCopied);
    }
    setLoaded(true);
  }, [code]);

  // we don't want to render the button until we have checked if it was already copied
  if (!loaded) {
    return null;
  }

  return (
    <Button
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText(code);
        toast.success("Copied to clipboard!");

        // we can use ! here because we know that the key exists
        const alreadyCopied = localStorage.getItem("already_copied")!;
        const parsed = JSON.parse(alreadyCopied);
        localStorage.setItem(
          "already_copied",
          JSON.stringify({ ...parsed, [code]: true }),
        );
        setCopied(true);
      }}
    >
      {copied ? (
        <>
          <Check />
          Used
        </>
      ) : (
        <>Copy</>
      )}
    </Button>
  );
}
