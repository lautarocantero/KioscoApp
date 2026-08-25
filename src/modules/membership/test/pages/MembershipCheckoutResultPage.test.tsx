import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MembershipCheckoutResultPage from "../../pages/MembershipCheckoutResultPage";
import { useMembershipCheckoutResult } from "../../../../hooks/membership/useMembershipCheckoutResult";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

vi.mock("../../../../hooks/membership/useMembershipCheckoutResult", () => ({
    useMembershipCheckoutResult: vi.fn(),
}));

const mockedUseMembershipCheckoutResult = vi.mocked(useMembershipCheckoutResult);

const baseReturn = {
    status: null,
    loading: false,
    error: null,
    refetch: vi.fn(),
    planName: "",
    isActive: false,
    isCancelled: false,
    goToShop: vi.fn(),
};

describe("MembershipCheckoutResultPage — acceso admin-only", () => {
    it("seller (no admin): muestra el aviso de acceso restringido", () => {
        mockedUseMembershipCheckoutResult.mockReturnValue({ ...baseReturn, isAdmin: false });

        renderWithTheme(
            <MemoryRouter>
                <MembershipCheckoutResultPage />
            </MemoryRouter>
        );

        expect(screen.getByText("Solo disponible para el administrador")).toBeInTheDocument();
    });

    it("admin: no muestra el aviso de acceso restringido", () => {
        mockedUseMembershipCheckoutResult.mockReturnValue({ ...baseReturn, isAdmin: true });

        renderWithTheme(
            <MemoryRouter>
                <MembershipCheckoutResultPage />
            </MemoryRouter>
        );

        expect(screen.queryByText("Solo disponible para el administrador")).not.toBeInTheDocument();
    });
});
