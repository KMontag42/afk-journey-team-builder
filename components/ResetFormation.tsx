"use client";

import { Button } from "@/components/ui/button";

interface ResetFormationProps {
  onReset: () => void;
}

export default function ResetFormation({ onReset }: ResetFormationProps) {
  return (
    <Button variant="outline" onClick={onReset}>
      Reset Formation
    </Button>
  );
}
