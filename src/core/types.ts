export type StrategyType = "round-robin" | "least-used" | "random";

export interface KeyStats {
  key: string;
  usageCount: number;
  errorCount: number;
  lastUsed: number;
  healthy: boolean;
}

export interface BetterKeyOptions {
  provider: string;
  keys: string[];
  strategy?: StrategyType;
}
