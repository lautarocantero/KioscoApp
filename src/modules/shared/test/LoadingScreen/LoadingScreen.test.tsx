import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, screen } from "@testing-library/react";
import { renderWithTheme } from "../utils/setupTests";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { getPublicAssetUrl } from "../../helpers/getPublicAssetUrl";

describe("LoadingScreen", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("se renderiza con role progressbar y límites 0-100", () => {
        renderWithTheme(<LoadingScreen />);

        const progressbar = screen.getByRole("progressbar");
        expect(progressbar).toHaveAttribute("aria-valuemin", "0");
        expect(progressbar).toHaveAttribute("aria-valuemax", "100");
        expect(progressbar).toHaveAttribute("aria-valuenow", "0");
    });

    it("el progreso avanza con el tiempo (una sola pasada, no loop)", () => {
        renderWithTheme(<LoadingScreen />);

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        const valueNow = Number(screen.getByRole("progressbar").getAttribute("aria-valuenow"));
        expect(valueNow).toBeGreaterThan(0);
        expect(valueNow).toBeLessThan(100);
    });

    it("usa 'Cargando...' como aria-label por defecto", () => {
        renderWithTheme(<LoadingScreen />);

        expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Cargando...");
    });

    it("usa el label recibido como aria-label y como texto visible", () => {
        renderWithTheme(<LoadingScreen label="Cargando productos..." />);

        const progressbar = screen.getByRole("progressbar");
        expect(progressbar).toHaveAttribute("aria-label", "Cargando productos...");
        expect(progressbar).toHaveTextContent("Cargando productos...");
    });

    it("resuelve las imágenes de la mascota vía getPublicAssetUrl y las oculta de accesibilidad", () => {
        const { container } = renderWithTheme(<LoadingScreen />);

        const images = container.querySelectorAll("img");
        expect(images).toHaveLength(2);
        images.forEach((image) => {
            expect(image.getAttribute("src")).toBe(getPublicAssetUrl("images/logo/Stocko-mascotCircle.png"));
            expect(image).toHaveAttribute("aria-hidden", "true");
        });
    });

    it("por defecto (fullViewport) se renderiza como <main>", () => {
        renderWithTheme(<LoadingScreen />);

        expect(screen.getByRole("progressbar").tagName).toBe("MAIN");
    });

    it("con fullViewport=false se renderiza como <div>, para no duplicar el <main> de AppLayout", () => {
        renderWithTheme(<LoadingScreen fullViewport={false} />);

        expect(screen.getByRole("progressbar").tagName).toBe("DIV");
    });
});
