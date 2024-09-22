"use client";

import { cn } from "@/lib/utils";
import { ArcherContainer, ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";
import Image from "next/image";
import { Talent } from "@/lib/cms-types";

type TalentTreeProps = {
  talents: { [key: string]: Talent };
  selectedTalent: Talent;
  selectTalent: (talent: Talent) => void;
};

export default function TalentTree({
  talents,
  selectedTalent,
  selectTalent,
}: TalentTreeProps) {
  return (
    <ArcherContainer endMarker={false} strokeWidth={6}>
      <div className="grid grid-cols-5 justify-items-center">
        {Object.values(talents).map((talent) => {
          return (
            <div
              key={talent.id}
              className={`col-start-${talent.column} h-20 w-28 flex justify-center items-center`}
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
                <div
                  className="relative"
                  onClick={() => {
                    selectTalent(talent);
                  }}
                >
                  <div>
                    <Image
                      className={cn(
                        talent.unlocked
                          ? ""
                          : selectedTalent.id === talent.id
                            ? ""
                            : "hidden",
                      )}
                      src={talent.bgUrl}
                      alt="Selected Talent"
                      height={talent.bgSize}
                      width={talent.bgSize}
                    />
                    <Image
                      className={cn(
                        talent.unlocked ? "absolute inset-1" : "grayscale",
                        selectedTalent.id === talent.id
                          ? "absolute inset-1"
                          : "",
                      )}
                      src={talent.imageUrl}
                      alt={talent.name}
                      height={talent.size}
                      width={talent.size}
                    />
                  </div>
                </div>
              </ArcherElement>
            </div>
          );
        })}
      </div>
    </ArcherContainer>
  );
}
