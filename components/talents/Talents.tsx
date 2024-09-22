"use client";

import { useReducer } from "react";

import { TalentsCmsData } from "@/lib/cms-types";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TalentTree from "@/components/talents/TalentTree";
import TalentDetails from "@/components/talents/TalentDetails";
import { useTalents, useTalentsDispatch } from "@/app/talents/talents-context";
import { TalentsData } from "@/lib/talents";

export default function Talents({ data }: { data: TalentsCmsData[] }) {
  const talentsContext: TalentsData = useTalents();
  const dispatch = useTalentsDispatch()!;

  // default talents at the start that are available
  talentsContext.availableTalents = ["l1", "w1", "m1", "g1", "h0"];
  talentsContext.talentData = data;

  return (
    <Tabs
      className="flex flex-col items-center pb-8"
      defaultValue="lightbearer"
      onValueChange={() => dispatch({ type: "select", talentId: "" })}
    >
      <TabsList className="h-12">
        {talentsContext.talentData.map((factionTalents) => {
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
      {talentsContext.talentData.map((factionTalents) => {
        return (
          <TabsContent
            className="max-h-[75vh]"
            key={factionTalents.faction}
            value={factionTalents.faction}
          >
            <div className="hidden lg:grid lg:grid-cols-4 gap-x-4 h-full">
              <Card className="flex justify-center bg-slate-900 pt-2">
                <CardContent className="grid grid-row-2 p-2 w-full">
                  <div className="text-center">
                    Unlocked Stats Unlocked Stats Unlocked Stats Unlocked Stats
                    Unlocked Stats Unlocked Stats Unlocked Stats Unlocked Stats
                    Unlocked Stats Unlocked Stats Unlocked Stats Unlocked Stats
                    Unlocked Stats Unlocked Stats Unlocked Stats Unlocked Stats
                    Unlocked Stats Unlocked Stats Unlocked Stats Unlocked Stats
                    Unlocked Stats Unlocked Stats Unlocked Stats Unlocked Stats
                  </div>
                  <TalentDetails talents={factionTalents.talents} />
                </CardContent>
              </Card>
              <ScrollArea className="h-full col-span-2 mb-4">
                <Card className="flex justify-center bg-slate-900 pt-6">
                  <CardContent>
                    <TalentTree talents={factionTalents.talents} />
                  </CardContent>
                </Card>
              </ScrollArea>
              <Card className="flex justify-center bg-slate-900 pt-2">
                <CardContent className="grid grid-rows-2 p-2">
                  <div>Talent Skill Mechanism and Details and upgrades</div>
                  <div>Total Cost</div>
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
              <ScrollArea className="h-full mb-4">
                <Card className="flex justify-center bg-slate-900 pt-6">
                  <CardContent>
                    <TalentTree talents={factionTalents.talents} />
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
