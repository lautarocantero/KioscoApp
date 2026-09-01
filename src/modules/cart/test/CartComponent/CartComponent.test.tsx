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
vi.mock("../../components/CartComponent/CartItemsList", () => ({
  default: ({ cart }: { cart: unknown[] }) => (
    <div data-testid="cart-items-list">Items:{cart.length}</div>
  ),
}));
vi.mock("../../components/CartComponent/CartSumaryCardComponent", () => ({
  default: () => <div data-testid="cart-summary-card" />,
}));
vi.mock("../../components/SaleConfirmed/SaleConfirmedModal", () => ({
  default: () => <div data-testid="sale-confirmed-modal" />,
}));

const mockedUseCart = vi.mocked(useCart);

describe("CartComponent", () => {
  it("renderiza el header, la lista de items y el resumen del carrito", () => {
    mockedUseCart.mockReturnValue({
      cart: [{ _id: "1" }, { _id: "2" }],
      productsTotalPrice: 120,
      discountAmount: 0,
      globalDiscount: "0",
      note: "",
      ivaPercentage: 21,
      ivaAmount: 25.2,
      total: 145.2,
      generateTicket: vi.fn(),
      handleClearCart: vi.fn(),
      handleIncreaseProduct: vi.fn(),
      handleDecreaseProduct: vi.fn(),
      handleItemDiscountChange: vi.fn(),
      handleGlobalDiscountChange: vi.fn(),
      handleNoteChange: vi.fn(),
      ticketSummary: null,
      printTicket: vi.fn(),
      goToTicketDetail: vi.fn(),
      totalUnits: 2,
      paymentMethodRef: { current: null },
      isSaleConfirmedModalOpen: false,
      saleConfirmedModalProgress: 100,
      saleConfirmedModalRemainingSeconds: 4,
      isSaleConfirmedModalPaused: false,
      closeSaleConfirmedModal: vi.fn(),
      pauseSaleConfirmedModal: vi.fn(),
      resumeSaleConfirmedModal: vi.fn(),
    } as unknown as ReturnType<typeof useCart>);

    renderWithTheme(<CartComponent />);

    expect(screen.getByTestId("cart-header-component")).toHaveTextContent("Header:2");
    expect(screen.getByTestId("cart-items-list")).toHaveTextContent("Items:2");
    expect(screen.getByTestId("cart-summary-card")).toBeInTheDocument();
  });
});
