import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { AuthBrandVideoPhaseEnum } from "@typings/auth/authEnums";
import { useAuthBrandVideo, HOLD_LAST_FRAME_MS, FADE_TRANSITION_MS } from "../useAuthBrandVideo";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useAuthBrandVideo", () => {
  it("arranca reproduciendo", () => {
    const { result } = renderHook(() => useAuthBrandVideo());

    expect(result.current.phase).toBe(AuthBrandVideoPhaseEnum.Playing);
  });

  it("pasa a Holding cuando el video termina, y se queda ahí hasta cumplir HOLD_LAST_FRAME_MS", () => {
    const { result } = renderHook(() => useAuthBrandVideo());

    act(() => {
      result.current.handleVideoEnded();
    });
    expect(result.current.phase).toBe(AuthBrandVideoPhaseEnum.Holding);

    act(() => {
      vi.advanceTimersByTime(HOLD_LAST_FRAME_MS - 1);
    });
    expect(result.current.phase).toBe(AuthBrandVideoPhaseEnum.Holding);
  });

  it("pasa a Fading al cumplirse HOLD_LAST_FRAME_MS, y a Done al cumplirse FADE_TRANSITION_MS", () => {
    const { result } = renderHook(() => useAuthBrandVideo());

    act(() => {
      result.current.handleVideoEnded();
    });
    act(() => {
      vi.advanceTimersByTime(HOLD_LAST_FRAME_MS);
    });
    expect(result.current.phase).toBe(AuthBrandVideoPhaseEnum.Fading);

    act(() => {
      vi.advanceTimersByTime(FADE_TRANSITION_MS);
    });
    expect(result.current.phase).toBe(AuthBrandVideoPhaseEnum.Done);
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
