"use server";

import Image from "next/image";
import { tekImages } from "@/lib/images";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-8">
      <div className="flex flex-col items-center">
        <Image
          src={tekImages["tekLogo"]}
          alt="Tekken Emblem"
          className="w-56"
        />
      </div>
    </main>
  );
}
