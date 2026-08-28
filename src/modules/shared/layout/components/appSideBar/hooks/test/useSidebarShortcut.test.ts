import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSidebarShortcut } from "../useSidebarShortcut";

const fireKeyDown = (init: KeyboardEventInit, target?: EventTarget) => {
    const event = new KeyboardEvent("keydown", { bubbles: true, ...init });
    (target ?? window).dispatchEvent(event);
};

describe("useSidebarShortcut", () => {
    it("llama a onSell al presionar 'v'", () => {
        const onSell = vi.fn();
        renderHook(() => useSidebarShortcut(onSell));

        fireKeyDown({ key: "v" });

        expect(onSell).toHaveBeenCalledTimes(1);
    });

    it("es case-insensitive ('V' también dispara)", () => {
        const onSell = vi.fn();
        renderHook(() => useSidebarShortcut(onSell));

        fireKeyDown({ key: "V" });

        expect(onSell).toHaveBeenCalledTimes(1);
    });

    it("ignora la tecla si el foco está en un input", () => {
        const onSell = vi.fn();
        renderHook(() => useSidebarShortcut(onSell));

        const input = document.createElement("input");
        document.body.appendChild(input);
        input.focus();

        fireKeyDown({ key: "v" }, input);

        expect(onSell).not.toHaveBeenCalled();
        document.body.removeChild(input);
    });

    it("ignora combinaciones con modificadores (ej. Ctrl+V)", () => {
        const onSell = vi.fn();
        renderHook(() => useSidebarShortcut(onSell));

        fireKeyDown({ key: "v", ctrlKey: true });

        expect(onSell).not.toHaveBeenCalled();
    });

    it("ignora otras teclas", () => {
        const onSell = vi.fn();
        renderHook(() => useSidebarShortcut(onSell));

        fireKeyDown({ key: "b" });

        expect(onSell).not.toHaveBeenCalled();
    });

    it("limpia el listener al desmontar", () => {
        const onSell = vi.fn();
        const { unmount } = renderHook(() => useSidebarShortcut(onSell));

        unmount();
        fireKeyDown({ key: "v" });

        expect(onSell).not.toHaveBeenCalled();
    });
});
