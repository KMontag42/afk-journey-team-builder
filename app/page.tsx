"use server";

import Image from "next/image";
import { tekImages } from "@/lib/images";
import NewestFormations from "@/components/NewestFormations";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Home() {
  return (
    <div className="flex flex-col items-center pt-2 gap-2">
      <Image
        src={tekImages["tekLogo"]}
        alt="Tekken Emblem"
        className="w-56 mx-auto"
      />
      <p>Build formations and share them.</p>
      <p>Download as images, or share as links.</p>
      <p>Register to save and make searchable.</p>

      <Separator className="my-2" />
      <h2 className="mb-4 text-2xl">New Formations</h2>
      <ScrollArea className="h-[65vh] px-4">
        <NewestFormations />
      </ScrollArea>
    </div>
  );
}
