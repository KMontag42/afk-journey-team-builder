import { type StaticImageData } from "next/image";

import tekLogo from "@/public/tekLogo.png";
import AnalyticaOfficialLogo from "@/public/AnalyticaOfficialLogoV4.png";
import LogoBlack from "@/public/LogoBlack.png";
import LogoAnimationV2 from "@/public/LogoAnimationV2.gif";
import DiscordLogo from "@/public/DiscordLogoV2.png";

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

export const tekImages: { [key: string]: StaticImageData } = {
  tekLogo: tekLogo,
  logo: AnalyticaOfficialLogo,
  logoBlack: LogoBlack,
  logoAnimated: LogoAnimationV2,
  discordLogo: DiscordLogo,
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

export const slotImageUrls: { [key: string]: string } = {
  "-2": "https://i.imgur.com/rtCsXKE.png", // analytica logo TODO: make this fit better
  "-1": "https://i.imgur.com/1DT22Tf.png", // empty space
  "1": "https://i.imgur.com/pmqYEpY.png",
  "2": "https://i.imgur.com/R7gVJay.png",
  "3": "https://i.imgur.com/rJ6sSsG.png",
  "4": "https://i.imgur.com/g7CQtue.png",
  "5": "https://i.imgur.com/eFgZEcS.png",
  "6": "https://i.imgur.com/xBxzujC.png",
  "7": "https://i.imgur.com/VDbSPjj.png",
  "8": "https://i.imgur.com/yYl9IYM.png",
  "9": "https://i.imgur.com/HCx7wBP.png",
  "10": "https://i.imgur.com/PbNdTaZ.png",
  "11": "https://i.imgur.com/w8JcnqF.png",
  "12": "https://i.imgur.com/pGwjJPi.png",
  "13": "https://i.imgur.com/efOfpQU.png",
};
