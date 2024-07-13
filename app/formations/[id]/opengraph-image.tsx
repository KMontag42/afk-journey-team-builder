import { ImageResponse } from "next/og";
import { getFormation } from "@/lib/server/formations";
import { getCmsData } from "@/lib/server/cms-data";

function ServerFormation({ formation, characters }) {
  const heroes = formation.formation.split(",").map((id) => id === "" ? null : characters[id]).filter(Boolean);

  return (
    <div style={{display:'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
      <h1>{formation.name}</h1>
      <div style={{display: 'flex'}}>
      {heroes.map((hero) => (
        <div key={hero.id} style={{display: 'flex'}}>
          <img src={hero.tileUrl} width={100} height={100} alt={hero.name} />
        </div>
      ))}</div>
    </div>)
}


export default async function FormationOpenGraphImage(
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const formation = await getFormation(id);
  const cmsData = await getCmsData();

  return new ImageResponse(
    (<ServerFormation formation={formation} characters={cmsData.characters} />),
    {
      width: 600,
      height: 600,
    },
  );
}
