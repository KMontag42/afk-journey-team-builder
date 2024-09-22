import { TalentsCmsData } from "@/lib/cms-types";

export type TalentsData = {
  selectedFaction: string;
  selectedTalent: string;
  availableTalents: string[];
  purchasedTalents: string[];
  talentData: TalentsCmsData[];
};
