export enum Faction {
  Mauler = "mauler",
  Wilder = "wilder",
  Lightbearer = "lightbearer",
  Graveborn = "graveborn",
  Celestial = "celestial",
  Hypogean = "hypogean",
}

export enum CharacterClass {
  Mage = "mage",
  Warrior = "warrior",
  Marksman = "marksman",
  Rogue = "rogue",
  Tank = "tank",
  Support = "support",
}

export enum EquipmentSlot {
  Arm = "Hands",
  Body = "Body",
  Head = "Head",
  Leg = "Leg",
  Ornament = "Accessory",
  Weapon = "Weapon",
}

export enum AscensionLevel {
  Elite = "Elite",
  EliteP = "Elite+",
  Epic = "Epic",
  EpicP = "Epic+",
  Legendary = "Legendary",
  LegendaryP = "Legendary+",
  Mythic = "Mythic",
  MythicP = "Mythic+",
  Supreme = "Supreme",
  SupremeP = "Supreme+",
  Paragon1 = "Paragon1",
  Paragon2 = "Paragon2",
  Paragon3 = "Paragon3",
  Paragon4 = "Paragon4",
}

export type Character = {
  id: string;
  name: string;
  class: CharacterClass;
  faction: Faction;
  tileUrl: string;
  imageUrl: string;
  charms: Array<string>;
  hide?: boolean;
};

// not a huge fan of this, but it is simple and easy
export const PhraestoId = "33";
export const PhraestoCloneId = "34";
