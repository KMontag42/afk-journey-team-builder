"use server";

import Builder from "@/components/Builder";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCmsData } from "@/lib/server/cms-data";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams.refreshData === "1") {
    revalidatePath("/");
    redirect("/");
  }
  const jsonData = await getCmsData();

  return (
    <div className="flex flex-col items-center w-[min(100%,680px)]">
      <Popover>
        <PopoverTrigger>
          <p className="text-xl underline absolute top-20 end-6 sm:end-48 md:end-1/4">
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

      <Builder data={jsonData} />
    </div>
  );
}
