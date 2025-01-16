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
export const ElijahAndLailiahId = "75";
export const ElijahId = "76";
