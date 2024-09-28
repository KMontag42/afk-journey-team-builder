"use client";

import { useEffect, useState } from "react";

import { Talent, TalentsCmsData } from "@/lib/cms-types";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Dialog } from "@/components/ui/dialog";
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
  const [showTalentDetails, setShowTalentDetails] = useState(false);

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
    setShowTalentDetails(false);
  };

  const handleDialogCancel = () => {
    setShowTalentDetails(false);
  };

  const handleSelectTalent = (talent: Talent) => {
    setSelectedTalent(talent);
    setShowTalentDetails(true);
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
            <div className="h-full">
              <Dialog open={showTalentDetails}>
                <TalentDetails
                  selectedTalent={selectedTalent}
                  availableTalents={availableTalents}
                  learnTalent={handleLearnTalent}
                  cancelLearnTalent={handleDialogCancel}
                />
              </Dialog>
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
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
