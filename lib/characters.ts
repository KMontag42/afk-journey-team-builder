export const Characters = [
  "Antandra",
  "Arden",
  "Atalanta",
  "Berial",
  "Brutus",
  "Bryon",
  "Carolina",
  "Cassadee",
  "Cecia",
  "Chippy",
  "Damian",
  "Dionel",
  "Eironn",
  "Fay",
  "Florabelle",
  "Granny",
  "Hammie",
  "Hewynn",
  "Igor",
  "Kafra",
  "Kokko",
  "Korin",
  "Kruger",
  "Lucius",
  "Lumont",
  "Lyca",
  "Marilee",
  "Mirael",
  "Niru",
  "Odie",
  "Parisa",
  "Reinier",
  "Rhys",
  "Rowan",
  "Salazer",
  "Satrana",
  "Scarlita",
  "Seth",
  "Shakir",
  "Silvina",
  "Smokey",
  "Temesia",
  "Thoran",
  "Vala",
  "Valen",
  "Viperian",
  "Walker",
]

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export function getCharacterImage(character: string) {
  return `https://raw.githubusercontent.com/inSeas0n/AFK-Analytica/master/journey_icons/heroes/${toTitleCase(character)}.png`
}

