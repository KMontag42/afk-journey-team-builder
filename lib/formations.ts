import { type Character } from "@/lib/characters";

export function updateSlotInFormation(
  formation: string[],
  slot: number,
  character: Character,
): string[] {
  const characterInSlot = formation[slot];
  const characterIndex = formation.indexOf(character.name);
  const formationCharacters = formation.filter((character) => character !== "");
  const formationCopy = [...formation];
  const formationHasPhraesto = formation.includes("Phraesto");
  const maxCharacters = formationHasPhraesto ? 6 : 5;

  if (characterInSlot === character.name) {
    // remove character from slot
    formationCopy[slot] = "";

    if (character.name === "Phraesto" || character.name === "PhraestoClone") {
      // remove Phraesto from formation
      formationCopy[formationCopy.indexOf("Phraesto")] = "";
      formationCopy[formationCopy.indexOf("PhraestoClone")] = "";
    }
  } else if (characterIndex !== -1) {
    // swap characters
    formationCopy[slot] = character.name;
    formationCopy[characterIndex] = characterInSlot;
  } else if (formationCharacters.length < maxCharacters) {
    formationCopy[slot] = character.name;

    if (character.name === "Phraesto") {
      // add phraesto clone to first open slot
      const firstOpenSlot = formationCopy.indexOf("");
      formationCopy[firstOpenSlot] = "PhraestoClone";
    }
  } else if (
    formationCharacters.length === maxCharacters &&
    characterInSlot !== ""
  ) {
    formationCopy[slot] = character.name;
  }
  return formationCopy;
}
