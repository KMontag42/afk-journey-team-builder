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

export default async function TierlistPage() {
  return (
    <div className="container sm:container prose prose-invert">
      <Tabs defaultValue="overall" className="hidden sm:block">
        <TabsList>
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="afk">AFK Stages</TabsTrigger>
          <TabsTrigger value="arena">Arena</TabsTrigger>
          <TabsTrigger value="supreme">Supreme Arena</TabsTrigger>
          <TabsTrigger value="dream">Dream Realm</TabsTrigger>
          <TabsTrigger value="skyclops">Skyclops</TabsTrigger>
          <TabsTrigger value="croaker">Croaker</TabsTrigger>
          <TabsTrigger value="orson">Orson</TabsTrigger>
          <TabsTrigger value="beetle">Crystal Beetle</TabsTrigger>
          <TabsTrigger value="necro">Necrogragon</TabsTrigger>
          <TabsTrigger value="stomper">Snow Stomper</TabsTrigger>
          <TabsTrigger value="lone">Lone Gaze</TabsTrigger>
          <TabsTrigger value="bear">Alpha Bear</TabsTrigger>
        </TabsList>
        <TabsContent value="overall">
          <TierlistSections title="Overall" tiers={OverallTierData} />
        </TabsContent>
        <TabsContent value="afk">
          <TierlistSections title="AFK Stages" tiers={AfkStageTierData} />
        </TabsContent>
        <TabsContent value="arena">
          <TierlistSections title="Arena" tiers={ArenaTierData} />
        </TabsContent>
        <TabsContent value="supreme">
          <TierlistSections
            title="Supreme Arena"
            tiers={SupremeArenaTierData}
          />
        </TabsContent>
        <TabsContent value="dream">
          <TierlistSections title="Dream Realm" tiers={DreamRealmTierData} />
        </TabsContent>
        <TabsContent value="skyclops">
          <TierlistSections title="Skyclops" tiers={SkyclopsTierData} />
        </TabsContent>
        <TabsContent value="croaker">
          <TierlistSections title="Croaker" tiers={CroakerTierData} />
        </TabsContent>
        <TabsContent value="orson">
          <TierlistSections title="Orson" tiers={OrsonTierData} />
        </TabsContent>
        <TabsContent value="beetle">
          <TierlistSections
            title="Crystal Beetle"
            tiers={CrystalBeetleTierData}
          />
        </TabsContent>
        <TabsContent value="necro">
          <TierlistSections title="Necrogragon" tiers={NecrogragonTierData} />
        </TabsContent>
        <TabsContent value="stomper">
          <TierlistSections title="Snow Stomper" tiers={SnowStomperTierData} />
        </TabsContent>
        <TabsContent value="lone">
          <TierlistSections title="Lone Gaze" tiers={LoneGazeTierData} />
        </TabsContent>
        <TabsContent value="bear">
          <TierlistSections title="Alpha Bear" tiers={AlphaBearTierData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Tiers = ["S+", "S", "A", "B", "C"];
type TierlistSectionsProps = {
  title: string;
  tiers?: {
    [tier: string]: { name: string; image?: string }[];
  };
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
