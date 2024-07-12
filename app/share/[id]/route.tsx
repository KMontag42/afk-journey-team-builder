import { ImageResponse } from "next/og";
import FormationCard from "@/components/FormationCard";
import { getFormation } from "@/lib/server/formations";
import { getCmsData } from "@/lib/server/cms-data";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const formation = await getFormation(id);
  const cmsData = await getCmsData();

  console.log(formation);

  return new ImageResponse(
    <FormationCard data={formation as any} cmsData={cmsData} />,
    {
      width: 1200,
      height: 600,
    },
  );
}
