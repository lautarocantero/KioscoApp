import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { OptionLink } from "@typings/ui/layout.types";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarPanel from "../SidebarPanel";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedUseNavigate = vi.mocked(useNavigate);

const mockAppState = () => ({
    auth: {
        _id: "u1",
        name: "Lautaro",
        email: "lautaro@test.com",
        profilePhoto: null,
        isLoading: false,
        isAuthenticated: true,
    },
    kiosco: {
        myKioscos: [
            {
                _id: "kiosco-1",
                name: "Kiosco Centro",
                address: "Av. Corrientes 1234",
                owner_id: "owner-1",
                invite_code: "ABC123",
                currency: "ARS",
                created_at: "2026-01-01T00:00:00.000Z",
                updated_at: "2026-01-01T00:00:00.000Z",
                role: AuthRoleEnum.Admin,
                sellers_count: 1,
                sells_today_total: 0,
                last_accessed_at: null,
            },
        ],
        activeKioscoId: "kiosco-1",
        loading: false,
        errorMessage: null,
    },
});

const link: OptionLink = { description: "Productos", icon: <span />, url: "/products", action: { label: "Nuevo producto", url: "/product-create" } };

describe("SidebarPanel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(vi.fn().mockResolvedValue(undefined));
        mockedUseNavigate.mockReturnValue(vi.fn());
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) => selectorFn(mockAppState()));
    });

    const renderPanel = (overrides: Partial<React.ComponentProps<typeof SidebarPanel>> = {}) =>
        renderWithTheme(
            <MemoryRouter>
                <SidebarPanel
                    isOpen
                    activeLink={link}
                    destinations={[{ label: "Categorías", url: "/categories-list" }]}
                    isSubLinkActive={() => false}
                    onNavigate={vi.fn()}
                    onOpenSettings={vi.fn()}
                    onLogout={vi.fn()}
                    onClosePanel={vi.fn()}
                    {...overrides}
                />
            </MemoryRouter>
        );

    it("muestra la tarjeta de tienda activa, el header de sección y sus destinos", () => {
        renderPanel();

        expect(screen.getByText("Kiosco Centro")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Productos" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Categorías" })).toBeInTheDocument();
    });

    it("muestra la acción de la sección cuando el link activo trae action", () => {
        renderPanel();

        expect(screen.getByRole("button", { name: /Nuevo producto/ })).toBeInTheDocument();
    });

    it("no muestra header/acción/destinos cuando no hay sección activa", () => {
        renderPanel({ activeLink: undefined, destinations: [] });

        expect(screen.queryByRole("heading", { name: "Productos" })).not.toBeInTheDocument();
    });

    it("muestra el menú de usuario con el botón de cerrar sesión", () => {
        renderPanel();

        expect(screen.getByRole("button", { name: /Cerrar sesión/ })).toBeInTheDocument();
    });

    it("marca aria-hidden cuando el panel está cerrado", () => {
        renderPanel({ isOpen: false });

        expect(screen.getByLabelText("Panel de sección")).toHaveAttribute("aria-hidden", "true");
    });
});
