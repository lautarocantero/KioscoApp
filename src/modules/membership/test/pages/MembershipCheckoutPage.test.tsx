import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MembershipCheckoutPage from "../../pages/MembershipCheckoutPage";
import { useMembershipCheckoutPage } from "../../../../hooks/membership/useMembershipCheckoutPage";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

vi.mock("../../../../hooks/membership/useMembershipCheckoutPage", () => ({
    useMembershipCheckoutPage: vi.fn(),
}));

const mockedUseMembershipCheckoutPage = vi.mocked(useMembershipCheckoutPage);

const baseReturn = {
    plan: null,
    planDefinition: null,
    loading: false,
    error: null,
    isSubmitting: false,
    checkoutError: null,
    pay: vi.fn(),
};

describe("MembershipCheckoutPage — acceso admin-only", () => {
    it("seller (no admin): muestra el aviso de acceso restringido, no el resumen de pago", () => {
        mockedUseMembershipCheckoutPage.mockReturnValue({ ...baseReturn, isAdmin: false });

        renderWithTheme(
            <MemoryRouter>
                <MembershipCheckoutPage />
            </MemoryRouter>
        );

        expect(screen.getByText("Solo disponible para el administrador")).toBeInTheDocument();
        expect(screen.queryByTestId("membership-checkout-pay-button")).not.toBeInTheDocument();
    });

    it("admin: no muestra el aviso de acceso restringido", () => {
        mockedUseMembershipCheckoutPage.mockReturnValue({ ...baseReturn, isAdmin: true });

        renderWithTheme(
            <MemoryRouter>
                <MembershipCheckoutPage />
            </MemoryRouter>
        );

        expect(screen.queryByText("Solo disponible para el administrador")).not.toBeInTheDocument();
    });
});
