import { describe, expect, it } from "vitest";
import { createRoundRobin } from "../src/strategies/roundRobin";
import { leastUsed } from "../src/strategies/leastUsed";
import { randomStrategy } from "../src/strategies/random";
import { KeyStats } from "../src/core/types";

function makeKey(key: string, usageCount = 0, healthy = true): KeyStats {
  return { key, usageCount, errorCount: 0, lastUsed: 0, healthy };
}

describe("roundRobin", () => {
  it("should cycle through keys in order", () => {
    const rr = createRoundRobin();
    const keys = [makeKey("a"), makeKey("b"), makeKey("c")];

    expect(rr(keys)).toBe("a");
    expect(rr(keys)).toBe("b");
    expect(rr(keys)).toBe("c");
    expect(rr(keys)).toBe("a");
  });

  it("should throw on empty array", () => {
    const rr = createRoundRobin();
    expect(() => rr([])).toThrow("No healthy API keys available");
  });

  it("should have independent state per factory call", () => {
    const rr1 = createRoundRobin();
    const rr2 = createRoundRobin();
    const keys = [makeKey("a"), makeKey("b")];

    rr1(keys); // advances rr1 to index 1
    expect(rr2(keys)).toBe("a"); // rr2 still at index 0
  });
});

describe("leastUsed", () => {
  it("should return the key with the lowest usage count", () => {
    const keys = [makeKey("a", 5), makeKey("b", 1), makeKey("c", 3)];
    expect(leastUsed(keys)).toBe("b");
  });

  it("should throw on empty array", () => {
    expect(() => leastUsed([])).toThrow("No healthy API keys available");
  });
});

describe("randomStrategy", () => {
  it("should return a key from the pool", () => {
    const keys = [makeKey("a"), makeKey("b"), makeKey("c")];
    const result = randomStrategy(keys);
    expect(["a", "b", "c"]).toContain(result);
  });

  it("should throw on empty array", () => {
    expect(() => randomStrategy([])).toThrow("No healthy API keys available");
  });
});
