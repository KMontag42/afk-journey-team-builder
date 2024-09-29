import {
  AscensionLevel,
  CharacterClass,
  EquipmentSlot,
  Faction,
} from "@/lib/characters";
import { heroImages, rosterImages } from "@/lib/images";

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

export const HeroBackgrounds = {
  [AscensionLevel.Elite]: rosterImages.eliteBackground,
  [AscensionLevel.EliteP]: rosterImages.elitePBackground,
  [AscensionLevel.Epic]: rosterImages.epicBackground,
  [AscensionLevel.EpicP]: rosterImages.epicPBackground,
  [AscensionLevel.Legendary]: rosterImages.legendaryBackground,
  [AscensionLevel.LegendaryP]: rosterImages.legendaryPBackground,
  [AscensionLevel.Mythic]: rosterImages.mythicBackground,
  [AscensionLevel.MythicP]: rosterImages.mythicPBackground,
  [AscensionLevel.Supreme]: rosterImages.supremeBackground,
  [AscensionLevel.SupremeP]: rosterImages.supremePBackground,
  [AscensionLevel.Paragon1]: rosterImages.paragon1Background,
  [AscensionLevel.Paragon2]: rosterImages.paragon2Background,
  [AscensionLevel.Paragon3]: rosterImages.paragon3Background,
  [AscensionLevel.Paragon4]: rosterImages.paragon4Background,
};

export const FactionIcons = {
  [Faction.Lightbearer]: heroImages.Lightbearer,
  [Faction.Mauler]: heroImages.Mauler,
  [Faction.Wilder]: heroImages.Wilder,
  [Faction.Graveborn]: heroImages.Graveborn,
  [Faction.Celestial]: heroImages.Celestial,
  [Faction.Hypogean]: heroImages.Hypogean,
};

export const CharacterClasses = {
  [CharacterClass.Mage]: heroImages.Mage,
  [CharacterClass.Marksman]: heroImages.Marksman,
  [CharacterClass.Rogue]: heroImages.Rogue,
  [CharacterClass.Support]: heroImages.Support,
  [CharacterClass.Tank]: heroImages.Tank,
  [CharacterClass.Warrior]: heroImages.Warrior,
};
