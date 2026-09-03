import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTutorialEngine } from "../useTutorialEngine";
import { TutorialIdEnum } from "@typings/tutorial/enums";
import type { TutorialStep } from "@typings/tutorial/types";

const steps: TutorialStep[] = [
    { id: "welcome", target: null, titleKey: "t1", bodyKey: "b1" },
    { id: "second", target: null, titleKey: "t2", bodyKey: "b2" },
    { id: "third", target: null, titleKey: "t3", bodyKey: "b3" },
];

describe("useTutorialEngine", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("arranca detenido, sin tutorial activo", () => {
        const { result } = renderHook(() => useTutorialEngine());

        expect(result.current.running).toBe(false);
        expect(result.current.activeTutorialId).toBeNull();
        expect(result.current.finished).toBe(false);
    });

    it("start() activa el tutorial en el paso 0", () => {
        const { result } = renderHook(() => useTutorialEngine());

        act(() => result.current.start(TutorialIdEnum.Shop, steps));

        expect(result.current.running).toBe(true);
        expect(result.current.activeTutorialId).toBe(TutorialIdEnum.Shop);
        expect(result.current.stepIndex).toBe(0);
        expect(result.current.finished).toBe(false);
    });

    it("start() con un array vacío no activa nada", () => {
        const { result } = renderHook(() => useTutorialEngine());

        act(() => result.current.start(TutorialIdEnum.Shop, []));

        expect(result.current.running).toBe(false);
    });

    it("next() avanza de paso", () => {
        const { result } = renderHook(() => useTutorialEngine());
        act(() => result.current.start(TutorialIdEnum.Shop, steps));

        act(() => result.current.next());

        expect(result.current.stepIndex).toBe(1);
        expect(result.current.running).toBe(true);
    });

    it("next() en el último paso termina el tutorial", () => {
        const { result } = renderHook(() => useTutorialEngine());
        act(() => result.current.start(TutorialIdEnum.Shop, steps));

        act(() => result.current.next());
        act(() => result.current.next());
        act(() => result.current.next());

        expect(result.current.running).toBe(false);
        expect(result.current.finished).toBe(true);
    });

    it("prev() no baja del paso 0", () => {
        const { result } = renderHook(() => useTutorialEngine());
        act(() => result.current.start(TutorialIdEnum.Shop, steps));

        act(() => result.current.prev());

        expect(result.current.stepIndex).toBe(0);
    });

    it("skip() termina el tutorial sin importar en qué paso está", () => {
        const { result } = renderHook(() => useTutorialEngine());
        act(() => result.current.start(TutorialIdEnum.Shop, steps));
        act(() => result.current.next());

        act(() => result.current.skip());

        expect(result.current.running).toBe(false);
        expect(result.current.finished).toBe(true);
    });

    it("restart() vuelve al paso 0 y lo pone en marcha de nuevo", () => {
        const { result } = renderHook(() => useTutorialEngine());
        act(() => result.current.start(TutorialIdEnum.Shop, steps));
        act(() => result.current.next());
        act(() => result.current.skip());

        act(() => result.current.restart());

        expect(result.current.running).toBe(true);
        expect(result.current.finished).toBe(false);
        expect(result.current.stepIndex).toBe(0);
    });

    it("Escape dispara skip mientras el tutorial está corriendo", () => {
        const { result } = renderHook(() => useTutorialEngine());
        act(() => result.current.start(TutorialIdEnum.Shop, steps));

        act(() => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        });

        expect(result.current.running).toBe(false);
        expect(result.current.finished).toBe(true);
    });

    it("ArrowRight dispara next mientras el tutorial está corriendo", () => {
        const { result } = renderHook(() => useTutorialEngine());
        act(() => result.current.start(TutorialIdEnum.Shop, steps));

        act(() => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
        });

        expect(result.current.stepIndex).toBe(1);
    });

    it("las teclas no hacen nada una vez que el tutorial terminó", () => {
        const { result } = renderHook(() => useTutorialEngine());
        act(() => result.current.start(TutorialIdEnum.Shop, steps));
        act(() => result.current.skip());

        act(() => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
        });

        expect(result.current.stepIndex).toBe(0);
        expect(result.current.running).toBe(false);
    });
});
