import { describe, it, expect, vi } from "vitest";
import { renderHook, act, type RenderHookResult } from "@testing-library/react";
import { useMascotEyeTracking } from "../useMascotEyeTracking";
import type { UseMascotEyeTrackingReturn } from "@typings/cart/cartTypes";

const attachContainer = (result: RenderHookResult<UseMascotEyeTrackingReturn, unknown>["result"]): void => {
  const div = document.createElement("div");
  div.getBoundingClientRect = () => ({
    left: 100, top: 100, width: 380, height: 400,
    right: 480, bottom: 500, x: 100, y: 100, toJSON: () => ({}),
  });
  result.current.containerRef.current = div;
};

describe("useMascotEyeTracking", () => {
  it("arranca con los ojos centrados", () => {
    const { result } = renderHook(() => useMascotEyeTracking());
    expect(result.current.eyeOffset).toEqual({ x: 0, y: 0 });
  });

  it("mueve los ojos hacia el mouse, clampeado al rango configurado", () => {
    const { result } = renderHook(() => useMascotEyeTracking());
    attachContainer(result);

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 100000, clientY: 100000 }));
    });

    expect(result.current.eyeOffset.x).toBeCloseTo(12, 1);
    expect(result.current.eyeOffset.y).toBeCloseTo(7.2, 1);
  });

  it("ignora el movimiento si todavía no hay contenedor referenciado", () => {
    const { result } = renderHook(() => useMascotEyeTracking());

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500, clientY: 500 }));
    });

    expect(result.current.eyeOffset).toEqual({ x: 0, y: 0 });
  });

  it("remueve el listener de mousemove al desmontar", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useMascotEyeTracking());

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    removeSpy.mockRestore();
  });
});
