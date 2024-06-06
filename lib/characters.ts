export enum Faction {
  Mauler = "Mauler",
  Wilder = "Wilder",
  Lightbearer = "Lightbearer",
  Graveborn = "Graveborn",
  Celestial = "Celestial",
  Hypogean = "Hypogean"
};

export enum CharacterClass {
  Mage = "Mage",
  Warrior = "Warrior",
  Marksman = "Marksman",
  Rogue = "Rogue",
  Tank = "Tank",
  Support = "Support"
};

export type Character = {
  name: string;
  class: CharacterClass;
  faction: Faction;
  hide?: boolean;
}

export const Characters: Character[] = [
  { name: "Alsa", faction: Faction.Mauler, class: CharacterClass.Mage },
  { name: "Antandra", faction: Faction.Mauler, class: CharacterClass.Tank },
  { name: "Arden", faction: Faction.Wilder, class: CharacterClass.Mage },
  { name: "Atalanta", faction: Faction.Lightbearer, class: CharacterClass.Marksman },
  { name: "Berial", faction: Faction.Hypogean, class: CharacterClass.Rogue },
  { name: "Brutus", faction: Faction.Mauler, class: CharacterClass.Warrior },
  { name: "Bryon", faction: Faction.Wilder, class: CharacterClass.Marksman },
  { name: "Carolina", faction: Faction.Graveborn, class: CharacterClass.Mage },
  { name: "Cassadee", faction: Faction.Lightbearer, class: CharacterClass.Mage },
  { name: "Cecia", faction: Faction.Graveborn, class: CharacterClass.Marksman },
  { name: "Chippy", faction: Faction.Lightbearer, class: CharacterClass.Tank },
  { name: "Damian", faction: Faction.Wilder, class: CharacterClass.Support },
  { name: "Dionel", faction: Faction.Celestial, class: CharacterClass.Marksman },
  { name: "Eironn", faction: Faction.Wilder, class: CharacterClass.Rogue },
  { name: "Fay", faction: Faction.Lightbearer, class: CharacterClass.Support },
  { name: "Florabelle", faction: Faction.Wilder, class: CharacterClass.Warrior },
  { name: "Granny", faction: Faction.Wilder, class: CharacterClass.Tank },
  { name: "Hammie", faction: Faction.Lightbearer, class: CharacterClass.Support },
  { name: "Hewynn", faction: Faction.Wilder, class: CharacterClass.Mage },
  { name: "Igor", faction: Faction.Graveborn, class: CharacterClass.Warrior },
  { name: "Kafra", faction: Faction.Wilder, class: CharacterClass.Warrior },
  { name: "Kokko", faction: Faction.Mauler, class: CharacterClass.Support },
  { name: "Korin", faction: Faction.Lightbearer, class: CharacterClass.Warrior },
  { name: "Kruger", faction: Faction.Mauler, class: CharacterClass.Warrior },
  { name: "Lucius", faction: Faction.Lightbearer, class: CharacterClass.Tank },
  { name: "Lumont", faction: Faction.Mauler, class: CharacterClass.Tank },
  { name: "Lyca", faction: Faction.Wilder, class: CharacterClass.Marksman },
  { name: "Marilee", faction: Faction.Lightbearer, class: CharacterClass.Marksman },
  { name: "Mirael", faction: Faction.Lightbearer, class: CharacterClass.Mage },
  { name: "Niru", faction: Faction.Graveborn, class: CharacterClass.Support },
  { name: "Odie", faction: Faction.Mauler, class: CharacterClass.Marksman },
  { name: "Parisa", faction: Faction.Wilder, class: CharacterClass.Mage },
  { name: "Phraesto", faction: Faction.Hypogean, class: CharacterClass.Tank },
  { name: "PhraestoClone", faction: Faction.Hypogean, class: CharacterClass.Tank, hide: true },
  { name: "Reinier", faction: Faction.Hypogean, class: CharacterClass.Support },
  { name: "Rhys", faction: Faction.Mauler, class: CharacterClass.Marksman },
  { name: "Rowan", faction: Faction.Lightbearer, class: CharacterClass.Mage },
  { name: "Salazer", faction: Faction.Graveborn, class: CharacterClass.Rogue },
  { name: "Satrana", faction: Faction.Mauler, class: CharacterClass.Mage },
  { name: "Scarlita", faction: Faction.Celestial, class: CharacterClass.Warrior },
  { name: "Seth", faction: Faction.Mauler, class: CharacterClass.Rogue },
  { name: "Shakir", faction: Faction.Mauler, class: CharacterClass.Rogue },
  { name: "Silvina", faction: Faction.Graveborn, class: CharacterClass.Rogue },
  { name: "Smokey", faction: Faction.Mauler, class: CharacterClass.Support },
  { name: "Soren", faction: Faction.Mauler, class: CharacterClass.Rogue },
  { name: "Temesia", faction: Faction.Lightbearer, class: CharacterClass.Tank },
  { name: "Thoran", faction: Faction.Graveborn, class: CharacterClass.Tank },
  { name: "Vala", faction: Faction.Lightbearer, class: CharacterClass.Rogue },
  { name: "Valen", faction: Faction.Lightbearer, class: CharacterClass.Warrior },
  { name: "Viperian", faction: Faction.Graveborn, class: CharacterClass.Mage },
  { name: "Walker", faction: Faction.Lightbearer, class: CharacterClass.Rogue },
]

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export function getCharacterImage(character: Character) {
  return `https://raw.githubusercontent.com/inSeas0n/AFK-Analytica/master/journey_icons/heroes/${toTitleCase(character.name)}.png`
}
