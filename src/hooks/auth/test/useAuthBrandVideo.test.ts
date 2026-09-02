import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuthBrandVideo } from "../useAuthBrandVideo";

describe("useAuthBrandVideo", () => {
  it("arranca con hasEnded en false", () => {
    const { result } = renderHook(() => useAuthBrandVideo());

    expect(result.current.hasEnded).toBe(false);
  });

  it("pone hasEnded en true cuando el video termina", () => {
    const { result } = renderHook(() => useAuthBrandVideo());

    act(() => {
      result.current.handleVideoEnded();
    });

    expect(result.current.hasEnded).toBe(true);
  });

  it("bloquea el menú contextual para evitar pausar el video", () => {
    const { result } = renderHook(() => useAuthBrandVideo());
    const preventDefault = vi.fn();

    act(() => {
      result.current.handleVideoContextMenu({ preventDefault } as unknown as React.MouseEvent<HTMLVideoElement>);
    });

    expect(preventDefault).toHaveBeenCalled();
  });
});
