"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Level } from "@/lib/roster";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

type LevelProps = {
  levelList: Level[];
};

export default function Levels({ levelList }: LevelProps) {
  const seasons = levelList.filter((season) => season.active);

  const checkLevel = (e: any, levelType: Level) => {
    if (e.target.value < 0) {
      levelType.level = 0;
      e.target.value = "0";
    } else if (e.target.value > levelType.maxLevel) {
      levelType.level = levelType.maxLevel;
      e.target.value = levelType.maxLevel.toString();
    } else {
      levelType.level = parseInt(e.target.value);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    let items = levelList.map((level) => ({
      levelId: level.key,
      level: level.level,
    }));

    try {
      const response = await (
        await fetch("/api/roster/levels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(items),
        })
      ).json();

      toast.success("Levels saved!");
    } catch (error: any) {
      toast.error("Failed to save Levels!");
    }
  };

  return (
    <div className="flex flex-row flex-wrap justify-center items-center py-4 gap-x-4 gap-y-2">
      {seasons.map((season) => (
        <div
          key={season.key}
          className="flex flex-row gap-x-2 justify-center items-center"
        >
          <div className="text-sm font-bold">{season.seasonName}:</div>
          <Input
            className="w-20 text-center"
            type="number"
            max={season.maxLevel}
            min={0}
            onBlur={(e) => checkLevel(e, season)}
            defaultValue={season.level > 0 ? season.level.toString() : 0}
          />
        </div>
      ))}
      <div className="flex flex-row justify-center">
        <Button variant="analytica" onClick={handleSave}>
          Save Levels
        </Button>
      </div>
    </div>
  );
}
