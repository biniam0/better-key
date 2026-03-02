import { BetterKeyOptions, KeyStats, StrategyType } from "./types";
import { KeyPool } from "./KeyPool";
import { roundRobin } from "../strategies/roundRobin";
import { leastUsed } from "../strategies/leastUsed";
import { randomStrategy } from "../strategies/random";

export class KeyManager {
  private pool: KeyPool;
  private strategy: StrategyType;

  constructor(options: BetterKeyOptions) {
    if (!options.keys || options.keys.length === 0) {
      throw new Error("No API keys provided.");
    }

    this.pool = new KeyPool(options.keys);
    this.strategy = options.strategy || "round-robin";
  }

  getKey(): string {
    const allStats = this.pool.getAll();

    if (!allStats) {
      throw new Error("No keys available");
    }

    const healthyKeys: KeyStats[] = [allStats].filter((stats) => stats.healthy);

    if (healthyKeys.length === 0) {
      throw new Error("No healthy keys available");
    }

    let selectedKey: string;

    switch (this.strategy) {
      case "least-used":
        selectedKey = leastUsed(healthyKeys);
        break;
      case "random":
        selectedKey = randomStrategy(healthyKeys);
        break;
      default:
        selectedKey = roundRobin(healthyKeys);
    }

    this.pool.markUsed(selectedKey);
    return selectedKey;
  }

  reportError(key: string) {
    this.pool.markError(key);
  }
}
