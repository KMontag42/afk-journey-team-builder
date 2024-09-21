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
  const [talents, talentsDispatch] = useReducer(talentReducer, {
    selectedTalent: "l0",
    availableTalents: [],
    purchasedTalents: [],
  });
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

function talentReducer(talents: TalentsData, action: Action) {
  switch (action.type) {
    case "add": {
      return talents;
    }
    case "remove": {
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