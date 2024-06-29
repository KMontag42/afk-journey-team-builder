"use server";
import CharmCalculator from "@/components/CharmCalculator";

export default async function Charms() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-8">
      <h1>Charm Calculator</h1>
      <CharmCalculator />
    </main>
  );
}
