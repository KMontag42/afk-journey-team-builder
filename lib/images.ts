import { type StaticImageData } from "next/image";
import { Faction, CharacterClass } from "@/lib/characters";

import Awakening from "@/public/artifacts/Awakening.png";
import Blazing from "@/public/artifacts/Blazing.png";
import Confining from "@/public/artifacts/Confining.png";
import Enlightening from "@/public/artifacts/Enlightening.png";
import Ironwall from "@/public/artifacts/Ironwall.png";
import Starshard from "@/public/artifacts/Starshard.png";
import Lightheal from "@/public/artifacts/Lightheal.png";
import Crescent from "@/public/artifacts/Crescent.png";
import Quickblade from "@/public/artifacts/Quickblade.png";
import Stormcaller from "@/public/artifacts/Stormcaller.png";
import Cascade from "@/public/artifacts/Cascade.png";
import Evocation from "@/public/artifacts/Evocation.png";
import Thunderbolt from "@/public/artifacts/Thunderbolt.png";
import Dashing from "@/public/artifacts/Dashing.png";
import Random from "@/public/artifacts/Random.png";

import tekLogo from "@/public/tekLogo.png";
import AnalyticaOfficialLogo from "@/public/AnalyticaOfficialLogo.png";
import LogoBlack from "@/public/LogoBlack.png";
import LogoAnimationV2 from "@/public/LogoAnimationV2.gif";

import Tile1 from "@/public/slots/Tile1.png";
import Tile2 from "@/public/slots/Tile2.png";
import Tile3 from "@/public/slots/Tile3.png";
import Tile4 from "@/public/slots/Tile4.png";
import Tile5 from "@/public/slots/Tile5.png";
import Tile6 from "@/public/slots/Tile6.png";
import Tile7 from "@/public/slots/Tile7.png";
import Tile8 from "@/public/slots/Tile8.png";
import Tile9 from "@/public/slots/Tile9.png";
import Tile10 from "@/public/slots/Tile10.png";
import Tile11 from "@/public/slots/Tile11.png";
import Tile12 from "@/public/slots/Tile12.png";
import Tile13 from "@/public/slots/Tile13.png";

import Alsa from "@/public/characters/Alsa.png";
import Antandra from "@/public/characters/Antandra.png";
import Arden from "@/public/characters/Arden.png";
import Atalanta from "@/public/characters/Atalanta.png";
import Berial from "@/public/characters/Berial.png";
import Brutus from "@/public/characters/Brutus.png";
import Bryon from "@/public/characters/Bryon.png";
import Carolina from "@/public/characters/Carolina.png";
import Cassadee from "@/public/characters/Cassadee.png";
import Cecia from "@/public/characters/Cecia.png";
import Chippy from "@/public/characters/Chippy.png";
import Damian from "@/public/characters/Damian.png";
import Dionel from "@/public/characters/Dionel.png";
import Eironn from "@/public/characters/Eironn.png";
import Fay from "@/public/characters/Fay.png";
import Florabelle from "@/public/characters/Florabelle.png";
import Granny from "@/public/characters/Granny.png";
import Hammie from "@/public/characters/Hammie.png";
import Hewynn from "@/public/characters/Hewynn.png";
import Igor from "@/public/characters/Igor.png";
import Kafra from "@/public/characters/Kafra.png";
import Kokko from "@/public/characters/Kokko.png";
import Korin from "@/public/characters/Korin.png";
import Kruger from "@/public/characters/Kruger.png";
import Lucius from "@/public/characters/Lucius.png";
import Lumont from "@/public/characters/Lumont.png";
import Lyca from "@/public/characters/Lyca.png";
import Marilee from "@/public/characters/Marilee.png";
import Mirael from "@/public/characters/Mirael.png";
import Niru from "@/public/characters/Niru.png";
import Odie from "@/public/characters/Odie.png";
import Parisa from "@/public/characters/Parisa.png";
import Phraesto from "@/public/characters/Phraesto.png";
import PhraestoClone from "@/public/characters/PhraestoClone.png";
import Reinier from "@/public/characters/Reinier.png";
import Rhys from "@/public/characters/Rhys.png";
import Rowan from "@/public/characters/Rowan.png";
import Salazer from "@/public/characters/Salazer.png";
import Satrana from "@/public/characters/Satrana.png";
import Scarlita from "@/public/characters/Scarlita.png";
import Seth from "@/public/characters/Seth.png";
import Shakir from "@/public/characters/Shakir.png";
import Silvina from "@/public/characters/Silvina.png";
import Smokey from "@/public/characters/Smokey.png";
import Soren from "@/public/characters/Soren.png";
import Temesia from "@/public/characters/Temesia.png";
import Thoran from "@/public/characters/Thoran.png";
import Vala from "@/public/characters/Vala.png";
import Valen from "@/public/characters/Valen.png";
import Viperian from "@/public/characters/Viperian.png";
import Walker from "@/public/characters/Walker.png";

