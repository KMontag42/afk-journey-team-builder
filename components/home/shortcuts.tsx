"use client";

import { tekImages } from "@/lib/images";
import { RelativePageURLs } from "@/lib/pages";
import { BookMarked, Boxes, CodeXml } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Shortcuts() {
  return (
    <>
      <div className="text-xl font-bold text-center pb-4">Shortcuts</div>
      <div className="grid grid-cols-3 gap-y-8 text-atekgold">
        <Link href={RelativePageURLs.builder}>
          <div className="flex flex-col items-center">
            <Boxes />
            <span className="text-atekwhite pt-2">Builder</span>
          </div>
        </Link>
        <Link href={RelativePageURLs.guides}>
          <div className="flex flex-col items-center">
            <BookMarked />
            <span className="text-atekwhite pt-2">Guides</span>
          </div>
        </Link>
        <Link href={RelativePageURLs.codes}>
          <div className="flex flex-col items-center">
            <CodeXml />
            <span className="text-atekwhite pt-2">Codes</span>
          </div>
        </Link>
        <Link target="_blank" href="https://discord.com/invite/analytica">
          <div className="flex flex-col items-center">
            <Image
              src={tekImages["discordLogo"]}
              alt="Discord Logo"
              className="w-8"
            />
            <span className="text-atekwhite pt-2">Discord</span>
          </div>
        </Link>
      </div>
    </>
  );
}
