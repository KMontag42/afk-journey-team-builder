import { FormationSelect, VoteSelect } from "@/drizzle/schema";
import {
  type Character,
  PhraestoCloneId,
  PhraestoId,
  ElijahAndLailiahId,
  ElijahId,
} from "@/lib/characters";
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
  const formationHasEL = formation.includes(ElijahAndLailiahId);
  const maxCharacters = formationHasPhraesto || formationHasEL ? 6 : 5;

  if (characterInSlot === character.id) {
    // remove character from slot
    formationCopy[slot] = "";

    if (character.name === "Phraesto" || character.name === "PhraestoClone") {
      // remove Phraesto from formation
      formationCopy[formationCopy.indexOf(PhraestoId)] = "";
      formationCopy[formationCopy.indexOf(PhraestoCloneId)] = "";
    }
    if (character.name === "Elijah & Lailiah" || character.name === "Elijah") {
      // remove Elijah & Lailiah from formation
      formationCopy[formationCopy.indexOf(ElijahAndLailiahId)] = "";
      formationCopy[formationCopy.indexOf(ElijahId)] = "";
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

    if (
      characterInSlot === ElijahAndLailiahId ||
      characterInSlot === ElijahId
    ) {
      // remove Elijah & Lailiah from formation
      formationCopy[formationCopy.indexOf(ElijahAndLailiahId)] = "";
      formationCopy[formationCopy.indexOf(ElijahId)] = "";
    }

    if (character.name === "Phraesto") {
      // add phraesto clone to first open slot
      const firstOpenSlot = formationCopy.indexOf("");
      formationCopy[firstOpenSlot] = PhraestoCloneId;
    }

    if (character.name === "Elijah & Lailiah") {
      // add Elijah to first open slot
      const firstOpenSlot = formationCopy.indexOf("");
      formationCopy[firstOpenSlot] = ElijahId;
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

    if (character.name === "Elijah & Lailiah") {
      // add elija to first open slot
      const firstOpenSlot = formationCopy.indexOf("");
      formationCopy[firstOpenSlot] = ElijahId;
    }

    if (characterInSlot === PhraestoId || characterInSlot === PhraestoCloneId) {
      // remove phraesto or clone from formation
      formationCopy[formationCopy.indexOf(PhraestoId)] = "";
      formationCopy[formationCopy.indexOf(PhraestoCloneId)] = "";
    }

    if (
      characterInSlot === ElijahAndLailiahId ||
      characterInSlot === ElijahId
    ) {
      // remove Elijah & Lailiah from formation
      formationCopy[formationCopy.indexOf(ElijahAndLailiahId)] = "";
      formationCopy[formationCopy.indexOf(ElijahId)] = "";
    }
  }
  return formationCopy;
}

export function userLikedFormation(
  formation: FormationData,
  userId: string,
): boolean {
  return Boolean(formation.votes?.find((vote) => vote.userId === userId));
}
