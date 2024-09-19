"use client";

import { createContext, Dispatch, useContext, useReducer } from "react";

export const CounterContext = createContext<number>(0);
export const CounterDispatchContext = createContext<Dispatch<string> | null>(
  null,
);

export function CounterProvider({ children }: any) {
  const [counter, dispatch] = useReducer(counterReducer, 0);

  return (
    <CounterContext.Provider value={counter}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return useContext(CounterContext);
}

export function useCounterDispatch() {
  return useContext(CounterDispatchContext);
}

function counterReducer(counter: number, action: string) {
  switch (action) {
    case "increment": {
      return (counter = counter + 1);
    }
    case "decrement": {
      return (counter = counter - 1);
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
