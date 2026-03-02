import { KeyStats } from "./types";

export class KeyPool {
  private keys: KeyStats[] = [];

  constructor(apiKeys: string[]) {
    this.keys = apiKeys.map((key) => ({
      key,
      usageCount: 0,
      errorCount: 0,
      lastUsed: 0,
      healthy: true,
    }));
  }

  getAll() {
    return this.keys.find((k) => k.healthy);
  }

  markUsed(key: string) {
    const k = this.keys.find((k) => k.key === key);

    if (k) {
      k.usageCount++;
      k.lastUsed = Date.now();
    }
  }

  markError(key: string) {
    const k = this.keys.find((k) => k.key === key);
    if (k) {
      k.errorCount++;
      if (k.errorCount > 5) {
        k.healthy = false;
      }
    }
  }
}
