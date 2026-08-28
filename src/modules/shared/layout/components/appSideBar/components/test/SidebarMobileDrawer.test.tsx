import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { OptionLink } from "@typings/ui/layout.types";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarMobileDrawer from "../SidebarMobileDrawer";

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

const navLinks: OptionLink[] = [
    { description: "Ventas", icon: <span />, url: "/sells" },
    { description: "Productos", icon: <span />, url: "/products" },
];

describe("SidebarMobileDrawer", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(vi.fn().mockResolvedValue(undefined));
        mockedUseNavigate.mockReturnValue(vi.fn());
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) => selectorFn(mockAppState()));
    });

    const renderDrawer = (overrides: Partial<React.ComponentProps<typeof SidebarMobileDrawer>> = {}) =>
        renderWithTheme(
            <MemoryRouter>
                <SidebarMobileDrawer
                    open
                    onClose={vi.fn()}
                    navLinks={navLinks}
                    isLinkActive={() => false}
                    handleNavClick={vi.fn()}
                    isSubLinkActive={() => false}
                    navigate={vi.fn()}
                    handleLogout={vi.fn()}
                    onOpenSettings={vi.fn()}
                    onSellClick={vi.fn()}
                    isSellActive={false}
                    {...overrides}
                />
            </MemoryRouter>
        );

    it("renderiza Vender y todos los nav links", () => {
        renderDrawer();

        expect(screen.getByRole("button", { name: "Vender" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Ventas" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Productos" })).toBeInTheDocument();
    });

    it("dispara onSellClick al tocar Vender", async () => {
        const user = userEvent.setup();
        const onSellClick = vi.fn();
        renderDrawer({ onSellClick });

        await user.click(screen.getByRole("button", { name: "Vender" }));

        expect(onSellClick).toHaveBeenCalledTimes(1);
    });

    it("dispara handleNavClick con el link correcto", async () => {
        const user = userEvent.setup();
        const handleNavClick = vi.fn();
        renderDrawer({ handleNavClick });

        await user.click(screen.getByRole("button", { name: "Productos" }));

        expect(handleNavClick).toHaveBeenCalledWith(navLinks[1]);
    });

    it("muestra la tarjeta de tienda activa y el menú de usuario", () => {
        renderDrawer();

        expect(screen.getByText("Kiosco Centro")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Cerrar sesión/ })).toBeInTheDocument();
    });

    it("dispara onClose al tocar el botón de cerrar", async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();
        renderDrawer({ onClose });

        await user.click(screen.getByRole("button", { name: "Cerrar menú" }));

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
