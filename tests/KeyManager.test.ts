import { describe, expect, it } from "vitest";
import { KeyManager } from "../dist";

describe("KeyManger", () => {
  const keys = ["key1", "key2", "key3"];

  it("should return a key", () => {
    const manager = new KeyManager({
      provider: "test",
      keys,
    });
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

  it("should mark key as unhealthy after repeated errors", () => {
    const manager = new KeyManager({
      provider: "test",
      keys: ["key1"],
    });
  });
});
