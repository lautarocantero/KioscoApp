import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartComponent from "../../components/CartComponent/CartComponent";
import { useCart } from "@hooks/cart/useCart";

vi.mock("@hooks/cart/useCart");
vi.mock("@hooks/cart/useMascotEyeTracking", () => ({
  useMascotEyeTracking: () => ({ containerRef: { current: null }, eyeOffset: { x: 0, y: 0 } }),
}));
vi.mock("@hooks/cart/useCartClearAnimation", () => ({
  useCartClearAnimation: () => ({
    phase: "idle",
    bagStyle: { transform: "none", opacity: 1, transitionDuration: "0s" },
    handStyle: { transform: "translate(220px, -310px) rotate(14deg)", opacity: 0 },
    handlesStyle: { transform: "none" },
    runBagAnimation: (onCleared: () => void) => onCleared(),
  }),
}));
vi.mock("../../components/CartHeader/CartHeaderComponent", () => ({
  default: ({ itemsCount, onClearCart }: { itemsCount: number; onClearCart: () => void }) => (
    <button type="button" data-testid="cart-header-component" onClick={onClearCart}>
      Header:{itemsCount}
    </button>
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
vi.mock("../../components/CartComponent/CartBagHandles", () => ({
  default: () => <div data-testid="cart-bag-handles" />,
}));
vi.mock("../../components/CartComponent/CartHandGrab", () => ({
  default: () => <div data-testid="cart-hand-grab" />,
}));
vi.mock("../../components/CartComponent/CartMascotFace", () => ({
  default: ({ opacity }: { opacity: number }) => <div data-testid="cart-mascot-face">{opacity}</div>,
}));
vi.mock("../../components/SaleConfirmed/SaleConfirmedModal", () => ({
  default: () => <div data-testid="sale-confirmed-modal" />,
}));
vi.mock("../../components/SaleConfirmed/SaleConfirmedFlashOverlay", () => ({
  default: ({ open }: { open: boolean }) => <div data-testid="sale-confirmed-flash">{String(open)}</div>,
}));

const mockedUseCart = vi.mocked(useCart);

const baseCartReturn = {
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
};

describe("CartComponent", () => {
  it("renderiza el header, la lista de items, la mascota y el resumen del carrito cuando hay ítems", () => {
    mockedUseCart.mockReturnValue({
      ...baseCartReturn,
      cart: [{ _id: "1" }, { _id: "2" }],
    } as unknown as ReturnType<typeof useCart>);

    renderWithTheme(<CartComponent />);

    expect(screen.getByTestId("cart-header-component")).toHaveTextContent("Header:2");
    expect(screen.getByTestId("cart-items-list")).toHaveTextContent("Items:2");
    expect(screen.getByTestId("cart-hand-grab")).toBeInTheDocument();
    expect(screen.getByTestId("cart-bag-handles")).toBeInTheDocument();
    expect(screen.getByTestId("cart-mascot-face")).toHaveTextContent("0.07");
    expect(screen.getByTestId("cart-summary-card")).toBeInTheDocument();
    expect(screen.getByTestId("sale-confirmed-flash")).toHaveTextContent("false");
  });

  it("dispara handleClearCart (vía la animación de la bolsa) al vaciar el carrito", async () => {
    const handleClearCart = vi.fn();
    mockedUseCart.mockReturnValue({
      ...baseCartReturn,
      handleClearCart,
      cart: [{ _id: "1" }],
    } as unknown as ReturnType<typeof useCart>);

    renderWithTheme(<CartComponent />);

    await userEvent.click(screen.getByTestId("cart-header-component"));

    expect(handleClearCart).toHaveBeenCalledTimes(1);
  });

  it("oculta el resumen de pago/footer y muestra la mascota a pleno cuando el carrito está vacío", () => {
    mockedUseCart.mockReturnValue({
      ...baseCartReturn,
      cart: [],
    } as unknown as ReturnType<typeof useCart>);

    renderWithTheme(<CartComponent />);

    expect(screen.getByTestId("cart-header-component")).toHaveTextContent("Header:0");
    expect(screen.getByTestId("cart-mascot-face")).toHaveTextContent("1");
    expect(screen.queryByTestId("cart-summary-card")).not.toBeInTheDocument();
  });
});
