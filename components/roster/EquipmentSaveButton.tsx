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
  };

  return <Button onClick={saveGearChanges}>Save changes</Button>;
}
