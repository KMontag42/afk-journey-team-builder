export type Character = {
  name: string;
  class: "Mage" | "Warrior" | "Marksman" | "Rogue" | "Tank" | "Support";
  faction: "Mauler" | "Wilder" | "Lightbearer" | "Graveborn" | "Celestial" | "Hypogean";
}

export const Characters: Character[] = [
  { name: "Alsa", faction: "Mauler", class: "Mage" },
  { name: "Antandra", faction: "Mauler", class: "Tank" },
  { name: "Arden", faction: "Wilder", class: "Mage" },
  { name: "Atalanta", faction: "Lightbearer", class: "Marksman" },
  { name: "Berial", faction: "Hypogean", class: "Rogue" },
  { name: "Brutus", faction: "Mauler", class: "Tank" },
  { name: "Bryon", faction: "Wilder", class: "Marksman" },
  { name: "Carolina", faction: "Graveborn", class: "Mage" },
  { name: "Cassadee", faction: "Lightbearer", class: "Mage" },
  { name: "Cecia", faction: "Graveborn", class: "Marksman" },
  { name: "Chippy", faction: "Lightbearer", class: "Mage" },
  { name: "Damian", faction: "Wilder", class: "Support" },
  { name: "Dionel", faction: "Celestial", class: "Marksman" },
  { name: "Eironn", faction: "Wilder", class: "Rogue" },
  { name: "Fay", faction: "Lightbearer", class: "Support" },
  { name: "Florabelle", faction: "Wilder", class: "Warrior" },
  { name: "Granny", faction: "Wilder", class: "Tank" },
  { name: "Hammie", faction: "Lightbearer", class: "Mage" },
  { name: "Hewynn", faction: "Wilder", class: "Mage" },
  { name: "Igor", faction: "Graveborn", class: "Warrior" },
  { name: "Kafra", faction: "Wilder", class: "Warrior" },
  { name: "Kokko", faction: "Mauler", class: "Support" },
  { name: "Korin", faction: "Lightbearer", class: "Warrior" },
  { name: "Kruger", faction: "Mauler", class: "Warrior" },
  { name: "Lucius", faction: "Lightbearer", class: "Tank" },
  { name: "Lumont", faction: "Mauler", class: "Tank" },
  { name: "Lyca", faction: "Wilder", class: "Marksman" },
  { name: "Marilee", faction: "Lightbearer", class: "Marksman" },
  { name: "Mirael", faction: "Lightbearer", class: "Mage" },
  { name: "Niru", faction: "Graveborn", class: "Support" },
  { name: "Odie", faction: "Mauler", class: "Marksman" },
  { name: "Parisa", faction: "Wilder", class: "Mage" },
  { name: "Reinier", faction: "Hypogean", class: "Support" },
  { name: "Rhys", faction: "Mauler", class: "Marksman" },
  { name: "Rowan", faction: "Lightbearer", class: "Mage" },
  { name: "Salazer", faction: "Graveborn", class: "Rogue" },
  { name: "Satrana", faction: "Mauler", class: "Mage" },
  { name: "Scarlita", faction: "Celestial", class: "Warrior" },
  { name: "Seth", faction: "Mauler", class: "Rogue" },
  { name: "Shakir", faction: "Mauler", class: "Rogue" },
  { name: "Silvina", faction: "Graveborn", class: "Rogue" },
  { name: "Smokey", faction: "Mauler", class: "Support" },
  { name: "Soren", faction: "Mauler", class: "Mage" },
  { name: "Temesia", faction: "Lightbearer", class: "Tank" },
  { name: "Thoran", faction: "Graveborn", class: "Tank" },
  { name: "Vala", faction: "Lightbearer", class: "Rogue" },
  { name: "Valen", faction: "Lightbearer", class: "Warrior" },
  { name: "Viperian", faction: "Graveborn", class: "Mage" },
  { name: "Walker", faction: "Lightbearer", class: "Rogue" },
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
