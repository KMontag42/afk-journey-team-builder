"use client";

import { Talent } from "@/lib/cms-types";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

type TalentDetailProps = {
  selectedTalent: Talent;
  availableTalents: { [key: string]: Talent };
  learnTalent: (talent: Talent) => void;
  cancelLearnTalent: () => void;
};

export default function TalentDetails({
  selectedTalent,
  availableTalents,
  learnTalent,
  cancelLearnTalent,
}: TalentDetailProps) {
  return (
    <DialogContent className="max-w-80">
      <DialogTitle className="text-atekgold font-bold text-lg">
        {selectedTalent.name}
      </DialogTitle>
      <div className="text-sm">{selectedTalent.description}</div>
      <DialogFooter className="flex flex-row justify-center wrap gap-2">
        <Button variant="analytica" onClick={() => cancelLearnTalent()}>
          Close
        </Button>
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
      </DialogFooter>
    </DialogContent>
  );
}
