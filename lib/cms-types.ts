import { Character, StatType } from "@/lib/characters";

type ImgurUrl = `https://i.imgur.com/${string}.png`;

type NameAndImageCmsData = {
  name: string;
  imageUrl: ImgurUrl;
};

export type CharacterCmsData = {
  [id: string]: Character;
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
  name: string;
  description: string;
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

export type Code = {
  code: string;
  rewards: string;
};

export type PromoCodesCmsData = {
  active: Code[];
  directions: string;
  images: string[];
};

type Stat = {
  attribute: StatType;
  value: string;
};

type Relation = {
  targetId: string;
  targetAnchor: string;
  sourceAnchor: string;
};

export type Talent = {
  id: string;
  column: number;
  name: string;
  description: string;
  stats: Stat[];
  goldCost: number;
  orbCost: number;
  essenceCost: number;
  size: number;
  imageUrl: string;
  bgSize: number;
  bgUrl: string;
  unlocked: boolean;
  color: string;
  relations: Relation[];
  requirement: number;
};

export type TalentsCmsData = {
  [faction: string]: {
    imageUrl: string;
    talents: { [id: string]: Talent };
  };
};
