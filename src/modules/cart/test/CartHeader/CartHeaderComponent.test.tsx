import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartHeaderComponent from "../../components/CartHeader/CartHeaderComponent";

vi.mock("../../components/CartHeader/CartLabelComponent", () => ({
  default: () => <div data-testid="cart-label" />,
}));
vi.mock("../../components/CartHeader/CartCountBadgeComponent", () => ({
  default: ({ itemsCount }: { itemsCount: number }) => (
    <div data-testid="cart-count-badge">Badge:{itemsCount}</div>
  ),
}));
vi.mock("../../components/CartHeader/CartHeaderActions", () => ({
  default: ({ itemsCount, onClearCart }: { itemsCount: number; onClearCart: () => void }) => (
    <button data-testid="cart-header-actions" onClick={onClearCart}>Actions:{itemsCount}</button>
  ),
}));

describe("CartHeaderComponent", () => {
  it("renderiza el label, el badge y las acciones del carrito", () => {
    const onClearCart = vi.fn();

    renderWithTheme(<CartHeaderComponent itemsCount={3} onClearCart={onClearCart} />);

    expect(screen.getByTestId("cart-label")).toBeInTheDocument();
    expect(screen.getByTestId("cart-count-badge")).toHaveTextContent("Badge:3");
    expect(screen.getByTestId("cart-header-actions")).toHaveTextContent("Actions:3");
  });
});
