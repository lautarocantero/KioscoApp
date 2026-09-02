import { StrictMode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInitialPageLoading } from "../useInitialPageLoading";

describe("useInitialPageLoading", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("arranca en true incluso si isLoading ya llega en false en el primer render", () => {
        const { result } = renderHook(({ isLoading }) => useInitialPageLoading(isLoading), {
            initialProps: { isLoading: false },
        });

        expect(result.current).toBe(true);
    });

    it("resuelve a false si isLoading se mantiene en false (nada para cargar)", () => {
        const { result } = renderHook(({ isLoading }) => useInitialPageLoading(isLoading), {
            initialProps: { isLoading: false },
        });

        act(() => {
            vi.advanceTimersByTime(0);
        });

        expect(result.current).toBe(false);
    });

    it("no resuelve antes de tiempo si isLoading pasa a true antes del primer chequeo", () => {
        const { result, rerender } = renderHook(({ isLoading }) => useInitialPageLoading(isLoading), {
            initialProps: { isLoading: false },
        });

        rerender({ isLoading: true });

        act(() => {
            vi.advanceTimersByTime(0);
        });

        expect(result.current).toBe(true);

        rerender({ isLoading: false });

        expect(result.current).toBe(false);
    });

    it("una vez resuelto a false, no vuelve a true si isLoading vuelve a true (mismo resetKey)", () => {
        const { result, rerender } = renderHook(({ isLoading }) => useInitialPageLoading(isLoading), {
            initialProps: { isLoading: false },
        });

        act(() => {
            vi.advanceTimersByTime(0);
        });
        expect(result.current).toBe(false);

        rerender({ isLoading: true });

        expect(result.current).toBe(false);
    });

    it("se re-arma a true cuando cambia resetKey", () => {
        const { result, rerender } = renderHook(
            ({ isLoading, resetKey }) => useInitialPageLoading(isLoading, resetKey),
            { initialProps: { isLoading: false, resetKey: "a" as string | null } }
        );

        act(() => {
            vi.advanceTimersByTime(0);
        });
        expect(result.current).toBe(false);

        rerender({ isLoading: false, resetKey: "b" });

        expect(result.current).toBe(true);
    });

    // Regresión: una versión anterior detectaba "resetKey cambió" comparando
    // y mutando una ref compartida dentro de un único efecto fusionado. En
    // dev, StrictMode monta cada componente dos veces (setup→cleanup→setup)
    // para detectar efectos impuros; esa ref quedaba mutada por la pasada
    // descartada, así que la pasada real veía "sin cambios" y se saltaba el
    // chequeo diferido — el LoadingScreen se cerraba antes de que el fetch
    // arrancara. Este test monta bajo <StrictMode> para que ese bug (si
    // reaparece) se detecte acá y no recién viendo /new-sell en el navegador.
    it("bajo StrictMode (doble-invoke de efectos en dev) sigue diferiendo el primer chequeo", () => {
        const { result, rerender } = renderHook(({ isLoading }) => useInitialPageLoading(isLoading), {
            initialProps: { isLoading: false },
            wrapper: StrictMode,
        });

        // Patrón real: el slice arranca en false y recién un commit
        // después (dentro del efecto del hook de datos) pasa a true.
        rerender({ isLoading: true });

        act(() => {
            vi.advanceTimersByTime(0);
        });
        expect(result.current).toBe(true);

        rerender({ isLoading: false });
        expect(result.current).toBe(false);
    });
});
