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

export type Code = {
  code: string;
  rewards: string;
};

export type PromoCodesCmsData = {
  active: Code[];
  directions: string;
  images: string[];
};
