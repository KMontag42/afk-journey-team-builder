import { CharacterClass, Faction } from "@/lib/characters";

type ImgurUrl = `https://i.imgur.com/${string}.png`;

type NameAndImageCmsData = {
  name: string;
  imageUrl: ImgurUrl;
};

export type CharacterCmsData = {
  [id: string]: NameAndImageCmsData & {
    id: string;
    faction: string;
    class: string;
    charms: string[];
    tileUrl: ImgurUrl;
  };
};

export type ClassesCmsData = {
  [id: string]: NameAndImageCmsData;
};
export type FactionsCmsData = {
  [id: string]: NameAndImageCmsData;
};

export type ArtifactsCmsData = {
  [id: string]: {
    value: string;
    label: string;
    category: string;
    imageUrl: ImgurUrl;
  };
};

export type MapsCmsData = {
  [id: string]: {
    name: string;
    layout: number[][];
  };
};

export type CmsData = {
  characters: CharacterCmsData;
  classes: ClassesCmsData;
  factions: FactionsCmsData;
  artifacts: ArtifactsCmsData;
  maps: MapsCmsData;
};

type TitleAndContentCmsData = {
  title: string;
  content: string;
};

export type GuideSectionCmsData = {
  [slug: string]: TitleAndContentCmsData;
};

export type GuidePagesCmsData = {
  [section: string]: GuideSectionCmsData;
};

export type GuideBannerCmsData = {
  key: string;
  guideLink: string;
  imageLink: ImgurUrl;
};

export type GuideContributorCmsData = {
  name: string;
  imageLink: ImgurUrl;
};

export type GuideHomePageCmsData = {
  banners: GuideBannerCmsData[];
  contributors: GuideContributorCmsData[];
};

export type GuideCmsData = {
  home: GuideHomePageCmsData;
  guides: GuidePagesCmsData;
};

export type PromoCodesCmsData = {
  active: string[];
  expired: string[];
  directions: string;
  images: string[];
};

export type HeroSkillDetailCmsData = {
  name: string;
  unlock: string;
  cooldown: string;
  range: string;
  description: string;
  upgrades: string[];
};

export type HeroDetailCmsData = {
  id: string;
  name: string;
  tier: string;
  imageUrl: string;
  faction: Faction;
  class: CharacterClass;
  autoRange: string;
  initialEnergy: number;
  ultimate: HeroSkillDetailCmsData;
  skill1: HeroSkillDetailCmsData;
  skill2: HeroSkillDetailCmsData;
  heroFocus: HeroSkillDetailCmsData;
  equipmentSkill: HeroSkillDetailCmsData;
  enhanceForce: HeroSkillDetailCmsData;
  songOfStrifeSeasonSkill: HeroSkillDetailCmsData;
};
