import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSettingsModal } from "../useSettingsModal";

describe("useSettingsModal", () => {
  it("arranca cerrado y abre/cierra con openSettings/closeSettings", () => {
    const { result } = renderHook(() => useSettingsModal());

    expect(result.current.isOpen).toBe(false);

    act(() => result.current.openSettings());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.closeSettings());
    expect(result.current.isOpen).toBe(false);
  });
});
