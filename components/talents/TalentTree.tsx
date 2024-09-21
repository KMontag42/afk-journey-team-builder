"use client";

import { cn } from "@/lib/utils";
import { ArcherContainer, ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";
import Image from "next/image";
import { Talent } from "@/lib/cms-types";
import { useTalents, useTalentsDispatch } from "@/app/talents/talents-context";
import { TalentsData } from "@/lib/talents";

type TalentTreeProps = {
  talents: Talent[];
};

export default function TalentTree({ talents }: TalentTreeProps) {
  const talentsContext: TalentsData = useTalents();
  const dispatch = useTalentsDispatch();
  const selectedTalent = talentsContext.selectedTalent;

  return (
    <ArcherContainer endMarker={false} strokeWidth={6}>
      <div className="grid grid-cols-5 justify-items-center">
        {talents.map((talent) => {
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
                  onClick={() =>
                    dispatch!({ type: "select", talentId: talent.id })
                  }
                >
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
                        selectedTalent === talent.id ? "absolute inset-1" : "",
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
