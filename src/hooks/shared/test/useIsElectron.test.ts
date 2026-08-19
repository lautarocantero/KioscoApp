import { describe, it, expect, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsElectron } from "../useIsElectron";

describe("useIsElectron", () => {
  afterEach(() => {
    delete window.electron;
  });

  it("devuelve false en un entorno de navegador sin electron", () => {
    const { result } = renderHook(() => useIsElectron());
    expect(result.current).toBe(false);
  });

  it("devuelve true cuando window.electron.isElectron está presente", () => {
    window.electron = { isElectron: true, platform: "win32" };
    const { result } = renderHook(() => useIsElectron());
    expect(result.current).toBe(true);
  });
});
