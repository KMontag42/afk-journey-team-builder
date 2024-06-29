"use client";

import { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import Heroes from "../public/data/heroes.json";

import { Charm, CharmPosition, StatSummary, GetStatSummary } from "@/lib/charm";

export default function CharmCalculator() {
  const availableClasses = Heroes.Classes.map((classType) => classType.Class);
  const [selectedClass, setSelectedClass] = useState<String>(availableClasses[0]);

  const [availableHeroes, setAvailableHeroes] = useState<any[] | null>(null);
  const [selectedHero, setSelectedHero] = useState<String>(Heroes.Classes[0].Heroes[0].Name);

  const [availableCharms, setAvailableCharms] = useState<Charm[] | null>(null);
  const [selectedLeftCharm, setSelectedLeftCharm] = useState<Charm | null>(null);
  const [selectedMidCharm, setSelectedMidCharm] = useState<Charm | null>(null);
  const [selectedRightCharm, setSelectedRightCharm] = useState<Charm | null>(null);

  const [statsSummary, setStatsSummary] = useState<StatSummary[]>([]);

  /** Sets the current class and clears the currently selected hero and available charms
   *  Sets available heroes based on selected class
   *
   * @param chosenClass | String
   */
  function setClass(chosenClass: String): void {
    // set class, then set available heroes based on that class
    setSelectedClass(chosenClass);

    Heroes.Classes.find((classType) => {
      if (classType.Class === chosenClass) {
        setAvailableHeroes(classType.Heroes.map((hero) => hero.Name));
      }
    });
  }

  /** Sets the current hero and clears the selected charms
   *  Sets the available charms based on selected hero
   *
   * @param heroName | String
   */
  function setHero(heroName: String): void {
    // set hero, then get list of available charms based on that hero
    setSelectedHero(heroName);
    setSelectedLeftCharm(null);
    setSelectedMidCharm(null);
    setSelectedRightCharm(null);

    Heroes.Classes.find((classType) => {
      if (classType.Class === selectedClass) {
        classType.Heroes.find((hero) => {
          if (hero.Name === heroName) {
            let charms: Charm[] = [];
            hero.Charms.forEach((charm) => {
              charms.push(new Charm(charm.Name, charm.Stats));
            });
            setAvailableCharms(charms);
          }
        });
      }
    });
  }

  /** Sets the charm that you selected for the given position
   *  Any time a charm is changed, recalculate the summary
   *
   * @param charmName | String
   * @param position | CharmPosition (enum) | Left/Mid/Right
   */
  function setCharm(charmName: string, position: CharmPosition): void {
    console.log(charmName);

    // Get charm and set that selectedCharm to the current charm.
    availableCharms?.find((charm) => {
      if (charm.name === charmName) {
        switch (position) {
          case CharmPosition.Left:
            setSelectedLeftCharm(charm);
            break;
          case CharmPosition.Mid:
            setSelectedMidCharm(charm);
            break;
          case CharmPosition.Right:
            setSelectedRightCharm(charm);
            break;
          default:
            break;
        }
      }
    });

    // Reacalculate stat summary each time a charm changes
    setStatsSummary(GetStatSummary(selectedLeftCharm, selectedMidCharm, selectedRightCharm));
    console.log(selectedLeftCharm);
  }

  return (
    <>
      <div id="options" className="flex flex-row pt-8 gap-x-2">
        <Select onValueChange={(e) => setClass(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            {availableClasses.map((type) => (
              <SelectItem value={type} key={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select disabled={availableHeroes === null || availableHeroes.length <= 0} onValueChange={(e) => setHero(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Hero" />
          </SelectTrigger>
          <SelectContent>
            {availableHeroes?.map((name) => (
              <SelectItem value={name} key={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div id="charms" className="flex flex-row py-4 gap-x-1">
        <Select
          disabled={availableCharms === null || availableCharms.length <= 0}
          onValueChange={(e) => setCharm(e, CharmPosition.Left)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Left Charm" />
          </SelectTrigger>
          <SelectContent>
            {availableCharms?.map((charm) => (
              <SelectItem value={charm.name} key={charm.name}>
                {charm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          disabled={availableCharms === null || availableCharms.length <= 0}
          onValueChange={(e) => setCharm(e, CharmPosition.Mid)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Mid Charm" />
          </SelectTrigger>
          <SelectContent>
            {availableCharms?.map((charm) => (
              <SelectItem value={charm.name} key={charm.name}>
                {charm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          disabled={availableCharms === null || availableCharms.length <= 0}
          onValueChange={(e) => setCharm(e, CharmPosition.Right)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Right Charm" />
          </SelectTrigger>
          <SelectContent>
            {availableCharms?.map((charm) => (
              <SelectItem value={charm.name} key={charm.name}>
                {charm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {statsSummary.length > 0 && (
        <div>
          <h3>Charm Stats Summary</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attribute</TableHead>
                <TableHead>Stat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statsSummary.map((stats) => (
                <TableRow key={stats.name}>
                  <TableCell>{stats.name}</TableCell>
                  <TableCell>{stats.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <h2>{selectedClass}</h2>
      <h2>{selectedHero}</h2>
      <h2>{selectedLeftCharm?.name}</h2>
      <h2>{selectedMidCharm?.name}</h2>
      <h2>{selectedRightCharm?.name}</h2>
    </>
  );
}
