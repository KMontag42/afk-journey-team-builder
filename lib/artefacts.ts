export type Artefact = {
  value: string;
  label: string;
  category: "permanent" | "seasonal";
  imageUrl: string;
}

export type AllArtefacts = {
  [key: string]: Artefact
}