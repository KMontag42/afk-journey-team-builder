import {
  AscensionLevel,
  CharacterClass,
  EquipmentSlot,
  Faction,
} from "@/lib/characters";

export enum Category {
  Starter = "starter",
  Seasonal = "seasonal",
}

export type Season = {
  key: string;
  name: string;
  maxLevel: number;
  equipmentMaxLevel: number;
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

export type GearClass = {
  season: string;
  class: CharacterClass;
  equipment: Gear[];
};

export type Gear = {
  key: string;
  imageUrl: string;
  equipmentSlot: EquipmentSlot;
  level: number;
  maxLevel: number;
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
  unlocked: boolean;
};
