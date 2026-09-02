import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLoadingScreenProgress } from "../useLoadingScreenProgress";

describe("useLoadingScreenProgress", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("arranca en 0", () => {
        const { result } = renderHook(() => useLoadingScreenProgress());

        expect(result.current).toBe(0);
    });

    it("crece con el tiempo sin superar el tope", () => {
        const { result } = renderHook(() => useLoadingScreenProgress());

        act(() => {
            vi.advanceTimersByTime(500);
        });
        const afterHalfSecond = result.current;
        expect(afterHalfSecond).toBeGreaterThan(0);

        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(result.current).toBeGreaterThan(afterHalfSecond);
        expect(result.current).toBeLessThan(92);
    });

    it("nunca reinicia ni supera el tope aunque pase mucho tiempo (pasada única)", () => {
        const { result } = renderHook(() => useLoadingScreenProgress());

        act(() => {
            vi.advanceTimersByTime(60_000);
        });

        expect(result.current).toBeGreaterThan(80);
        expect(result.current).toBeLessThan(92);
    });

    it("deja de actualizar al desmontar (limpia el interval)", () => {
        const { result, unmount } = renderHook(() => useLoadingScreenProgress());

        act(() => {
            vi.advanceTimersByTime(500);
        });
        const beforeUnmount = result.current;

        unmount();

        act(() => {
            vi.advanceTimersByTime(5000);
        });
        expect(result.current).toBe(beforeUnmount);
    });
});
