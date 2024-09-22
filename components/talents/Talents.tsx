"use client";

import { useEffect, useState } from "react";

import { Talent, TalentsCmsData } from "@/lib/cms-types";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TalentTree from "@/components/talents/TalentTree";
import TalentDetails from "@/components/talents/TalentDetails";
import { excludeKeysFromObject } from "@/lib/utils";

export default function Talents({ data }: { data: TalentsCmsData }) {
  const availableFactions = Object.entries(data).map(([faction, info]) => {
    return {
      faction,
      imageUrl: info.imageUrl,
    };
  });
  const [selectedFaction, setSelectedFaction] = useState("lightbearer");
  const [factionTalents, setFactionTalents] = useState(
    data[selectedFaction].talents,
  );
  const [selectedTalent, setSelectedTalent] = useState(
    Object.values(factionTalents)[0],
  );
  const learnedTalents = Object.values(factionTalents).filter(
    (talent) => talent.unlocked,
  );
  const availableTalents = excludeKeysFromObject(
    factionTalents,
    learnedTalents.map((talent) => talent.id),
  );
  const totalSpend = learnedTalents.reduce(
    (acc, talent) => {
      return {
        gold: acc.gold + talent.goldCost,
        orb: acc.orb + talent.orbCost,
        essence: acc.essence + talent.essenceCost,
      };
    },
    { gold: 0, orb: 0, essence: 0 },
  );

  useEffect(() => {
    const factionFirstLetter = selectedFaction[0].toLowerCase();
    setFactionTalents(data[selectedFaction].talents);
    setSelectedTalent(data[selectedFaction].talents[`${factionFirstLetter}0`]);
  }, [data, selectedFaction]);

  const handleLearnTalent = (talent: Talent) => {
    setFactionTalents({
      ...factionTalents,
      [talent.id]: { ...talent, unlocked: true },
    });
  };

  const handleSelectTalent = (talent: Talent) => {
    setSelectedTalent(talent);
  };

  const handleSelectFaction = (faction: string) => {
    setSelectedFaction(faction);
  };

  return (
    <Tabs
      className="flex flex-col items-center pb-8"
      onValueChange={handleSelectFaction}
      value={selectedFaction}
    >
      <TabsList className="h-12">
        {availableFactions.map((factionInfo) => {
          return (
            <TabsTrigger key={factionInfo.faction} value={factionInfo.faction}>
              <Image
                alt={factionInfo.faction}
                src={factionInfo.imageUrl}
                width={32}
                height={32}
              />
            </TabsTrigger>
          );
        })}
      </TabsList>
      {availableFactions.map((factionInfo) => {
        return (
          <TabsContent
            className="max-h-[75vh]"
            key={factionInfo.faction}
            value={factionInfo.faction}
          >
            <div className="hidden lg:grid lg:grid-cols-4 gap-x-4 h-full">
              <Card className="flex justify-center bg-slate-900 pt-2">
                <CardContent className="grid grid-row-2 p-2 w-full">
                  <div className="text-center">
                    Unlocked Stats Unlocked Stats Unlocked Stats Unlocked Stats
                    Unlocked Stats Unlocked Stats Unlocked Stats Unlocked Stats
                  </div>
                  <TalentDetails
                    selectedTalent={selectedTalent}
                    availableTalents={availableTalents}
                    learnTalent={handleLearnTalent}
                  />
                </CardContent>
              </Card>
              <ScrollArea className="h-full col-span-2 mb-4">
                <Card className="flex justify-center bg-slate-900 pt-6">
                  <CardContent>
                    <TalentTree
                      talents={factionTalents}
                      selectedTalent={selectedTalent}
                      selectTalent={handleSelectTalent}
                    />
                  </CardContent>
                </Card>
              </ScrollArea>
              <Card className="flex justify-center bg-slate-900 pt-2">
                <CardContent className="grid grid-rows-2 p-2">
                  <div>Talent Skill Mechanism and Details and upgrades</div>
                  <div>
                    <p className="text-xl">Total Cost</p>
                    <hr className="my-2" />
                    <table>
                      <tbody>
                        <tr>
                          <td>Gold:</td>
                          <td>{totalSpend.gold}</td>
                        </tr>
                        <tr>
                          <td>Orbs:</td>
                          <td>{totalSpend.orb}</td>
                        </tr>
                        <tr>
                          <td>Essence:</td>
                          <td>{totalSpend.essence}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                    <TalentTree
                      talents={factionTalents}
                      selectedTalent={selectedTalent}
                      selectTalent={handleSelectTalent}
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
