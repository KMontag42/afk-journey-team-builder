"use server";

import FormationCard from "@/components/FormationCard";
import { getRecentFormations } from "@/lib/formations";


export default async function NewestFormations() {
  const data = await getRecentFormations();

  return (
    <>
      {data.formations.map((formation) => (
        <FormationCard
          key={formation.id!.toString()}
          data={formation as any}
          className="mb-4"
        />
      ))}
    </>
  );
}
