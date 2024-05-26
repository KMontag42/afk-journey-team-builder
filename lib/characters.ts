export type Character = {
  name: string;
  class?: string;
  faction?: string;
}

export const Characters: Character[] = [
  { name: "Alsa" },
  { name: "Antandra" },
  { name: "Arden" },
  { name: "Atalanta" },
  { name: "Berial" },
  { name: "Brutus" },
  { name: "Bryon" },
  { name: "Carolina" },
  { name: "Cassadee" },
  { name: "Cecia" },
  { name: "Chippy" },
  { name: "Damian" },
  { name: "Dionel" },
  { name: "Eironn" },
  { name: "Fay" },
  { name: "Florabelle" },
  { name: "Granny" },
  { name: "Hammie" },
  { name: "Hewynn" },
  { name: "Igor" },
  { name: "Kafra" },
  { name: "Kokko" },
  { name: "Korin" },
  { name: "Kruger" },
  { name: "Lucius" },
  { name: "Lumont" },
  { name: "Lyca" },
  { name: "Marilee" },
  { name: "Mirael" },
  { name: "Niru" },
  { name: "Odie" },
  { name: "Parisa" },
  { name: "Reinier" },
  { name: "Rhys" },
  { name: "Rowan" },
  { name: "Salazer" },
  { name: "Satrana" },
  { name: "Scarlita" },
  { name: "Seth" },
  { name: "Shakir" },
  { name: "Silvina" },
  { name: "Smokey" },
  { name: "Soren" },
  { name: "Temesia" },
  { name: "Thoran" },
  { name: "Vala" },
  { name: "Valen" },
  { name: "Viperian" },
  { name: "Walker" },
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
