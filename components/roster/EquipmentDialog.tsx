"use client";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EquipmentSaveButton from "@/components/roster/EquipmentSaveButton";
import { useState } from "react";
import { Season } from "@/lib/roster";

type DialogProps = {
  user: string;
  name: string;
  season: Season;
};

export default function EquipmentDialog({ user, name, season }: DialogProps) {
  const [weaponLevel, setWeaponLevel] = useState(0);
  const [handsLevel, setHandsLevel] = useState(0);
  const [accessoryLevel, setAccessoryLevel] = useState(0);
  const [headLevel, setHeadLevel] = useState(0);
  const [bodyLevel, setBodyLevel] = useState(0);
  const [legsLevel, setLegsLevel] = useState(0);

  const allGear = [
    weaponLevel,
    handsLevel,
    accessoryLevel,
    headLevel,
    bodyLevel,
    legsLevel,
  ];

  const handleGearLevelChange = async (
    increment: number,
    equipmentLevel: number,
    setEquipmentLevel: Function,
  ) => {
    if (equipmentLevel + increment < 0) {
      setEquipmentLevel(0);
    } else if (seasonal && equipmentLevel + increment > MAX_SEASONAL_LEVEL) {
      setEquipmentLevel(MAX_SEASONAL_LEVEL);
    } else if (!seasonal && equipmentLevel + increment > MAX_STARTER_LEVEL) {
      setEquipmentLevel(MAX_STARTER_LEVEL);
    } else {
      setEquipmentLevel(equipmentLevel + increment);
    }
  };

  const handleChangeAll = async (increment: number) => {
    handleGearLevelChange(increment, weaponLevel, setWeaponLevel);
    handleGearLevelChange(increment, handsLevel, setHandsLevel);
    handleGearLevelChange(increment, accessoryLevel, setAccessoryLevel);
    handleGearLevelChange(increment, headLevel, setHeadLevel);
    handleGearLevelChange(increment, bodyLevel, setBodyLevel);
    handleGearLevelChange(increment, legsLevel, setLegsLevel);
  };

  return (
    <DialogContent className="sm:max-w-screen-sm">
      <DialogHeader>
        <DialogTitle>
          {(seasonal ? "Seasonal - " : "Starter - ") + name}
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 sm:grid-cols-3 justify-center gap-6">
        <div className="flex flex-col items-center">
          <div className="pb-2">Weapon</div>
          <div className="flex flex-row">
            <Button
              variant="outline"
              onClick={() =>
                handleGearLevelChange(-5, weaponLevel, setWeaponLevel)
              }
            >
              -5
            </Button>
            <Input disabled className="w-16 text-center" value={weaponLevel} />
            <Button
              variant="outline"
              onClick={() =>
                handleGearLevelChange(+5, weaponLevel, setWeaponLevel)
              }
            >
              +5
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="pb-2">Hands</div>
          <div className="flex flex-row">
            <Button
              variant="outline"
              onClick={() =>
                handleGearLevelChange(-5, handsLevel, setHandsLevel)
              }
            >
              -5
            </Button>
            <Input disabled className="w-16 text-center" value={handsLevel} />
            <Button
              variant="outline"
              onClick={() =>
                handleGearLevelChange(+5, handsLevel, setHandsLevel)
              }
            >
              +5
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="pb-2">Accessory</div>
          <div className="flex flex-row">
            <Button
              variant="outline"
              onClick={() =>
                handleGearLevelChange(-5, accessoryLevel, setAccessoryLevel)
              }
            >
              -5
            </Button>
            <Input
              disabled
              className="w-16 text-center"
              value={accessoryLevel}
            />
            <Button
              variant="outline"
              onClick={() =>
                handleGearLevelChange(+5, accessoryLevel, setAccessoryLevel)
              }
            >
              +5
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="pb-2">Head</div>
          <div className="flex flex-row">
            <Button
              variant="outline"
              onClick={() => handleGearLevelChange(-5, headLevel, setHeadLevel)}
            >
              -5
            </Button>
            <Input disabled className="w-16 text-center" value={headLevel} />
            <Button
              variant="outline"
              onClick={() => handleGearLevelChange(+5, headLevel, setHeadLevel)}
            >
              +5
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="pb-2">Body</div>
          <div className="flex flex-row">
            <Button
              variant="outline"
              onClick={() => handleGearLevelChange(-5, bodyLevel, setBodyLevel)}
            >
              -5
            </Button>
            <Input disabled className="w-16 text-center" value={bodyLevel} />
            <Button
              variant="outline"
              onClick={() => handleGearLevelChange(+5, bodyLevel, setBodyLevel)}
            >
              +5
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="pb-2">Legs</div>
          <div className="flex flex-row">
            <Button
              variant="outline"
              onClick={() => handleGearLevelChange(-5, legsLevel, setLegsLevel)}
            >
              -5
            </Button>
            <Input disabled className="w-16 text-center" value={legsLevel} />
            <Button
              variant="outline"
              onClick={() => handleGearLevelChange(+5, legsLevel, setLegsLevel)}
            >
              +5
            </Button>
          </div>
        </div>
      </div>
      <DialogFooter className="flex flex-row gap-x-2 justify-end">
        <Button variant="outline" onClick={() => handleChangeAll(-100)}>
          All -100
        </Button>
        <Button variant="outline" onClick={() => handleChangeAll(100)}>
          All +100
        </Button>
        <EquipmentSaveButton
          user={user}
          classType={name}
          seasonal={true}
          allGearLevels={allGear}
        />
      </DialogFooter>
    </DialogContent>
  );
}
