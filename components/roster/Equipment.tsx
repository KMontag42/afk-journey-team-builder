"use server";

import EquipmentDialog from "./EquipmentDialog";

import { CharacterClass } from "@/lib/roster";

import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";

type EquipmentProps = {
  user: string;
  characterClasses: CharacterClass[];
};

export default async function Equipment({
  user,
  characterClasses,
}: EquipmentProps) {
  const classes = characterClasses;

  return (
    <Tabs defaultValue="seasonal" className="max-w-[400px]">
      <TabsList>
        <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
        <TabsTrigger value="starter">Starter</TabsTrigger>
      </TabsList>
      <TabsContent value="seasonal">
        <Card>
          <CardHeader>
            <CardTitle className="text-atekgold">Seasonal Gear</CardTitle>
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
                      seasonal={true}
                    ></EquipmentDialog>
                  </Dialog>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="starter">
        <Card>
          <CardHeader>
            <CardTitle className="text-atekgold">Starter Gear</CardTitle>
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
                      seasonal={false}
                    ></EquipmentDialog>
                  </Dialog>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
