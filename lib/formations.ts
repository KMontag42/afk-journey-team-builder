import { FormationSelect, VoteSelect } from "@/drizzle/schema";
import { type Character, PhraestoCloneId, PhraestoId } from "@/lib/characters";
import { ClerkUser } from "@/lib/server/users";

export type FormationData = FormationSelect &
  ClerkUser & { votes?: VoteSelect[]; voteCount?: number };

export function updateSlotInFormation(
  formation: string[],
  slot: number,
  character: Character,
): string[] {
  const characterInSlot = formation[slot];
  const characterIndex = formation.indexOf(character.id);
  const formationCharacters = formation.filter((character) => character !== "");
  const formationCopy = [...formation];
  const formationHasPhraesto = formation.includes(PhraestoId);
  const maxCharacters = formationHasPhraesto ? 6 : 5;

  if (characterInSlot === character.id) {
    // remove character from slot
    formationCopy[slot] = "";

    if (character.name === "Phraesto" || character.name === "PhraestoClone") {
      // remove Phraesto from formation
      formationCopy[formationCopy.indexOf(PhraestoId)] = "";
      formationCopy[formationCopy.indexOf(PhraestoCloneId)] = "";
    }
  } else if (characterIndex !== -1) {
    // swap characters
    formationCopy[slot] = character.id;
    formationCopy[characterIndex] = characterInSlot;
  } else if (formationCharacters.length < maxCharacters) {
    formationCopy[slot] = character.id;

    if (characterInSlot === PhraestoId || characterInSlot === PhraestoCloneId) {
      // remove phraesto or clone from formation
      formationCopy[formationCopy.indexOf(PhraestoId)] = "";
      formationCopy[formationCopy.indexOf(PhraestoCloneId)] = "";
    }

    if (character.name === "Phraesto") {
      // add phraesto clone to first open slot
      const firstOpenSlot = formationCopy.indexOf("");
      formationCopy[firstOpenSlot] = PhraestoCloneId;
    }
  } else if (
    formationCharacters.length === maxCharacters &&
    characterInSlot !== ""
  ) {
    formationCopy[slot] = character.id;
    if (character.name === "Phraesto") {
      // add phraesto clone to first open slot
      const firstOpenSlot = formationCopy.indexOf("");
      formationCopy[firstOpenSlot] = PhraestoCloneId;
    }

    if (characterInSlot === PhraestoId || characterInSlot === PhraestoCloneId) {
      // remove phraesto or clone from formation
      formationCopy[formationCopy.indexOf(PhraestoId)] = "";
      formationCopy[formationCopy.indexOf(PhraestoCloneId)] = "";
    }
  }
  return formationCopy;
}
