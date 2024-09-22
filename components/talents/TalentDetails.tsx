"use client";

import { Talent, TalentsCmsData } from "@/lib/cms-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TalentsData } from "@/lib/talents";
import { useTalents, useTalentsDispatch } from "@/app/talents/talents-context";
import { Button } from "@/components/ui/button";

type TalentDetailProps = {
  talents: Talent[];
};

export default function TalentDetails({ talents }: TalentDetailProps) {
  const talentsContext: TalentsData = useTalents();
  const dispatch = useTalentsDispatch()!;

  const selectedTalentDetails: Talent = talents.find(
    (talent) => talent.id === talentsContext.selectedTalent,
  )
    ? talents.find((talent) => talent.id === talentsContext.selectedTalent)!
    : talents[0]!;

  return (
    <Card>
      <CardHeader className="text-atekgold font-bold text-lg">
        {selectedTalentDetails.name}
      </CardHeader>
      <CardContent className="text-sm">
        {selectedTalentDetails.description}
      </CardContent>
      <CardFooter>
        {talentsContext.availableTalents.includes(
          talentsContext.selectedTalent,
        ) && (
          <Button
            variant="analytica"
            onClick={() =>
              dispatch({ type: "add", talentId: talentsContext.selectedTalent })
            }
          >
            <div className="grid grid-cols-2 gap-x-2 justify-center items-center">
              <div className="flex flex-row gap-x-1">
                {selectedTalentDetails.goldCost > 0 && (
                  <div>Gold:{selectedTalentDetails.goldCost}</div>
                )}
                {selectedTalentDetails.orbCost > 0 && (
                  <div>Orbs:{selectedTalentDetails.orbCost}</div>
                )}
                {selectedTalentDetails.essenceCost > 0 && (
                  <div>Essence:{selectedTalentDetails.essenceCost}</div>
                )}
              </div>
              <div>Activate</div>
            </div>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
