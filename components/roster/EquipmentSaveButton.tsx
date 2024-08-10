"use client";

import { Button } from "@/components/ui/button";

type SaveEquipmentProps = {
  user: string;
  classType: string;
  seasonal: boolean;
  allGearLevels: number[];
};

export default function EquipmentDialog({
  user,
  classType,
  seasonal,
  allGearLevels,
}: SaveEquipmentProps) {
  const saveGearChanges = async () => {
    console.log(allGearLevels);

    try {
      const response = await (
        await fetch("/api/roster/equipment", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      console.log(response);
    } catch (error: any) {
      console.log("Failed to find formation");
    }
  };

  return <Button onClick={saveGearChanges}>Save changes</Button>;
}
