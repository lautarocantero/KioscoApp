import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import KioscoRoutes from "../../routes/KioscoRoutes";

vi.mock("../../pages/KioscoSelectorPage", () => ({
    default: () => <div data-testid="kiosco-selector-page" />,
}));
vi.mock("../../pages/CreateKioscoPage", () => ({
    default: () => <div data-testid="create-kiosco-page" />,
}));

const renderAt = (path: string) =>
    renderWithTheme(
        <MemoryRouter initialEntries={[path]}>
            <Routes>{KioscoRoutes()}</Routes>
        </MemoryRouter>
    );

describe("KioscoRoutes", () => {
    it("renderiza KioscoSelectorPage en /select-kiosco", () => {
        renderAt("/select-kiosco");

        expect(screen.getByTestId("kiosco-selector-page")).toBeInTheDocument();
    });

    it("renderiza CreateKioscoPage en /create-kiosco", () => {
        renderAt("/create-kiosco");

        expect(screen.getByTestId("create-kiosco-page")).toBeInTheDocument();
    });
});
