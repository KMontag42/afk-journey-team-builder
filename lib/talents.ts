import { TalentsCmsData } from "@/lib/cms-types";

export type TalentsData = {
  selectedTalent: string;
  availableTalents: string[];
  purchasedTalents: string[];
  talentData: TalentsCmsData[];
};
