import { ImageResponse } from "next/og";
import { getFormation } from "@/lib/server/formations";
import { getCmsData } from "@/lib/server/cms-data";
import { slotImageUrls } from "@/lib/images";

function ServerFormation({ formation, characters, map, artifact }: any) {
  const formationHeroes = formation.formation
    .split(",")
    .map((id: string) => (id === "" ? null : characters[id]));

  formationHeroes.unshift("")

  const mapImages = map.layout.map((row: number[]) =>
    row.map((slot: number) =>
      slot === -3 ? artifact.imageUrl :
      formationHeroes[slot] == null
        ? slotImageUrls[slot]
        : formationHeroes[slot].tileUrl,
    ),
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "hsl(222.2 84% 4.9)",
      }}
    >
      <h2>{formation.name} ({formation.username})</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
        {mapImages.map((row: string[], i: number) => (
          <div key={i} style={{ display: "flex", marginRight: `${i % 2 === 0 ? '' : '64px'}`, marginTop: '-18px' }}>
            {row.map((slot, j) => (
              <img
                key={j}
                src={slot}
                style={{ width: 64, height: 74 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function FormationOpenGraphImage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const formation = await getFormation(id);
  const cmsData = await getCmsData();
  const map = cmsData.maps["default"];
  const artifacts = cmsData.artifacts;

  if (!formation) {
    return new ImageResponse(
      (
        <div>
          <h1>Formation not found</h1>
          <p>Check the URL</p>
        </div>
      ),
      {
        width: 400,
        height: 400,
      },
    );
  }

  const formationArtifact = artifacts[formation.artifact];

  console.log(map.layout);

  return new ImageResponse(
    (
      <ServerFormation
        formation={formation}
        characters={cmsData.characters}
        map={map}
        artifact={formationArtifact}
      />
    ),
    {
      width: 400,
      height: 400,
    },
  );
}
