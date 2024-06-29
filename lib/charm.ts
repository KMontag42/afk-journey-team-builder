export enum CharmPosition {
  Left,
  Mid,
  Right,
}

export interface StatSummary {
  name: string;
  value: string;
  percentage: boolean;
}

export class Charm {
  name: string;
  stats: any;

  constructor(name: string, stats: any) {
    this.name = name;
    this.stats = stats;
  }
}

export function statSummary(charm1?: Charm | null, charm2?: Charm | null, charm3?: Charm | null): StatSummary[] {
  let summary: StatSummary[] = [];

  return summary;
}

function getSuffix(name: string): String {
  return "";
}
