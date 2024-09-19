"use client";

import { useState } from "react";

import { Faction } from "@/lib/characters";
import { TalentsCmsData } from "@/lib/cms-types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TalentTree from "@/components/talents/TalentTree";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function Talents({ data }: { data: TalentsCmsData[] }) {
  const [talents, setTalents] = useState(data);
  const [selectedTalents, setSelectedTalents] = useState<string[]>([]);
  const [availableTalents, setAvailableTalents] = useState<string[]>([]);
  const [selectedFaction, setSelectedFaction] = useState<string>(
    Faction.Lightbearer,
  );
  const [selectedTalent, setSelectedTalent] = useState<string>("-1");

  return (
    <Tabs
      className="flex flex-col items-center pb-8"
      defaultValue="lightbearer"
      onValueChange={setSelectedFaction}
    >
      <TabsList className="h-12">
        {data.map((factionTalents) => {
          return (
            <TabsTrigger
              key={factionTalents.faction}
              value={factionTalents.faction}
            >
              <Image
                alt={factionTalents.faction}
                src={factionTalents.imageUrl}
                width={32}
                height={32}
              />
            </TabsTrigger>
          );
        })}
      </TabsList>
      {data.map((factionTalents) => {
        return (
          <TabsContent
            className="max-h-[75vh]"
            key={factionTalents.faction}
            value={factionTalents.faction}
          >
            <div className="hidden lg:grid lg:grid-cols-4 gap-x-4 h-full">
              <Card className="flex justify-center bg-slate-900 pt-2">
                <CardContent className="p-2">
                  <Card>
                    <CardHeader>Name</CardHeader>
                    <CardContent>Details details details</CardContent>
                    <CardFooter>Button</CardFooter>
                  </Card>
                </CardContent>
              </Card>
              <ScrollArea className="h-full col-span-2">
                <Card className="flex justify-center bg-slate-900 pt-6">
                  <CardContent>
                    <TalentTree
                      talents={factionTalents.talents}
                      selectedTalent={selectedTalent}
                    />
                  </CardContent>
                </Card>
              </ScrollArea>
              <Card className="flex justify-center bg-slate-900 pt-2">
                <CardContent className="p-2">
                  <div>Talent Skill Mechanism and Details</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-y-2 lg:hidden">
              <div className="flex flex-row gap-x-2 justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="analytica">Stats Info</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw]">
                    <div>Left Pane</div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="analytica">Talent Skill</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw]">
                    <div>Right Pane</div>
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="h-full">
                <Card className="flex justify-center bg-slate-900 pt-6">
                  <CardContent>
                    <TalentTree
                      talents={factionTalents.talents}
                      selectedTalent={selectedTalent}
                    />
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
