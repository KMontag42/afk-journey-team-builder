import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterObjectByKeys<T extends object>(
  obj: T,
  keys: Array<keyof T>,
): Partial<T> {
  const filteredObject: Partial<T> = {};

  keys.forEach((key) => {
    if (key in obj) {
      filteredObject[key] = obj[key];
    }
  });

  return filteredObject;
}

export function excludeKeysFromObject<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj } as T; // Clone the object

  keys.forEach((key) => {
    delete result[key]; // Safely delete the keys from the clone
  });

  return result as Omit<T, K>; // Return the object, cast as Omit
}
