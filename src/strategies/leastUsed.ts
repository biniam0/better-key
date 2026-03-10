import { KeyStats } from "../core/types";

export function leastUsed(keys: KeyStats[]): string {
  if (keys.length === 0) {
    throw new Error("No healthy API keys available");
  }
  const sorted = [...keys].sort((a, b) => a.usageCount - b.usageCount);
  return sorted[0].key;
}
