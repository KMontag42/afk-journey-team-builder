import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sections } from "@/lib/tierlist";
import { TierlistSection } from "@/components/TierlistSection";
import MobileTierlist from "@/components/MobileTierlist";

export default async function TierlistPage() {
  return (
    <div className="container sm:container prose prose-invert">
      <Tabs defaultValue="overall" className="hidden sm:block">
        <TabsList>
          {Object.values(Sections).map((x) => (
            <>
              <TabsTrigger value={x.value}>{x.name}</TabsTrigger>
            </>
          ))}
        </TabsList>
        {Object.values(Sections).map((x) => (
          <>
            <TabsContent value={x.value}>
              <TierlistSection title={x.name} tiers={x.data} />
            </TabsContent>
          </>
        ))}
      </Tabs>
      <MobileTierlist />
    </div>
  );
}
