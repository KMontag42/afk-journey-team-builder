"use client";

import { useCounterDispatch } from "@/app/talents/talents-context";
import { Button } from "../ui/button";

export default function CounterControls() {
  const dispatch = useCounterDispatch();

  return (
    <div>
      <Button variant="analytica" onClick={() => dispatch!("increment")}>
        Increment
      </Button>
      <Button variant="analytica" onClick={() => dispatch!("decrement")}>
        Decrement
      </Button>
    </div>
  );
}
