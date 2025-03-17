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
            Check out our affiliate, Lootbar, for all your in-game purchases!
          </span>
          <Button variant="analytica" className="ml-4" asChild>
            <Link href="https://lootbar.gg/top-up/afk-journey?aff_short=Analytica">
              Take me there!
            </Link>
          </Button>
        </CardContent>
      </Card>
      <div className="flex flex-row flex-wrap-reverse  w-full gap-y-4">
        <div className="basis-full md:pr-4 md:basis-2/3">
          <div className="flex flex-col gap-y-4">
            <Card className="bg-slate-900 pt-6">
              <CardContent>
                <Guides />
              </CardContent>
            </Card>
            <Card className="bg-slate-900 pt-6">
              <CardContent>
                <div className="flex justify-between text-center">
                  <Link className="underline" href="https://x.com/Analytica_GG">
                    Twitter
                  </Link>
                  <Link
                    className="underline"
                    href="https://www.reddit.com/r/Analytica/"
                  >
                    Reddit
                  </Link>
                  <Link
                    className="underline"
                    href="https://discord.gg/analytica"
                  >
                    Discord
                  </Link>
                  <Link
                    href="https://lootbar.gg/top-up/afk-journey?aff_short=Analytica"
                    className="underline"
                  >
                    Lootbar
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 pt-6">
              <CardContent>
                <Disclaimer />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="basis-full md:basis-1/3">
          <div className="flex flex-col gap-y-4">
            <Card className="bg-slate-900 pt-6">
              <CardContent>
                <Shortcuts />
              </CardContent>
            </Card>
            <Card className="bg-slate-900">
              <CardContent className="p-2 md:p-6">
                <Formations />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
