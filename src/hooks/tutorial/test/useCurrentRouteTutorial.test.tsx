import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { useCurrentRouteTutorial } from "../useCurrentRouteTutorial";
import { useIsActiveKioscoAdmin } from "@hooks/kiosco/useIsActiveKioscoAdmin";
import { TutorialIdEnum } from "@typings/tutorial/enums";

vi.mock("@hooks/kiosco/useIsActiveKioscoAdmin");

const mockedUseIsActiveKioscoAdmin = vi.mocked(useIsActiveKioscoAdmin);

const renderAt = (pathname: string) =>
    renderHook(() => useCurrentRouteTutorial(), {
        wrapper: ({ children }: PropsWithChildren) => (
            <MemoryRouter initialEntries={[pathname]}>{children}</MemoryRouter>
        ),
    });

describe("useCurrentRouteTutorial", () => {
    beforeEach(() => {
        mockedUseIsActiveKioscoAdmin.mockReturnValue(true);
    });

    it("devuelve null si la ruta activa no tiene tutorial registrado", () => {
        const { result } = renderAt("/account");

        expect(result.current).toBeNull();
    });

    it("matchea una ruta fija (/shop)", () => {
        const { result } = renderAt("/shop");

        expect(result.current?.tutorialId).toBe(TutorialIdEnum.Shop);
        expect(result.current?.steps.length).toBeGreaterThan(0);
    });

    it("matchea una ruta dinámica (/products/:product_id/presentations)", () => {
        const { result } = renderAt("/products/abc123/presentations");

        expect(result.current?.tutorialId).toBe(TutorialIdEnum.Presentations);
    });

    it("distingue /products de /products/:id/presentations", () => {
        const { result } = renderAt("/products");

        expect(result.current?.tutorialId).toBe(TutorialIdEnum.Products);
    });

    it("resuelve /sellers y filtra el paso de invitar cuando no es admin", () => {
        mockedUseIsActiveKioscoAdmin.mockReturnValue(false);

        const { result } = renderAt("/sellers");

        expect(result.current?.tutorialId).toBe(TutorialIdEnum.Sellers);
        expect(result.current?.steps.some((step) => step.id === "invite")).toBe(false);
    });
});
