import Search from "@/components/Search";
import { getCmsData } from "@/lib/server/cms-data";
import { mostPopularFormations } from "@/lib/server/formations";

export default async function SearchPage() {
  const cmsData = await getCmsData();
  const prePopulated = await mostPopularFormations(5);

  return (
    <div className="container">
      <Search cmsData={cmsData} prePopulated={prePopulated} />
    </div>
  );
}
