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
      <div className="flex justify-center">
        <div className="container lg:w-[1100px]">
          <NavMenu sections={getSections("/guides", guidePages)}></NavMenu>
        </div>
      </div>
      <div className="flex flex-col items-center w-full lg:w-[min(100%)]">
        {children}
      </div>
    </>
  );
}
