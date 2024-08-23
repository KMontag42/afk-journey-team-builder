import { AscensionLevel, CharacterClass, Faction } from "./characters";

export enum Category {
  Starter = "starter",
  Seasonal = "seasonal",
}

export type EquipmentClass = {
  name: string;
  imageUrl: string;
};

export type Season = {
  key: string;
  name: string;
};

export type Level = {
  key: string;
  seasonName: string;
  maxLevel: number;
  active: boolean;
  level: number;
};

export type Artifact = {
  key: string;
  imageUrl: string;
  label: string;
  category: Category;
  maxLevel: number;
  active: boolean;
  level: number;
};

export type Hero = {
  key: string;
  name: string;
  faction: Faction;
  heroClass: CharacterClass;
  tier: string;
  imageUrl: string;
  ascension: AscensionLevel;
  exEquipment: number;
};
