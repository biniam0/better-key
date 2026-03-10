import { describe, expect, it } from "vitest";
import { KeyManager } from "../src";

describe("KeyManager", () => {
  const keys = ["key1", "key2", "key3"];

  it("should return a key", () => {
    const manager = new KeyManager({
      provider: "test",
      keys,
    });
    const key = manager.getKey();
    expect(keys).toContain(key);
  });

  it("should rotate keys using round-robin", () => {
    const manager = new KeyManager({
      provider: "test",
      keys,
      strategy: "round-robin",
    });

    const first = manager.getKey();
    const second = manager.getKey();

    expect(first).not.toBe(second);
  });

  it("should return all keys in round-robin cycle", () => {
    const manager = new KeyManager({
      provider: "test",
      keys,
      strategy: "round-robin",
    });

    const results = new Set<string>();
    for (let i = 0; i < keys.length; i++) {
      results.add(manager.getKey());
    }
    expect(results.size).toBe(keys.length);
  });

  it("should mark key as unhealthy after repeated errors", () => {
    const manager = new KeyManager({
      provider: "test",
      keys: ["key1"],
    });

    for (let i = 0; i < 6; i++) {
      manager.reportError("key1");
    }

    expect(() => manager.getKey()).toThrow("No healthy keys available");
  });

  it("should throw if no keys are provided", () => {
    expect(() => new KeyManager({ provider: "test", keys: [] })).toThrow(
      "No API keys provided.",
    );
  });

  it("should use least-used strategy", () => {
    const manager = new KeyManager({
      provider: "test",
      keys,
      strategy: "least-used",
    });

    const first = manager.getKey();
    const second = manager.getKey();
    // After using the first key, least-used should pick a different one
    expect(first).not.toBe(second);
  });

  it("should use random strategy", () => {
    const manager = new KeyManager({
      provider: "test",
      keys,
      strategy: "random",
    });

    const key = manager.getKey();
    expect(keys).toContain(key);
  });

  it("should have independent round-robin state per instance", () => {
    const manager1 = new KeyManager({
      provider: "test",
      keys,
      strategy: "round-robin",
    });
    const manager2 = new KeyManager({
      provider: "test",
      keys,
      strategy: "round-robin",
    });

    const key1 = manager1.getKey();
    const key2 = manager2.getKey();
    // Both start at index 0, so they should return the same first key
    expect(key1).toBe(key2);
  });
});
