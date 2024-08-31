"use server";

import { FormationData } from "@/lib/formations";
import { mostPopularFormations } from "@/lib/server/formations";
import { getCmsData } from "@/lib/server/cms-data";
import CompactFormationCard from "../CompactFormationCard";

export default async function Formations() {
  const cmsData = await getCmsData();
  const popularFormations = await mostPopularFormations(5);

  return (
    <>
      <div className="text-xl font-bold pb-4">Top Formations</div>
      <div className="grid grid-cols-1 gap-2">
        {popularFormations.map((result: FormationData) => (
          <CompactFormationCard
            key={result.id.toString()!}
            data={result}
            cmsData={cmsData}
          />
        ))}
      </div>
    </>
  );
}
