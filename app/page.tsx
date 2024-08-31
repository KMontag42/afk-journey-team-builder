"use server";

import Formations from "@/components/home/formations";
import Shortcuts from "@/components/home/shortcuts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Disclaimer from "@/components/home/disclaimer";
import Guides from "@/components/home/guides";

export default async function Home() {
  return (
    <div className="container flex flex-col gap-4 justify-center items-center text-atekwhite pb-6">
      <Card className="w-full bg-slate-900 pt-6">
        <CardContent className="flex flex-row flex-wrap gap-y-2 items-center justify-center">
          <span className="text-md text-center font-bold">
            The Builder has moved! Build your formations to share here:
          </span>
          <Link href="/builder">
            <Button className="ml-4 bg-atekgold">Take me there!</Button>
          </Link>
        </CardContent>
      </Card>
      <div className="flex flex-row flex-wrap-reverse  w-full gap-y-4">
        <div className="basis-full md:pr-4 md:basis-2/3">
          <div className="flex flex-col gap-y-4">
            <Card className="bg-slate-900 pt-6">
              <CardContent>
                <Guides></Guides>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 pt-6">
              <CardContent>
                <Disclaimer></Disclaimer>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="basis-full md:basis-1/3">
          <div className="flex flex-col gap-y-4">
            <Card className="bg-slate-900 pt-6">
              <CardContent>
                <Shortcuts></Shortcuts>
              </CardContent>
            </Card>
            <Card className="bg-slate-900">
              <CardContent className="p-2 md:p-6">
                <Formations></Formations>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
