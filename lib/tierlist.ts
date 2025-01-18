import OverallTierData from "@/public/overall-tier-data.json";
import AfkStageTierData from "@/public/afkstage-tier-data.json";
import ArenaTierData from "@/public/arena-tier-data.json";
import SupremeArenaTierData from "@/public/supremearena-tier-data.json";
import DreamRealmTierData from "@/public/dreamrealm-tier-data.json";
import SkyclopsTierData from "@/public/skyclops-tier-data.json";
import CroakerTierData from "@/public/croaker-tier-data.json";
import OrsonTierData from "@/public/orson-tier-data.json";
import CrystalBeetleTierData from "@/public/crystalbeetle-tier-data.json";
import NecrogragonTierData from "@/public/necrogragon-tier-data.json";
import SnowStomperTierData from "@/public/snowstomper-tier-data.json";
import LoneGazeTierData from "@/public/lonegaze-tier-data.json";
import AlphaBearTierData from "@/public/alphabear-tier-data.json";

export type SectionData = {
  [tier: string]: { name: string; image?: string; tier?: string }[];
};
export type Section = {
  name: string;
  value: string;
  data: SectionData;
};
export const Sections: { [name: string]: Section } = {
  overall: { name: "Overall", value: "overall", data: OverallTierData },
  afk: { name: "AFK Stages", value: "afk", data: AfkStageTierData },
  arena: { name: "Arena", value: "arena", data: ArenaTierData },
  supreme: {
    name: "Supreme Arena",
    value: "supreme",
    data: SupremeArenaTierData,
  },
  dream: { name: "Dream Realm", value: "dream", data: DreamRealmTierData },
  skyclops: { name: "Skyclops", value: "skyclops", data: SkyclopsTierData },
  croaker: { name: "Croaker", value: "croaker", data: CroakerTierData },
  orson: { name: "Orson", value: "orson", data: OrsonTierData },
  beetle: {
    name: "Crystal Beetle",
    value: "beetle",
    data: CrystalBeetleTierData,
  },
  necro: { name: "Necrogragon", value: "necro", data: NecrogragonTierData },
  stomper: {
    name: "Snow Stomper",
    value: "stomper",
    data: SnowStomperTierData,
  },
  lone: { name: "Lone Gaze", value: "lone", data: LoneGazeTierData },
  bear: { name: "Alpha Bear", value: "bear", data: AlphaBearTierData },
};
export type Tier = {
  name: string;
  bgName: string;
  bgSection: string;
};
export const Tiers: { [name: string]: Tier } = {
  "S+": { name: "S+", bgName: "#d85c5c", bgSection: "#ea9999" },
  S: { name: "S", bgName: "#ea8e5c", bgSection: "#f5bf99" },
  A: { name: "A", bgName: "#ffce5d", bgSection: "#ffe599" },
  B: { name: "B", bgName: "#bbc167", bgSection: "#dadea1" },
  C: { name: "C", bgName: "#82b570", bgSection: "#b6d7a8" },
};
