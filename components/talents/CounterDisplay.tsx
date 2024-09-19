"use client";

import { useCounter } from "@/app/talents/talents-context";

export default function CounterDisplay() {
  const counter = useCounter();

  return <div>Count: {counter}</div>;
}
