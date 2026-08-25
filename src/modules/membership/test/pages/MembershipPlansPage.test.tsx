import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MembershipPlansPage from "../../pages/MembershipPlansPage";
import { useMembershipPlansPage } from "../../../../hooks/membership/useMembershipPlansPage";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

vi.mock("../../../../hooks/membership/useMembershipPlansPage", () => ({
    useMembershipPlansPage: vi.fn(),
}));

const mockedUseMembershipPlansPage = vi.mocked(useMembershipPlansPage);

const baseReturn = {
    status: null,
    statusLoading: false,
    statusError: null,
    plans: [],
    plansLoading: false,
    plansError: null,
    selectPlan: vi.fn(),
    isPlanCurrent: vi.fn(() => false),
};

describe("MembershipPlansPage — acceso admin-only", () => {
    it("seller (no admin): muestra el aviso de acceso restringido, no la grilla de planes", () => {
        mockedUseMembershipPlansPage.mockReturnValue({ ...baseReturn, isAdmin: false });

        renderWithTheme(
            <MemoryRouter>
                <MembershipPlansPage />
            </MemoryRouter>
        );

        expect(screen.getByText("Solo disponible para el administrador")).toBeInTheDocument();
    });

    it("admin: renderiza el heading normal de la página de planes", () => {
        mockedUseMembershipPlansPage.mockReturnValue({ ...baseReturn, isAdmin: true });

        renderWithTheme(
            <MemoryRouter>
                <MembershipPlansPage />
            </MemoryRouter>
        );

        expect(screen.queryByText("Solo disponible para el administrador")).not.toBeInTheDocument();
    });
});
