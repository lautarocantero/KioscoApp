import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../utils/setupTests";
import { TutorialContext } from "../../context/Tutorial/TutorialContext";
import TutorialOverlay from "../../components/Tutorial/TutorialOverlay";
import { TutorialIdEnum } from "@typings/tutorial/enums";
import type { TutorialContextType, TutorialStep } from "@typings/tutorial/types";

const steps: TutorialStep[] = [
    {
        id: "welcome",
        target: null,
        titleKey: "tutorial.selectKiosco.steps.welcome.title",
        bodyKey: "tutorial.selectKiosco.steps.welcome.body",
    },
    {
        id: "create",
        target: '[data-tutorial-target="kiosco-create"]',
        titleKey: "tutorial.selectKiosco.steps.create.title",
        bodyKey: "tutorial.selectKiosco.steps.create.body",
    },
];

const buildContextValue = (overrides: Partial<TutorialContextType> = {}): TutorialContextType => ({
    activeTutorialId: TutorialIdEnum.SelectKiosco,
    steps,
    stepIndex: 0,
    running: true,
    finished: false,
    rect: null,
    start: vi.fn(),
    next: vi.fn(),
    prev: vi.fn(),
    skip: vi.fn(),
    restart: vi.fn(),
    ...overrides,
});

const renderOverlay = (value: TutorialContextType) =>
    renderWithTheme(
        <TutorialContext.Provider value={value}>
            <TutorialOverlay />
        </TutorialContext.Provider>
    );

describe("TutorialOverlay", () => {
    it("no renderiza nada si el tutorial no está corriendo", () => {
        const { container } = renderOverlay(buildContextValue({ running: false }));

        expect(container).toBeEmptyDOMElement();
    });

    it("muestra el título/cuerpo del paso activo dentro de un dialog accesible", () => {
        renderOverlay(buildContextValue());

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("¡Bienvenido a Stocko!")).toBeInTheDocument();
    });

    it("el botón Siguiente llama a next()", () => {
        const next = vi.fn();
        renderOverlay(buildContextValue({ next }));

        fireEvent.click(screen.getByText("Siguiente"));

        expect(next).toHaveBeenCalled();
    });

    it("en el último paso, el botón pasa a 'Listo, arranco' y sigue llamando a next()", () => {
        const next = vi.fn();
        renderOverlay(buildContextValue({ stepIndex: 1, next }));

        fireEvent.click(screen.getByText("Listo, arranco"));

        expect(next).toHaveBeenCalled();
    });

    it("el botón Saltar tutorial llama a skip()", () => {
        const skip = vi.fn();
        renderOverlay(buildContextValue({ skip }));

        fireEvent.click(screen.getByText("Saltar tutorial"));

        expect(skip).toHaveBeenCalled();
    });
});
