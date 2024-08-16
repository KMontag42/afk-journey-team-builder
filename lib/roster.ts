export enum Category {
  Starter = "starter",
  Seasonal = "seasonal",
}

export type CharacterClass = {
  name: string;
  imageUrl: string;
};

export type Season = {
  key: string;
  name: string;
};

export type Artifact = {
  key: string;
  imageUrl: string;
  label: string;
  category: Category;
  active: boolean;
  level: number;
};
