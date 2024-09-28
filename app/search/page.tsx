import Search from "@/components/Search";
import { getCmsData } from "@/lib/server/cms-data";
import { mostPopularFormations } from "@/lib/server/formations";
import { auth } from "@clerk/nextjs/server";

export default async function SearchPage() {
  const cmsData = await getCmsData();
  const prePopulated = await mostPopularFormations(5);
  const { userId } = auth();

  return (
    <div className="container">
      <Search
        cmsData={cmsData}
        prePopulated={prePopulated}
        currentUserId={userId}
      />
    </div>
  );
}
