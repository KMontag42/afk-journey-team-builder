export type Artifact = {
  value: string;
  label: string;
  category: "permanent" | "seasonal";
  imageUrl: string;
};

export type AllArtifacts = {
  [key: string]: Artifact;
};
