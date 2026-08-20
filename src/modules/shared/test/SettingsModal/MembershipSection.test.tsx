import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import { renderWithTheme } from "../utils/setupTests";
import MembershipSection from "../../components/SettingsModal/sections/MembershipSection";
import { useMembershipStatus } from "../../../../hooks/membership/useMembershipStatus";

vi.mock("../../../../hooks/membership/useMembershipStatus", () => ({
    useMembershipStatus: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

const mockedUseMembershipStatus = vi.mocked(useMembershipStatus);
const mockedUseNavigate = vi.mocked(useNavigate);

describe("MembershipSection", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("muestra el nombre del plan actual y un botón 'Cambiar plan'", () => {
        mockedUseMembershipStatus.mockReturnValue({
            status: { plan: KioscoPlanEnum.SuperStocko, plan_status: KioscoPlanStatusEnum.Active, next_payment_date: null },
            loading: false,
            error: null,
            refetch: vi.fn(),
        });

        renderWithTheme(
            <MemoryRouter>
                <MembershipSection />
            </MemoryRouter>
        );

        expect(screen.getByText("Super Stocko")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Cambiar plan" })).toBeInTheDocument();
    });

    it("navega a /membership/plans al hacer click en 'Cambiar plan'", () => {
        const navigate = vi.fn();
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseMembershipStatus.mockReturnValue({
            status: { plan: KioscoPlanEnum.Stocko, plan_status: KioscoPlanStatusEnum.Active, next_payment_date: null },
            loading: false,
            error: null,
            refetch: vi.fn(),
        });

        renderWithTheme(
            <MemoryRouter>
                <MembershipSection />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "Cambiar plan" }));

        expect(navigate).toHaveBeenCalledWith("/membership/plans");
    });

    it("muestra el mensaje de error si useMembershipStatus falla", () => {
        mockedUseMembershipStatus.mockReturnValue({
            status: null,
            loading: false,
            error: "No se pudo obtener el estado de tu membresía",
            refetch: vi.fn(),
        });

        renderWithTheme(
            <MemoryRouter>
                <MembershipSection />
            </MemoryRouter>
        );

        expect(screen.getByRole("alert")).toHaveTextContent("No se pudo obtener el estado de tu membresía");
    });
});
