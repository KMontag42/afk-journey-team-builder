"use client";

import { FormEvent, useReducer } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Category, type Artifact } from "@/lib/roster";
import { toast } from "sonner";

type ArtifactProps = {
  artifactList: Artifact[];
};

type Action = {
  type: "increment" | "decrement";
  artifact: Artifact;
};

function reducer(artifacts: Artifact[], action: Action) {
  const type = action.type;
  const artifact = action.artifact;

  switch (type) {
    case "increment": {
      if (artifact.level + 1 > artifact.maxLevel) {
        return artifacts;
      } else {
        return artifacts.map((a) =>
          a.key === artifact.key ? { ...a, level: a.level + 1 } : a,
        );
      }
    }
    case "decrement": {
      if (artifact.level - 1 < 0) {
        return artifacts;
      } else {
        return artifacts.map((a) =>
          a.key === artifact.key ? { ...a, level: a.level - 1 } : a,
        );
      }
    }
    default:
      return artifacts;
  }
}

export default function Artifacts({ artifactList }: ArtifactProps) {
  const [artifacts, dispatch] = useReducer(reducer, artifactList);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    let items = artifacts.map((artifact) => ({
      artifactId: artifact.key,
      level: artifact.level,
    }));

    try {
      const response = await (
        await fetch("/api/roster/artifacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(items),
        })
      ).json();

      toast.success("Artifacts saved!");
    } catch (error: any) {
      toast.error("Failed to save Artifacts!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="font-bold text-2xl text-atekgold">Starter Artifacts</div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {artifacts
          .filter((artifact) => artifact.category === Category.Starter)
          .map((artifact) => (
            <Card key={artifact.key}>
              <CardContent className="flex flex-row items-center gap-x-2 p-2">
                <div className="flex flex-col justify-center items-center gap-y-2">
                  <Image
                    alt={artifact.label}
                    src={artifact.imageUrl}
                    width={128}
                    height={128}
                  />
                  {artifact.level}
                </div>
                <div className="flex flex-col gap-y-2">
                  <Button
                    variant="outline"
                    className="w-10"
                    disabled={artifact.level >= artifact.maxLevel}
                    onClick={() =>
                      dispatch({ type: "increment", artifact: artifact })
                    }
                  >
                    +
                  </Button>
                  <Button
                    variant="outline"
                    className="w-10"
                    disabled={artifact.level <= 0}
                    onClick={() =>
                      dispatch({ type: "decrement", artifact: artifact })
                    }
                  >
                    -
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <div className="font-bold text-2xl text-atekgold">Seasonal Artifacts</div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {artifacts
          .filter(
            (artifact) =>
              artifact.category === Category.Seasonal && artifact.active,
          )
          .map((artifact) => (
            <Card key={artifact.key}>
              <CardContent className="flex flex-row items-center gap-x-2 p-2">
                <div className="flex flex-col justify-center items-center gap-y-2">
                  <Image
                    alt={artifact.label}
                    src={artifact.imageUrl}
                    width={128}
                    height={128}
                  />
                  {artifact.level}
                </div>
                <div className="flex flex-col gap-y-2">
                  <Button
                    variant="outline"
                    className="w-10"
                    disabled={artifact.level >= artifact.maxLevel}
                    onClick={() =>
                      dispatch({ type: "increment", artifact: artifact })
                    }
                  >
                    +
                  </Button>
                  <Button
                    variant="outline"
                    className="w-10"
                    disabled={artifact.level <= 0}
                    onClick={() =>
                      dispatch({ type: "decrement", artifact: artifact })
                    }
                  >
                    -
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <Button onClick={handleSave}>Save Artifacts</Button>
    </div>
  );
}
