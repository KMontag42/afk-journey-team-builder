"use server";

import { Card, CardContent } from "@/components/ui/card";
import CopyButton from "./CopyButton";
import { Code } from "@/lib/cms-types";

type CodeCardProps = {
  code: Code;
  rewards: string;
};

export default async function CodeCard({ code }: CodeCardProps) {
  return (
    <Card className="border-atekgold pt-4 w-80">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 justify-center items-center pb-4">
        <div className="md:col-span-2 text-center">
          <div className="flex flex-row justify-center text-atekgold font-bold">
            {code.code}
          </div>
          <div className="pb-2 md:pb-0">{code.rewards}</div>
        </div>
        <CopyButton code={code.code}></CopyButton>
      </CardContent>
    </Card>
  );
}
