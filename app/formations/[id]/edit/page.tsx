"use server";

import Builder from "@/components/Builder";
import { getCmsData } from "@/lib/server/cms-data";
import { getFormation } from "@/lib/server/formations";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};
export default async function FormationEditPage({ params }: Props) {
  const { id } = params;
  const formation = await getFormation(id);
  if (!formation) {
    return (
      <div className="container md:w-[40vw] text-center">
        <h1 className="text-2xl font-bold">Formation not found</h1>
        <p>Check the URL</p>
      </div>
    );
  }

  const { userId } = auth();

  if (formation.user_id !== userId) {
    redirect(`/formations/${id}`);
  }

  const cmsData = await getCmsData();

  return (
    <div className="relative flex flex-col items-center w-[min(100%,680px)] h-[calc(100vh-70px-2rem)] mx-auto px-6">
      <Builder data={cmsData} formation={formation} />
    </div>
  );
}
