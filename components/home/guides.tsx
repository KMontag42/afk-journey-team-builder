"use server";

import Image from "next/image";
import Link from "next/link";
import { getGuideHomePage } from "@/lib/server/cms-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Guides() {
  const data = await getGuideHomePage();

  return (
    <>
      <div className="text-xl font-bold pb-4">Guide Feed</div>
      <div className="flex flex-col gap-y-2">
        {data.banners.map((guide) => (
          <Card key={guide.key}>
            <CardContent className="grid grid-cols-1 lg:grid-cols-5 pt-6 gap-6">
              <Image
                src={guide.imageLink}
                alt={guide.guideLink}
                width={265}
                height={500}
                className="lg:col-span-2"
              />
              <div className="lg:col-span-3 grid grid-cols-1 gap-y-2">
                <div className="font-bold text-atekgold text-2xl">
                  {guide.name}
                </div>
                <div className="indent-4">{guide.description}</div>
                <Link className="flex justify-end" href={guide.guideLink}>
                  <Button className="bg-atekgold">Read</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
