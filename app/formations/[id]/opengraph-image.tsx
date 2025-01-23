"use server";

import { ImageResponse } from "next/og";
import { getFormation } from "@/lib/server/formations";
import { getCmsData } from "@/lib/server/cms-data";
import { slotImageUrls } from "@/lib/images";

function ServerFormation({ formation, characters, map, artifact }: any) {
  const formationHeroes = formation.formation
    .split(",")
    .map((id: string) => (id === "" ? null : characters[id]));

  formationHeroes.unshift("");

  const mapImages = map.layout.map((row: number[]) =>
    row.map((slot: number) =>
      slot === -3
        ? artifact.imageUrl
        : formationHeroes[slot] == null
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
        backgroundColor: "#020817", // dark var(--background)
        color: "#f8fafc", // dark var(--foreground)
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "100px",
          left: "40px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          fontSize: "24px",
        }}
      >
        {formation.name}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "96px",
          gap: "2px",
        }}
      >
        {mapImages.map((row: string[], i: number) => (
          <div
            key={i}
            style={{
              display: "flex",
              marginRight: `${i % 2 === 0 ? "" : "130px)"}`,
              marginTop: "-36px",
              gap: "2px",
            }}
          >
            {row.map((slot, j) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={j}
                src={slot}
                style={{ width: 64 * 2, height: 74 * 2 }}
                alt={slot}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "100px",
          left: "40px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          fontSize: "24px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={formation.user_image}
          style={{ width: 50, height: 50, borderRadius: "999px" }}
          alt={formation.username}
        />
        {formation.username}
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
  const formation = await getFormation(parseInt(id));
  const cmsData = await getCmsData();
  const artifacts = cmsData.artifacts;

  if (!formation) {
    return new ImageResponse(<h1>Formation not found</h1>, {
      width: 200,
      height: 200,
    });
  }

  const map = cmsData.maps[formation.layout.toString()];
  const formationArtifact = artifacts[formation.artifact];

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
      width: 1200,
      height: 630,
    },
  );
}
