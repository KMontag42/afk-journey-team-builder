"use server";

import { turso } from "@/lib/turso";
import { auth } from "@clerk/nextjs/server";

import FormationCard from "@/components/FormationCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function MyFormations() {
  auth().protect();

  const { userId } = auth();

  const response = await turso.execute({
    sql: "SELECT * FROM formations WHERE user_id = ?",
    args: [userId],
  });

  const data = response.rows;

  return (
    <div>
      <h1 className="text-4xl text-center">My Formations</h1>
      <Separator className="my-4"/>
      <ScrollArea className="h-[81vh] flex flex-col px-4">
        {data.map((formation) => (
          <FormationCard
            key={formation.id?.toString()}
            data={formation as any}
            className="mb-4"
            hideUser
          />
        ))}
      </ScrollArea>
    </div>
  );
}
