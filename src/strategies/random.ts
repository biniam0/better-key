import { KeyStats } from "../core/types";

export function randomStrategy(keys: KeyStats[]): string {
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex].key;
}
