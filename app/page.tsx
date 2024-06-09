"use server";

import Image from "next/image";
import { tekImages } from "@/lib/images";

export default async function Home() {
  return (
      <div className="flex flex-col items-center pt-2">
        <Image
          src={tekImages["tekLogo"]}
          alt="Tekken Emblem"
          className="w-56"
        />
        <p>Build formations and share them.</p>
        <p>Download formations as images, or share as a link.</p>
        <p>Register to save formations, which makes them searchable.</p>
      </div>
  );
}
