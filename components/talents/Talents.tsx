"use client";

import { Talent, TalentsCmsData } from "@/lib/cms-types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Faction } from "@/lib/characters";

type TalentTreeProps = {
  talents: Talent[];
};

type DropdownContentProps = {
  talent: Talent;
};

export default function Talents({ data }: { data: TalentsCmsData[] }) {
  const [factionTalents, setFactionTalents] = useState(data);
  const [selectedFaction, setSelectedFaction] = useState<string>(
    Faction.Lightbearer,
  );
  const [selectedTalent, setSelectedTalent] = useState("-1");
  const [unlockable, setUnlockable] = useState(false);

  function selectTalent(talentId: string): void {
    setSelectedTalent(talentId);
    setUnlockable(isUnlockable(talentId));
  }

  function isUnlockable(talentId: string): boolean {
    const selectedFactionTalents: Talent[] = data.find(
      (factions) => factions.faction === selectedFaction,
    )?.talents!;
    if (!selectedFactionTalents) {
      return false;
    }

    const selectedTalentData = selectedFactionTalents.find(
      (talent) => talent.id === talentId,
    )!;
    if (selectedTalentData && !selectedTalentData.unlocked) {
      // if the talentId for the selectedFactionTalents doesn't have any relations, it's unlockable.
      if (selectedTalentData.relations.length <= 0) {
        return true;
      }
      //loop through all the relations, checking if any of their parent nodes are unlocked, if so, it's unlockable
      selectedTalentData.relations.forEach((relation) => {
        if (
          selectedFactionTalents.find(
            (talent) => talent.id === relation.targetId,
          )?.unlocked
        ) {
          return true;
        }
      });
    }

    return false;
  }

  function activateTalent(): void {
    const activatedTalent = factionTalents
      .find((faction) => faction.faction === selectedFaction)
      ?.talents!.find((talent) => talent.id === selectedTalent);

    if (activatedTalent) {
      setSelectedTalent("-1");
      activatedTalent.unlocked = true;
    }
  }

  const DropdownContent = ({ talent }: DropdownContentProps) => (
    <DropdownMenuContent className="w-80">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{talent.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-xs">{talent.description}</CardContent>
        {!talent.unlocked && (
          <CardFooter className="flex flex-row justify-center">
            <Button
              disabled={!unlockable}
              variant="analytica"
              onClick={activateTalent}
            >
              <div className="grid grid-cols-2 gap-x-2 justify-center items-center">
                <div className="flex flex-row gap-x-1">
                  {talent.goldCost > 0 && <div>Gold:{talent.goldCost}</div>}
                  {talent.orbCost > 0 && <div>Orbs:{talent.orbCost}</div>}
                  {talent.essenceCost > 0 && (
                    <div>Essence:{talent.essenceCost}</div>
                  )}
                </div>
                <div>Activate</div>
              </div>
            </Button>
          </CardFooter>
        )}
      </Card>
    </DropdownMenuContent>
  );

  const TalentTree = ({ talents }: TalentTreeProps) => (
    <ArcherContainer endMarker={false} strokeWidth={6}>
      <div className="grid grid-cols-5 justify-items-center">
        {talents.map((talent) => {
          return (
            <div
              key={talent.id}
              className={`col-start-${talent.column} h-24 w-28 flex justify-center items-center`}
            >
              <ArcherElement
                id={talent.id}
                relations={
                  talent.relations?.length > 0
                    ? talent.relations.map((relation) => {
                        return {
                          targetId: relation.targetId,
                          targetAnchor: relation.targetAnchor,
                          sourceAnchor: relation.sourceAnchor,
                          style: {
                            strokeColor: talent.unlocked
                              ? talent.color
                              : "gray",
                          },
                        } as RelationType;
                      })
                    : []
                }
              >
                <div className="relative">
                  <DropdownMenu onOpenChange={() => selectTalent(talent.id)}>
                    <DropdownMenuTrigger asChild>
                      <div>
                        <Image
                          className={cn(
                            selectedTalent === talent.id ? "" : "hidden",
                          )}
                          src={talent.bgUrl}
                          alt="Selected Talent"
                          height={talent.bgSize}
                          width={talent.bgSize}
                        />
                        <Image
                          className={cn(
                            talent.unlocked ? "" : "grayscale",
                            selectedTalent === talent.id
                              ? "absolute inset-1"
                              : "",
                          )}
                          src={talent.imageUrl}
                          alt={talent.name}
                          height={talent.size}
                          width={talent.size}
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownContent talent={talent}></DropdownContent>
                  </DropdownMenu>
                </div>
              </ArcherElement>
            </div>
          );
        })}
      </div>
    </ArcherContainer>
  );

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
            <ScrollArea className="h-full">
              <Card className="flex justify-center bg-slate-900 pt-6">
                <CardContent>
                  <TalentTree talents={factionTalents.talents}></TalentTree>
                </CardContent>
              </Card>
            </ScrollArea>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
