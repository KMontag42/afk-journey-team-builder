import StatTypes from "../public/data/stat-types.json";

export enum CharmPosition {
  Left,
  Mid,
  Right,
}

export interface StatSummary {
  name: string;
  value: string;
}

export class Charm {
  name: string;
  stats: any;

  constructor(name: string, stats: any) {
    this.name = name;
    this.stats = stats;
  }
}

/** Get the combined stat summary for all stats
 *
 * @param charm1 | Optional
 * @param charm2 | Optional
 * @param charm3 | Optional
 * @returns StatSummary | StatSummary[]
 */
export function GetStatSummary(charm1?: Charm | null, charm2?: Charm | null, charm3?: Charm | null): StatSummary[] {
  let summary: StatSummary[] = [];
  let stats: any = {};

  if (charm1 && charm1 !== null) {
    stats = GetStatsForCharm(charm1, stats);
  }
  if (charm2 && charm2 !== null) {
    stats = GetStatsForCharm(charm2, stats);
  }
  if (charm3 && charm3 !== null) {
    stats = GetStatsForCharm(charm3, stats);
  }

  for (let stat in stats) {
    summary.push({
      name: stat,
      value: (Math.round(stats[stat] * 100) / 100).toString() + getSuffix(stat)
    });
  }

  return summary;
}

/** Get the stats for a charm and return the given stat dictionary with the newly added stats
 *
 * @param charm | Charm
 * @param stats | any
 * @returns Dictionary of key/value pairs for each stat
 */
export function GetStatsForCharm(charm: Charm, stats: any): any {
  for (let stat in charm.stats) {
    if (stats[stat] === undefined) {
      stats[stat] = charm.stats[stat];
    } else {
      stats[stat] += charm.stats[stat];
    }
  }

  return stats;
}

/** Get the suffix for stat attribute type
 *
 * @param attribute
 * @returns suffix | String
 */
function getSuffix(attribute: String): String {
  let suffix = "";

  switch (StatTypes.StatTypes.find((stat) => stat.Stat === attribute)?.Format) {
    case "Number":
      suffix = "";
      break;
    case "Percentage":
      suffix = "%";
  }

  return suffix;
}
