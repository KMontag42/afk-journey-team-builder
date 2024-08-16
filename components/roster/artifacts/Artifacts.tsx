"use client";

import { useReducer } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Category, type Artifact } from "@/lib/roster";

type ArtifactProps = {
  user: string;
  artifactList: Artifact[];
};

type Action = {
  type: "increment" | "decrement";
  artifact: Artifact;
};

const STARTER_MAX_LEVEL = 10;
const SEASONAL_MAX_LEVEL = 30;

function reducer(artifacts: Artifact[], action: Action) {
  const type = action.type;
  const artifact = action.artifact;

  switch (type) {
    case "increment": {
      if (
        (artifact.category === Category.Starter &&
          artifact.level + 1 > STARTER_MAX_LEVEL) ||
        (artifact.category === Category.Seasonal &&
          artifact.level + 1 > SEASONAL_MAX_LEVEL)
      ) {
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

export default function Artifacts({ user, artifactList }: ArtifactProps) {
  const [artifacts, dispatch] = useReducer(reducer, artifactList);

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-4">
      <h1>Starter</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {artifacts
          .filter((artifact) => artifact.category === Category.Starter)
          .map((artifact) => (
            <Card key={artifact.key}>
              <CardContent className="flex flex-col items-center space-y-2">
                <Image
                  className="pt-4"
                  alt={artifact.label}
                  src={artifact.imageUrl}
                  width={64}
                  height={64}
                />
                <div>{artifact.label}</div>
                <div className="flex flex-row gap-x-2">
                  <Button
                    variant="outline"
                    className="max-w-4"
                    disabled={artifact.level <= 0}
                    onClick={() =>
                      dispatch({ type: "decrement", artifact: artifact })
                    }
                  >
                    -1
                  </Button>
                  <Input
                    disabled
                    className="w-12 text-center"
                    value={artifact.level}
                  />
                  <Button
                    variant="outline"
                    className="max-w-4"
                    disabled={artifact.level >= STARTER_MAX_LEVEL}
                    onClick={() =>
                      dispatch({ type: "increment", artifact: artifact })
                    }
                  >
                    +1
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <h1 className="pt-4">Seasonal</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {artifacts
          .filter(
            (artifact) =>
              artifact.category === Category.Seasonal && artifact.active,
          )
          .map((artifact) => (
            <Card key={artifact.key}>
              <CardContent className="flex flex-col items-center space-y-2">
                <Image
                  className="pt-4"
                  alt={artifact.label}
                  src={artifact.imageUrl}
                  width={64}
                  height={64}
                />
                <div>{artifact.label}</div>
                <div className="flex flex-row gap-x-2">
                  <Button
                    variant="outline"
                    className="max-w-4"
                    disabled={artifact.level <= 0}
                    onClick={() =>
                      dispatch({ type: "decrement", artifact: artifact })
                    }
                  >
                    -1
                  </Button>
                  <Input
                    disabled
                    className="w-12 text-center"
                    value={artifact.level}
                  />
                  <Button
                    variant="outline"
                    className="max-w-4"
                    disabled={artifact.level >= SEASONAL_MAX_LEVEL}
                    onClick={() =>
                      dispatch({ type: "increment", artifact: artifact })
                    }
                  >
                    +1
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
