import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import KioscoEmptyState from "../../components/KioscoEmptyState/KioscoEmptyState";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

const mockedUseNavigate = vi.mocked(useNavigate);

const renderComponent = () => renderWithTheme(<MemoryRouter><KioscoEmptyState /></MemoryRouter>);

describe("KioscoEmptyState", () => {
    const navigate = vi.fn();

    beforeEach(() => {
        navigate.mockClear();
        mockedUseNavigate.mockReturnValue(navigate);
    });

    it("muestra el título y el body del estado vacío", () => {
        renderComponent();

        expect(screen.getByText("Todavía no tenés kioscos")).toBeInTheDocument();
        expect(screen.getByText(/Creá tu primer punto de venta/)).toBeInTheDocument();
    });

    it("navega a /create-kiosco al hacer click en el botón principal", () => {
        renderComponent();

        fireEvent.click(screen.getByText("Crear kiosco"));

        expect(navigate).toHaveBeenCalledWith("/create-kiosco");
    });

    it("navega a /join-kiosco al hacer click en el link secundario", () => {
        renderComponent();

        fireEvent.click(screen.getByText("Tengo un código de invitación"));

        expect(navigate).toHaveBeenCalledWith("/join-kiosco");
    });

    it("marca los targets del tutorial de selección de kiosco (crear y unirme)", () => {
        const { container } = renderComponent();

        expect(container.querySelector('[data-tutorial-target="kiosco-create"]')).toBeInTheDocument();
        expect(container.querySelector('[data-tutorial-target="kiosco-join"]')).toBeInTheDocument();
    });
});
