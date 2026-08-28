import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarKioscoCard from "../SidebarKioscoCard";

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

const buildKiosco = (overrides: Partial<KioscoWithStats> = {}): KioscoWithStats => ({
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
    ...overrides,
});

describe("SidebarKioscoCard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(vi.fn().mockResolvedValue(undefined));
        mockedUseNavigate.mockReturnValue(vi.fn());
    });

    it("no renderiza nada si todavía no hay kiosco activo", () => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ kiosco: { myKioscos: [], activeKioscoId: null, loading: false, errorMessage: null } })
        );

        const { container } = renderWithTheme(<SidebarKioscoCard />);
        expect(container).toBeEmptyDOMElement();
    });

    it("muestra el nombre del kiosco activo", () => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ kiosco: { myKioscos: [buildKiosco()], activeKioscoId: "kiosco-1", loading: false, errorMessage: null } })
        );

        renderWithTheme(<SidebarKioscoCard />);
        expect(screen.getByText("Kiosco Centro")).toBeInTheDocument();
    });

    it("despliega el resto de las tiendas al tocar la tarjeta", async () => {
        const user = userEvent.setup();
        const otro = buildKiosco({ _id: "kiosco-2", name: "Kiosco Norte" });
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ kiosco: { myKioscos: [buildKiosco(), otro], activeKioscoId: "kiosco-1", loading: false, errorMessage: null } })
        );

        renderWithTheme(<SidebarKioscoCard />);

        const toggle = screen.getByRole("button", { expanded: false });
        await user.click(toggle);

        expect(toggle).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByText("Kiosco Norte")).toBeInTheDocument();
    });
});
