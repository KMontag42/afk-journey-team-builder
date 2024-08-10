"use client";

import EquipmentDialog from "./EquipmentDialog";

import { CharacterClass, Season } from "@/lib/roster";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type EquipmentProps = {
  user: string;
  characterClasses: CharacterClass[];
  seasonList: Season[];
};

export default function Equipment({
  user,
  characterClasses,
  seasonList,
}: EquipmentProps) {
  const classes = characterClasses;
  const seasons = seasonList;

  const [selectedSeason, setSelectedSeason] = useState<Season>(seasons[0]);

  return (
    <div className="flex flex-col justify-center gap-2">
      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select a Season" />
        </SelectTrigger>
        <SelectContent>
          {seasons.map((season: Season) => (
            <SelectItem value={season.key}>{season.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-atekgold">
            {selectedSeason.name} Equipment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-y-4 pr-2">
            {classes.map((characterClass) => (
              <div key={characterClass.name}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link">
                      <Image
                        className="justify-self-end"
                        alt={characterClass.name}
                        src={characterClass.imageUrl}
                        width={48}
                        height={48}
                      />
                      <Label className="pl-2 text-xs">
                        {characterClass.name}
                      </Label>
                    </Button>
                  </DialogTrigger>
                  <EquipmentDialog
                    user={user}
                    name={characterClass.name}
                    season={selectedSeason}
                  ></EquipmentDialog>
                </Dialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
