import { KeyStats } from "../core/types";

export function createRoundRobin() {
  let currentIndex = 0;

  return function roundRobin(keys: KeyStats[]): string {
    if (keys.length === 0) {
      throw new Error("No healthy API keys available");
    }

    const key = keys[currentIndex % keys.length].key;
    currentIndex++;
    return key;
  };
}
