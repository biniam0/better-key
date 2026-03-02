import { KeyStats } from "../core/types";

export function leastUsed(keys: KeyStats[] | []): string {
  const sorted = [...keys].sort((a, b) => a.usageCount - b.usageCount);
  return sorted[0].key;
}
