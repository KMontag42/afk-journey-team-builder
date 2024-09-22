"use client";

import { Talent } from "@/lib/cms-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TalentDetailProps = {
  selectedTalent: Talent;
  availableTalents: { [key: string]: Talent };
  learnTalent: (talent: Talent) => void;
};

export default function TalentDetails({
  selectedTalent,
  availableTalents,
  learnTalent,
}: TalentDetailProps) {
  return (
    <Card>
      <CardHeader className="text-atekgold font-bold text-lg">
        {selectedTalent.name}
      </CardHeader>
      <CardContent className="text-sm">
        {selectedTalent.description}
      </CardContent>
      <CardFooter>
        {availableTalents[selectedTalent.id] && (
          <Button
            variant="analytica"
            onClick={() => learnTalent(selectedTalent)}
          >
            <div className="grid grid-cols-2 gap-x-2 justify-center items-center">
              <div className="flex flex-row gap-x-1">
                {selectedTalent.goldCost > 0 && (
                  <div>Gold:{selectedTalent.goldCost}</div>
                )}
                {selectedTalent.orbCost > 0 && (
                  <div>Orbs:{selectedTalent.orbCost}</div>
                )}
                {selectedTalent.essenceCost > 0 && (
                  <div>Essence:{selectedTalent.essenceCost}</div>
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
