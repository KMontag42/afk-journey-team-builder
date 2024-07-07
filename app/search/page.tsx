import Search from "@/components/Search";
import { getCmsData } from "@/lib/server/cms-data";

export default async function SearchPage() {
  const cmsData = await getCmsData();

  return (
    <div className="container">
      <Search cmsData={cmsData} />
    </div>
  );
}
