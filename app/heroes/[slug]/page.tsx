"use server";

import { HeroDetailCmsData } from "@/lib/cms-types";
import { getCharacterDetailsCmsData } from "@/lib/server/cms-data";
import Image from "next/image";

export default async function HeroPage({
  params,
}: {
  params: { slug: string };
}) {
  const hero: HeroDetailCmsData = await getCharacterDetailsCmsData(params.slug);

  return (
    <div className="container">
      {hero && (
        <div className="flex flex-col items-center gap-y-4">
          <div className="flex flex-row justify-center flex-wrap gap-4">
            <img
              src={"https://imgur.com/smGUD52.gif"}
              alt={hero.name}
              className=""
              width={"256"}
            />
            <div className="flex flex-col justify-center w-64 gap-y-4 border border-atekgold rounded-md bg-slate-900 p-4 text-xl">
              <div className="text-3xl text-atekgold font-bold">
                {hero.name}
              </div>
              <div>
                <b>Tier: </b>
                {hero.tier}
              </div>
              <div>
                <b>Faction: </b>
                {hero.faction}
              </div>
              <div>
                <b>Class: </b>
                {hero.class}
              </div>
              <div>
                <b>Auto-Attack Range: </b>
                {hero.autoRange}
              </div>
              <div>
                <b>Initial Energy: </b>
                {hero.initialEnergy}
              </div>
            </div>
            <div className="flex flex-col justify-center w-64 gap-y-4 border border-atekgold rounded-md bg-slate-900 p-4">
              <div className="text-atekgold font-bold">Pros</div>
              <ul className="text-green-500 list-disc px-4 text-sm">
                <li>
                  Unique ability to create walls that can disrupt the enemy
                  team.
                </li>
                <li>Can CC-lock a target.</li>
                <li>
                  Can deal high bursts of damage and secure a speedy victory if
                  in a team with lots of CC.
                </li>
              </ul>
              <div className="text-atekgold font-bold">Cons</div>
              <ul className="text-red-500 list-disc px-4 text-sm">
                <li>
                  Can function at low investment, but requires high investment
                  to really shine.
                </li>
                <li>Relies too much on being lucky or manual input.</li>
                <li>
                  Half of her kit doesn't work on bosses, hurting both her
                  utility and damage potential.
                </li>
              </ul>
            </div>
          </div>
          <div>Ultimate: {hero.ultimate.name}</div>
          <div>Skill I: {hero.skill1.name}</div>
          <div>Skill II: {hero.skill2.name}</div>
          <div>Hero Focus: {hero.heroFocus.name}</div>
          <div>Ex Equipment: {hero.equipmentSkill.name}</div>
          <div>Enhance Force: {hero.enhanceForce.name}</div>
          <div>Seasonal: {hero.songOfStrifeSeasonSkill.name}</div>
        </div>
      )}
    </div>
  );
}
