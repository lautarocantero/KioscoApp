import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSaleConfirmedModal } from "../useSaleConfirmedModal";

describe("useSaleConfirmedModal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("arranca cerrado", () => {
    const { result } = renderHook(() => useSaleConfirmedModal(4000));

    expect(result.current.isOpen).toBe(false);
  });

  it("se abre con progress 100 y se auto-cierra al llegar el tiempo configurado", () => {
    const { result } = renderHook(() => useSaleConfirmedModal(4000));

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    expect(result.current.progress).toBe(100);

    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.isOpen).toBe(true);
    expect(result.current.progress).toBeCloseTo(50, 0);

    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.isOpen).toBe(false);
  });

  it("pausa el conteo mientras isPaused es true y lo retoma al resumir", () => {
    const { result } = renderHook(() => useSaleConfirmedModal(4000));

    act(() => result.current.open());
    act(() => vi.advanceTimersByTime(1000));
    const progressBeforePause = result.current.progress;

    act(() => result.current.pause());
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.isOpen).toBe(true);
    expect(result.current.progress).toBe(progressBeforePause);

    act(() => result.current.resume());
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.isOpen).toBe(false);
  });

  it("se puede cerrar manualmente antes de que termine el tiempo", () => {
    const { result } = renderHook(() => useSaleConfirmedModal(4000));

    act(() => result.current.open());
    act(() => result.current.close());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.isPaused).toBe(false);
  });
});
