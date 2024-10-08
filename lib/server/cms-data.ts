import "server-only";

import type {
  CmsData,
  GuideCmsData,
  PromoCodesCmsData,
  GuideHomePageCmsData,
  GuidePagesCmsData,
} from "@/lib/cms-types";
import { type Character } from "@/lib/characters";

export async function getCmsData(): Promise<CmsData> {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.CHARACTERS_SIMPLEJSONCMS_ID}`,
    )
  ).json();
  return jsonData;
}

export async function heroNameToId(): Promise<Record<string, string>> {
  const jsonData = await getCmsData();
  const characters = jsonData["characters"];
  return Object.fromEntries(
    Object.entries(characters).map(([key, data]: [string, Character]) => [
      data["name"].toLowerCase(),
      key,
    ]),
  );
}

async function getGuideCmsData(): Promise<GuideCmsData> {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.GUIDES_SIMPLEJSONCMS_ID}`,
      { next: { revalidate: 600 } },
    )
  ).json();
  return jsonData;
}

export async function getCodesCmsData(): Promise<PromoCodesCmsData> {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.CODES_SIMPLEJSONCMS_ID}`,
      { next: { revalidate: 600 } },
    )
  ).json();
  return jsonData;
}

export async function getGuideHomePage(): Promise<GuideHomePageCmsData> {
  const jsonData = await getGuideCmsData();
  const banners = Object.entries(jsonData["home"]["banners"]).map(
    ([key, data]: [string, any]) => ({
      key: key,
      ...data,
    }),
  );
  const contributors = Object.entries(jsonData["home"]["contributors"]).map(
    ([key, data]: [string, any]) => ({
      key: key,
      name: data["name"],
      imageLink: data["imageLink"],
    }),
  );

  return { banners: banners, contributors: contributors };
}

export async function getGuidePages(): Promise<GuidePagesCmsData> {
  const jsonData = await getGuideCmsData();
  return jsonData["guides"];
}

export async function getGuideContent(
  section: string,
  name: string,
): Promise<string> {
  const jsonData = await getGuideCmsData();
  return jsonData["guides"][section][name]?.content;
}
