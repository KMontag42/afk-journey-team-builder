import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

type SectionData = {
  [tier: string]: { name: string; image?: string }[];
};
type Section = {
  name: string;
  value: string;
  data: SectionData;
};
const Sections: Section[] = [
  { name: "Overall", value: "overall", data: OverallTierData },
  { name: "AFK Stages", value: "afk", data: AfkStageTierData },
  { name: "Arena", value: "arena", data: ArenaTierData },
  { name: "Supreme Arena", value: "supreme", data: SupremeArenaTierData },
  { name: "Dream Realm", value: "dream", data: DreamRealmTierData },
  { name: "Skyclops", value: "skyclops", data: SkyclopsTierData },
  { name: "Croaker", value: "croaker", data: CroakerTierData },
  { name: "Orson", value: "orson", data: OrsonTierData },
  { name: "Crystal Beetle", value: "beetle", data: CrystalBeetleTierData },
  { name: "Necrogragon", value: "necro", data: NecrogragonTierData },
  { name: "Snow Stomper", value: "stomper", data: SnowStomperTierData },
  { name: "Lone Gaze", value: "lone", data: LoneGazeTierData },
  { name: "Alpha Bear", value: "bear", data: AlphaBearTierData },
];
const Tiers = ["S+", "S", "A", "B", "C"];

export default async function TierlistPage() {
  return (
    <div className="container sm:container prose prose-invert">
      <Tabs defaultValue="overall" className="hidden sm:block">
        <TabsList>
          {Sections.map((x) => (
            <>
              <TabsTrigger value={x.value}>{x.name}</TabsTrigger>
            </>
          ))}
        </TabsList>
        {Sections.map((x) => (
          <>
            <TabsContent value={x.value}>
              <TierlistSections title={x.name} tiers={x.data} />
            </TabsContent>
          </>
        ))}
      </Tabs>
    </div>
  );
}

type TierlistSectionsProps = {
  title: string;
  tiers?: SectionData;
};
function TierlistSections({ title, tiers }: TierlistSectionsProps) {
  return (
    <>
      <h1>{title}</h1>
      {Tiers.map((tier) => (
        <section key={tier}>
          <h2>{tier}</h2>
          <div className="flex flex-wrap gap-3">
            {tiers &&
              tiers[tier].map((x) => (
                <div className="whitespace-pre border rounded p-4" key={x.name}>
                  {x.name}
                </div>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
