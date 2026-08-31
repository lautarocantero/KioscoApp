import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartSummaryCardComponent from "../../components/CartComponent/CartSumaryCardComponent";

vi.mock("../../components/CartComponent/CartSellDataComponent", () => ({
  default: () => <div data-testid="cart-sell-data" />,
}));
vi.mock("../../components/CartComponent/CartPaymentMethod", () => ({
  default: () => <div data-testid="cart-payment-method" />,
}));
vi.mock("../../components/CartComponent/CartPaymentStatus", () => ({
  default: () => <div data-testid="cart-payment-status" />,
}));
vi.mock("../../components/CartComponent/CartSummaryFooter", () => ({
  default: () => <div data-testid="cart-summary-footer" />,
}));

describe("CartSummaryCardComponent", () => {
  it("renderiza la banda de totales y el pie fijo como hermanos (no anidados)", () => {
    renderWithTheme(
      <CartSummaryCardComponent
        onGenerateTicket={vi.fn()}
        productsTotalPrice={100}
        discountAmount={0}
        globalDiscount="0"
        onGlobalDiscountChange={vi.fn()}
        note=""
        onNoteChange={vi.fn()}
        ivaPercentage={21}
        ivaAmount={21}
        total={121}
      />
    );

    expect(screen.getByTestId("cart-sell-data")).toBeInTheDocument();
    expect(screen.getByTestId("cart-payment-method")).toBeInTheDocument();
    expect(screen.getByTestId("cart-payment-status")).toBeInTheDocument();
    expect(screen.getByTestId("cart-summary-footer")).toBeInTheDocument();
  });
});
