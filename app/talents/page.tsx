"use server";

import Talents from "@/components/talents/Talents";
import { getTalentsCmsData } from "@/lib/server/cms-data";
import { TalentProvider } from "@/app/talents/talents-context";

export default async function TalentBuilder() {
  const jsonData = await getTalentsCmsData();

  return (
    <div className="container flex justify-center">
      <TalentProvider>
        <Talents data={jsonData} />
      </TalentProvider>
    </div>
  );
}
