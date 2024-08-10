"use server";

import Image from "next/image";

import { getCodesCmsData } from "@/lib/server/cms-data";
import type { Code } from "@/lib/cms-types";
import CodeCard from "@/components/CodeCard";

export default async function Codes() {
  const codesContent = await getCodesCmsData();

  return (
    <div className="container items-center flex flex-col gap-y-4 pb-4">
      <div className="text-atekgold text-xl font-bold pt-2">Active Codes</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-2">
        {codesContent.active.map((code: Code) => (
          <CodeCard key={code.code} code={code}></CodeCard>
        ))}
      </div>
      <div className="text-center text-atekgold font-bold">
        <p>How to Redeem:</p>
        <p>{codesContent.directions}</p>
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-2">
        {codesContent.images.map((imageUrl: string) => (
          <Image
            key={imageUrl}
            src={imageUrl}
            width="200"
            height="435"
            alt="Directions Image"
          />
        ))}
      </div>
    </div>
  );
}
