"use server";

import { getGuidePages } from "@/lib/server/cms-data";
import { getSections } from "@/lib/nav-menu-builder";
import NavMenu from "@/components/NavMenu";

export default async function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const guidePages = await getGuidePages();
  
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-start w-[min(100%)] lg:w-[min(100%,1024px)] pl-2 sm:pl-0">
          <NavMenu sections={getSections("/guides", guidePages)}></NavMenu>
        </div>
        {children}
      </div>
    </>
  );
}
