"use server";

import "@/app/guides/guides.css";

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
    <div className="container">
      <NavMenu sections={getSections("/guides", guidePages)}></NavMenu>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}
