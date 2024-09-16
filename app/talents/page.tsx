"use server";

import { getTalentsCmsData } from "@/lib/server/cms-data";

export default async function TalentBuilder() {
  const jsonData = await getTalentsCmsData();

  return <div className="container flex justify-center"></div>;
}
