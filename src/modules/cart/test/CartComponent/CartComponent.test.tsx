import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartComponent from "../../components/CartComponent/CartComponent";
import { useCart } from "@hooks/cart/useCart";

vi.mock("@hooks/cart/useCart");
vi.mock("../../components/CartHeader/CartHeaderComponent", () => ({
  default: ({ itemsCount }: { itemsCount: number }) => (
    <div data-testid="cart-header-component">Header:{itemsCount}</div>
  ),
}));
vi.mock("../../components/CartComponent/CartProductTableComponent", () => ({
  default: ({ cart }: { cart: unknown[] }) => (
    <div data-testid="cart-table-component">Table:{cart.length}</div>
  ),
}));
vi.mock("../../components/CartComponent/CartSumaryCardComponent", () => ({
  default: () => <div data-testid="cart-summary-card" />,
}));

const mockedUseCart = vi.mocked(useCart);

describe("CartComponent", () => {
  it("renderiza el header, la tabla y el resumen del carrito", () => {
    mockedUseCart.mockReturnValue({
      cart: [{ _id: "1" }, { _id: "2" }],
      productsTotalPrice: 120,
      ivaPercentage: 21,
      ivaAmount: 25.2,
      total: 145.2,
      generateTicket: vi.fn(),
      handleClearCart: vi.fn(),
      goBackToSell: vi.fn(),
      columns: [],
      ticketSummary: null,
      printTicket: vi.fn(),
      goToNewSell: vi.fn(),
      goToTicketDetail: vi.fn(),
      totalUnits: 2,
      paymentMethodRef: { current: null },
    } as any);

    renderWithTheme(<CartComponent />);

    expect(screen.getByTestId("cart-header-component")).toHaveTextContent("Header:2");
    expect(screen.getByTestId("cart-table-component")).toHaveTextContent("Table:2");
    expect(screen.getByTestId("cart-summary-card")).toBeInTheDocument();
  });
});