"use server";

import Builder from "@/components/Builder";
import Link from "next/link";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { tekImages } from "@/lib/images";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams.refreshData === "1") {
    revalidatePath("/");
    redirect("/");
  }
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.NEXT_PUBLIC_SIMPLEJSONCMS_ID}`,
    )
  ).json();

  return (
    <main className="flex min-h-screen flex-col items-center pt-8">
      <Popover>
        <PopoverTrigger>
          <p className="text-xl underline absolute top-4 end-6 sm:end-48 md:end-1/4">
            ?
          </p>
        </PopoverTrigger>
        <PopoverContent>
          <ul className="p-4 list-disc">
            <li>
              Click on a character to select it, then click on a slot to place
              it.
            </li>
            <li>
              Click on a character in a slot to select it, then click on a
              different slot to swap them.
            </li>
            <li>
              Click on a character in a slot to select it, then click on the
              character to remove it.
            </li>
            <li>Click on the spell icon to change the formation spell.</li>
          </ul>
        </PopoverContent>
      </Popover>

      <Link
        href="https://afkanalytica.com"
        target="_blank"
        className="text-2xl absolute top-4 left-4 sm:left-48 md:left-1/4"
      >
        <Image
          src={tekImages["logoAnimated"]}
          alt="AFK Analytica"
          className="w-8"
        />
      </Link>

      <div className="flex flex-col items-center">
        <Image
          src={tekImages["tekLogo"]}
          alt="Tekken Emblem"
          className="w-56"
        />
      </div>

      <Builder data={jsonData} />

      <p className="mt-1 text-xs">
        Made with &hearts; by{" "}
        <Link
          className="underline"
          href={"https://discordapp.com/users/89367326989770752"}
        >
          0xKRM
        </Link>
      </p>
    </main>
  );
}
