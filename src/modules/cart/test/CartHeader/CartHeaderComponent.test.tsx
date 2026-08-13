import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartHeaderComponent from "../../components/CartHeader/CartHeaderComponent";

vi.mock("../../components/CartHeader/CartLabelComponent", () => ({
  default: ({ itemsCount }: { itemsCount: number }) => (
    <div data-testid="cart-label">Label:{itemsCount}</div>
  ),
}));
vi.mock("../../components/CartHeader/CartHeaderActions", () => ({
  default: ({ itemsCount, onClearCart }: { itemsCount: number; onClearCart: () => void }) => (
    <button data-testid="cart-header-actions" onClick={onClearCart}>Actions:{itemsCount}</button>
  ),
}));

describe("CartHeaderComponent", () => {
  it("renderiza el label y las acciones del carrito", () => {
    const onClearCart = vi.fn();

    renderWithTheme(<CartHeaderComponent itemsCount={3} onClearCart={onClearCart} />);

    expect(screen.getByTestId("cart-label")).toHaveTextContent("Label:3");
    expect(screen.getByTestId("cart-header-actions")).toHaveTextContent("Actions:3");
  });
});
