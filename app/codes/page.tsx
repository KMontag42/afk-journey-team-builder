"use server";

import Image from "next/image";

import { getCodesCmsData } from "@/lib/server/cms-data";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/CopyButton";

export default async function Codes() {
  const codesContent = await getCodesCmsData();

  return (
    <div className="container items-center flex flex-col gap-y-4 pb-4">
      <div className="text-atekgold text-xl font-bold pt-2">Active Codes</div>
      <div>Click to copy</div>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {codesContent.active.map((code: string) => (
          <CopyButton key={code} label={code} />
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
      <div className="text-atekgold text-xl font-bold pt-2">Expired Codes</div>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {codesContent.expired.map((code: string) => (
          <Button key={code} disabled className="mb-2" variant="outline">
            {code}
          </Button>
        ))}
      </div>
    </div>
  );
}
