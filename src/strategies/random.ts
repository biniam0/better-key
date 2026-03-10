import { KeyStats } from "../core/types";

export function randomStrategy(keys: KeyStats[]): string {
  if (keys.length === 0) {
    throw new Error("No healthy API keys available");
  }
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex].key;
}
