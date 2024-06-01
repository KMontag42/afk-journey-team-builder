import { type StaticImageData } from "next/image";
import { artefactImages } from "@/lib/images";

export const ARTEFACTS: {
  [key: string]: {
    image: StaticImageData;
    label: string;
    category: 'permanent' | 'seasonal';
    value: string;
  }
} = {
  lightheal: { value: 'lightheal', image: artefactImages.lightheal, label: 'Lightheal', category: 'seasonal' },
  crescent: { value: 'crescent', image: artefactImages.crescent, label: 'Crescent', category: 'seasonal' },
  quickblade: { value: 'quickblade', image: artefactImages.quickblade, label: 'Quickblade', category: 'seasonal' },
  stormcaller: { value: 'stormcaller', image: artefactImages.stormcaller, label: 'Stormcaller', category: 'seasonal' },
  cascade: { value: 'cascade', image: artefactImages.cascade, label: 'Cascade', category: 'seasonal' },
  evocation: { value: 'evocation', image: artefactImages.evocation, label: 'Evocation', category: 'seasonal' },
  thunderbolt: { value: 'thunderbolt', image: artefactImages.thunderbolt, label: 'Thunderbolt', category: 'seasonal' },
  dashing: { value: 'dashing', image: artefactImages.dashing, label: 'Dashing', category: 'seasonal' },
  awakening: { value: 'awakening', image: artefactImages.awakening, label: 'Awakening', category: 'permanent' },
  blazing: { value: 'blazing', image: artefactImages.blazing, label: 'Blazing', category: 'permanent' },
  confining: { value: 'confining', image: artefactImages.confining, label: 'Confining', category: 'permanent' },
  enlightening: { value: 'enlightening', image: artefactImages.enlightening, label: 'Enlightening', category: 'permanent' },
  ironwall: { value: 'ironwall', image: artefactImages.ironwall, label: 'Ironwall', category: 'permanent' },
  starshard: { value: 'starshard', image: artefactImages.starshard, label: 'Starshard', category: 'permanent' },
  random: { value: 'random', image: artefactImages.random, label: 'Random', category: 'permanent' },
};
