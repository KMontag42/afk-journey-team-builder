"use client";

import { useState } from "react";

import { Faction } from "@/lib/characters";
import { Talent, TalentsCmsData } from "@/lib/cms-types";

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
  const dispatch = useTalentsDispatch();

  const [talents, setTalents] = useState(data);
  const [selectedFaction, setSelectedFaction] = useState<string>(
    Faction.Lightbearer,
  );

  function getTalentDetails(): Talent {
    const selectedFactionTalents = talents.find(
      (talentData) => talentData.faction === selectedFaction,
    )?.talents;

    if (
      !selectedFactionTalents ||
      selectedFactionTalents.find(
        (talent) => talent.id === talentsContext.selectedTalent,
      )
    ) {
      return talents[0].talents[0]; // default talent, this will most likely fall back to the first lightbearer talent
    } else {
      return selectedFactionTalents.find(
        (talent) => talent.id === talentsContext.selectedTalent,
      )!;
    }
  }

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
                  <TalentDetails talent={getTalentDetails()} />
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
