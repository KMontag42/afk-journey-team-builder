"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormationCard from "@/components/FormationCard";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

import { FormationData } from "@/lib/formations";
import { type CmsData } from "@/lib/cms-types";

type Props = {
  cmsData: CmsData;
  prePopulated: FormationData[];
  currentUserId?: string | null;
};
export default function Search({
  cmsData,
  prePopulated,
  currentUserId,
}: Props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(prePopulated);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(`/api/search?q=${search}`);
    const data = await response.json();

    setLoading(false);
    setResults(data.formations);
  };

  return (
    <div className="flex flex-col items-center md:px-0 md:container mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex md:w-[40vw] flex-col gap-2 px-2"
      >
        <Label htmlFor="name" className="text-2xl">
          Search
        </Label>
        <Input
          id="name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Formation name"
        />
        <Button type="submit">Search</Button>
      </form>

      <Separator className="my-4" />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 my-4 md:px-4">
          {results.map((result: FormationData) => (
            <FormationCard
              key={result.id.toString()!}
              data={result}
              cmsData={cmsData}
              isLink
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
