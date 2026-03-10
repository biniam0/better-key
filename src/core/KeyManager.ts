import { BetterKeyOptions, KeyStats, StrategyType } from "./types";
import { KeyPool } from "./KeyPool";
import { createRoundRobin } from "../strategies/roundRobin";
import { leastUsed } from "../strategies/leastUsed";
import { randomStrategy } from "../strategies/random";

export class KeyManager {
  private pool: KeyPool;
  private strategy: StrategyType;
  private roundRobin: (keys: KeyStats[]) => string;

  constructor(options: BetterKeyOptions) {
    if (!options.keys || options.keys.length === 0) {
      throw new Error("No API keys provided.");
    }

    this.pool = new KeyPool(options.keys);
    this.strategy = options.strategy || "round-robin";
    this.roundRobin = createRoundRobin();
  }

  getKey(): string {
    const healthyKeys = this.pool.getAll();

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
        selectedKey = this.roundRobin(healthyKeys);
    }

    this.pool.markUsed(selectedKey);
    return selectedKey;
  }

  reportError(key: string) {
    this.pool.markError(key);
  }
}
