"use client";

import { FormEvent, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { CharacterClass } from "@/lib/characters";
import { Gear, GearClass } from "@/lib/roster";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

type EquipmentProps = {
  equipmentList: GearClass[];
};

type Action = {
  type: "increment" | "decrement";
  class: CharacterClass;
  equipment: Gear;
};

function reducer(equipment: GearClass[], action: Action) {
  return equipment;
}

export default function Equipment({ equipmentList }: EquipmentProps) {
  const [equipment, dispatch] = useReducer(reducer, equipmentList);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex flex-row flex-wrap gap-x-2 items-center font-bold text-lg text-atekgold">
        <span>Equipment</span>
        <Button variant="analytica" onClick={handleSave}>
          Save
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {equipmentList.map((charClass) => (
          <Card key={[charClass.season, charClass.class].join("_")}>
            <CardHeader>
              <div className="text-atekgold font-bold">
                {charClass.class.toLocaleUpperCase()} - {charClass.season}
              </div>
            </CardHeader>
            <CardContent className="flex flex-row items-center gap-x-2 p-2">
              {charClass.equipment.map((equipment) => (
                <div
                  key={[
                    charClass.season,
                    charClass.class,
                    equipment.equipmentSlot,
                  ].join("_")}
                >
                  <Image
                    alt={charClass.class + equipment.equipmentSlot}
                    src={""}
                    width={48}
                    height={48}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="analytica" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
