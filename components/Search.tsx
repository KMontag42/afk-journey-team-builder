"use client";

import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import FormationCard from "@/components/FormationCard";

import { FormationData } from "@/lib/formations";
import { type CmsData } from "@/lib/cms-types";
import MultiSelect from "./ui/multi-select";
import { Character } from "@/lib/characters";

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
  const [results, setResults] = useState<FormationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const allTags = cmsData.tags;
  const allCharacters = Object.values(cmsData.characters).map((x) => x.name);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const params = new URLSearchParams();
    params.append("q", search);
    if (tags.length > 0) {
      params.append("t", tags.join(","));
    }
    if (characters.length > 0) {
      params.append("c", characters.join(","));
    }
    const response = await fetch(`/api/search?${params.toString()}`);
    const data = await response.json();

    setResults(data.formations);
  };

  // this effect will populate the results with the prePopulated data
  useEffect(() => {
    setResults(prePopulated);

    // cleanup function to ensure we don't get errors when reloading
    return () => {
      setResults([]);
    };
  }, [prePopulated]);

  // when the results are set, we can stop the loading state
  useEffect(() => {
    setLoading(false);
  }, [results]);

  return (
    <div className="flex flex-col items-center md:px-0 md:container mx-auto mt-4">
      <form
        onSubmit={handleSearch}
        className="flex w-full md:w-[40vw] flex-col gap-2 md:px-2"
      >
        <Label
          htmlFor="name"
          className="text-2xl flex flex-row justify-between"
        >
          Search
          <Popover>
            <PopoverTrigger>
              <p className="underline">?</p>
            </PopoverTrigger>
            <PopoverContent>
              <ul className="list-disc list-inside">
                <li>You can search for formations by name.</li>
                <li>You can also search by hero name.</li>
                <li>
                  Search terms are <b>AND</b> combined <pre>arden eironn</pre>{" "}
                  will return formations with both heroes.
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </Label>

        <Input
          id="name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Formation name"
        />
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <MultiSelect
            itemDescription={"tag"}
            items={allTags.map((x) => ({ name: x, value: x }))}
            callback={setTags}
          />
          <MultiSelect
            itemDescription={"characters"}
            items={allCharacters.map((x) => ({ name: x, value: x }))}
            callback={setCharacters}
          />
        </div>
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