import CELESTIAL from "@/public/faction_icons/CELESTIAL.png";
import GRAVEBORN from "@/public/faction_icons/GRAVEBORN.png";
import HYPOGEAN from "@/public/faction_icons/HYPOGEAN.png";
import LIGHTBEARER from "@/public/faction_icons/LIGHTBEARER.png";
import MAULER from "@/public/faction_icons/MAULER.png";
import WILDER from "@/public/faction_icons/WILDER.png";

import Mage from "@/public/class_icons/Mage.png";
import Marksman from "@/public/class_icons/Marksman.png";
import Rogue from "@/public/class_icons/Rogue.png";
import Support from "@/public/class_icons/Support.png";
import Tank from "@/public/class_icons/Tank.png";
import Warrior from "@/public/class_icons/Warrior.png";

export const artefactImages: {
  [key: string]: StaticImageData;
} = {
  lightheal: Lightheal,
  crescent: Crescent,
  quickblade: Quickblade,
  stormcaller: Stormcaller,
  cascade: Cascade,
  evocation: Evocation,
  thunderbolt: Thunderbolt,
  dashing: Dashing,
  awakening: Awakening,
  blazing: Blazing,
  confining: Confining,
  enlightening: Enlightening,
  ironwall: Ironwall,
  starshard: Starshard,
  random: Random,
};

export const tekImages: { [key: string]: StaticImageData } = {
  tekLogo: tekLogo,
  logo: AnalyticaOfficialLogo,
  logoBlack: LogoBlack,
  logoAnimated: LogoAnimationV2,
};

export const slotImages: { [key: string]: StaticImageData } = {
  Tile1: Tile1,
  Tile2: Tile2,
  Tile3: Tile3,
  Tile4: Tile4,
  Tile5: Tile5,
  Tile6: Tile6,
  Tile7: Tile7,
  Tile8: Tile8,
  Tile9: Tile9,
  Tile10: Tile10,
  Tile11: Tile11,
  Tile12: Tile12,
  Tile13: Tile13,
};

export const characterImages: { [key: string]: StaticImageData } = {
  alsa: Alsa,
  antandra: Antandra,
  arden: Arden,
  atalanta: Atalanta,
  berial: Berial,
  brutus: Brutus,
  bryon: Bryon,
  carolina: Carolina,
  cassadee: Cassadee,
  cecia: Cecia,
  chippy: Chippy,
  damian: Damian,
  dionel: Dionel,
  eironn: Eironn,
  fay: Fay,
  florabelle: Florabelle,
  granny: Granny,
  hammie: Hammie,
  hewynn: Hewynn,
  igor: Igor,
  kafra: Kafra,
  kokko: Kokko,
  korin: Korin,
  kruger: Kruger,
  lucius: Lucius,
  lumont: Lumont,
  lyca: Lyca,
  marilee: Marilee,
  mirael: Mirael,
  niru: Niru,
  odie: Odie,
  parisa: Parisa,
  phraesto: Phraesto,
  phraestoclone: PhraestoClone,
  reinier: Reinier,
  rhys: Rhys,
  rowan: Rowan,
  salazer: Salazer,
  satrana: Satrana,
  scarlita: Scarlita,
  seth: Seth,
  shakir: Shakir,
  silvina: Silvina,
  smokey: Smokey,
  soren: Soren,
  temesia: Temesia,
  thoran: Thoran,
  vala: Vala,
  valen: Valen,
  viperian: Viperian,
  walker: Walker,
};

export const FactionImages: { [key: string]: StaticImageData } = {
  [Faction.Celestial.toString()]: CELESTIAL,
  [Faction.Graveborn.toString()]: GRAVEBORN,
  [Faction.Hypogean.toString()]: HYPOGEAN,
  [Faction.Lightbearer.toString()]: LIGHTBEARER,
  [Faction.Mauler.toString()]: MAULER,
  [Faction.Wilder.toString()]: WILDER,
};

export const ClassImages: { [key: string]: StaticImageData } = {
  [CharacterClass.Mage.toString()]: Mage,
  [CharacterClass.Marksman.toString()]: Marksman,
  [CharacterClass.Rogue.toString()]: Rogue,
  [CharacterClass.Support.toString()]: Support,
  [CharacterClass.Tank.toString()]: Tank,
  [CharacterClass.Warrior.toString()]: Warrior,
};
