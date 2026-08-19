import { describe, it, expect, afterEach } from "vitest";
import { isElectronRuntime } from "../../helpers/isElectronRuntime";

describe("isElectronRuntime", () => {
  afterEach(() => {
    delete window.electron;
  });

  it("devuelve false cuando window.electron no está definido", () => {
    expect(isElectronRuntime()).toBe(false);
  });

  it("devuelve true cuando el preload expuso window.electron.isElectron", () => {
    window.electron = { isElectron: true, platform: "linux" };
    expect(isElectronRuntime()).toBe(true);
  });
});
