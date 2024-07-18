"use server";

import "@/app/guides/[section]/[slug]/guides.css";

import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { getGuideHomePage } from "@/lib/server/cms-data";
import { Newspaper } from "lucide-react";

export default async function GuidesPage() {
  const guideBanners = await getGuideHomePage();

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-60 lg:max-w-lg"
      >
        <CarouselContent>
          {guideBanners.map((banner: any) => (
            <CarouselItem key={banner.key}>
              <div className="p-1">
                <Card className="border-0">
                  <CardContent className="p-0 flex items-center justify-center">
                    <Link href={banner.guideLink}>
                      <Image
                        width={1920}
                        height={1080}
                        src={banner.imageLink}
                        alt={banner.guideLink}
                      />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="max-w-48 pt-4 lg:max-w-xl"
      >
        <CarouselContent>
          <CarouselItem className="" key={"inSeas0n"}>
            <div className="">
              <Link href="/guides/beginner/beginners-guide">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <Newspaper />
                    <div className="label creator pt-4">
                      Beginner&apos;s Guide
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="label pt-4">Creators</div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="max-w-48 lg:max-w-xl"
      >
        <CarouselContent>
          <CarouselItem className="" key={"inSeas0n"}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Image
                    width={124}
                    height={124}
                    src={"https://i.imgur.com/LZOzlA0.png"}
                    alt={"inSeas0n"}
                  />
                  <div className="label creator pt-4">inSeas0n</div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
