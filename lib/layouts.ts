import BaseLayout from "@/components/layouts/base";
import Arena1Layout from "@/components/layouts/Arena1";
import Arena2Layout from "@/components/layouts/Arena2";
import Arena3Layout from "@/components/layouts/Arena3";
import Arena4Layout from "@/components/layouts/Arena4";

export const layouts: {
  [key: number]: { Component: React.ElementType; numTiles: number };
} = {
  0: { Component: BaseLayout, numTiles: 13 },
  1: { Component: Arena1Layout, numTiles: 10 },
  2: { Component: Arena2Layout, numTiles: 10 },
  3: { Component: Arena3Layout, numTiles: 9 },
  4: { Component: Arena4Layout, numTiles: 11 },
};

export const layoutHeights: { [key: number]: number } = {
  0: 24,
  1: 24,
  2: 32,
  3: 32,
  4: 32,
};

export const layoutExportWidths: { [key: number]: number } = {
  0: 360,
  1: 360,
  2: 300,
  3: 360,
  4: 460,
};

export const layoutExportMargins: { [key: number]: string } = {
  0: "-1rem",
  1: "-1rem",
  2: "1rem",
  3: "-1rem",
  4: "0",
};
