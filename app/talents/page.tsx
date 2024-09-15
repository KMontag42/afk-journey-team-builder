"use server";

import Talents from "@/components/talents/Talents";
import { getTalentsCmsData } from "@/lib/server/cms-data";

export default async function TalentBuilder() {
  const jsonData = await getTalentsCmsData();

  return (
    <div className="container flex justify-center">
      <Talents data={jsonData}></Talents>
    </div>
  );
}
