"use client";

import { TalentsData } from "@/lib/talents";
import { createContext, Dispatch, useContext, useReducer } from "react";

type Action = {
  type: "add" | "remove" | "select";
  talentId: string;
};

export const TalentContext = createContext<any | null>(null);
export const TalentDispatchContext = createContext<Dispatch<any> | null>(null);

export function TalentProvider({ children }: any) {
  const talentsData: TalentsData = {
    selectedFaction: "",
    selectedTalent: "",
    availableTalents: [],
    purchasedTalents: [],
    talentData: [],
  };

  const [talents, talentsDispatch] = useReducer(talentReducer, talentsData);
  return (
    <TalentContext.Provider value={talents}>
      <TalentDispatchContext.Provider value={talentsDispatch}>
        {children}
      </TalentDispatchContext.Provider>
    </TalentContext.Provider>
  );
}

export function useTalents() {
  return useContext(TalentContext);
}

export function useTalentsDispatch() {
  return useContext(TalentDispatchContext);
}

function talentReducer(talents: TalentsData, action: Action): TalentsData {
  switch (action.type) {
    case "add": {
      // TODO: Loop through the talentData, find the talent id that matches action.talentId and set its unlocked to true.
      // This will should update the talent tree if it has been unlocked... this doesn't work.. Probably need a better way.
      const activatedTalent = talents.talentData
        .find((factionData) => factionData.faction === talents.selectedFaction)
        ?.talents!.find((talent) => talent.id === talents.selectedTalent);
      if (activatedTalent) {
        activatedTalent.unlocked = true;
      }

      talents.purchasedTalents.push(action.talentId);
      talents.selectedTalent = "";
      return talents;
    }
    case "remove": {
      // TODO: Ignoring remove for now... just trying to get all the purchasing working so far.
      return talents;
    }
    case "select": {
      return { ...talents, selectedTalent: action.talentId };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
