"use server";

import Talents from "@/components/talents/Talents";
import { getTalentsCmsData } from "@/lib/server/cms-data";
import { CounterProvider } from "@/app/talents/talents-context";
import CounterDisplay from "@/components/talents/CounterDisplay";
import CounterControls from "@/components/talents/CounterControls";

export default async function TalentBuilder() {
  const jsonData = await getTalentsCmsData();

  return (
    <div className="container flex justify-center">
      <CounterProvider>
        <CounterDisplay />
        <CounterControls />
      </CounterProvider>
      <Talents data={jsonData} />
    </div>
  );
}
