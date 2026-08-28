import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartItemsList from "../../components/CartComponent/CartItemsList";
import type { ProductTicketWithStockType } from "@typings/sells/sellTypes";

vi.mock("../../components/CartComponent/CartLineItem", () => ({
  default: ({ product }: { product: { _id: string } }) => <li data-testid="cart-line-item">{product._id}</li>,
}));
vi.mock("../../components/CartComponent/EmptyCartComponent", () => ({
  default: () => <div data-testid="cart-empty" />,
}));

const product = (id: string): ProductTicketWithStockType => ({
  _id: id,
  sku: "SKU",
  name: "Producto",
  description: "",
  brand: "",
  model_type: "bottle",
  model_size: 500,
  price: 100,
  expiration_date: "",
  image_url: "",
  stock_required: 1,
  sale_type: "unit" as ProductTicketWithStockType["sale_type"],
  product_id: "prod-1",
  stock: 10,
});

const handlers = { onIncrease: vi.fn(), onDecrease: vi.fn(), onSubtotalChange: vi.fn(), onQuantityChange: vi.fn() };

describe("CartItemsList", () => {
  it("muestra el estado vacío cuando el carrito no tiene items", () => {
    renderWithTheme(<CartItemsList cart={[]} {...handlers} />);
    expect(screen.getByTestId("cart-empty")).toBeInTheDocument();
  });

  it("renderiza una fila por cada producto del carrito", () => {
    renderWithTheme(<CartItemsList cart={[product("1"), product("2")]} {...handlers} />);
    expect(screen.getAllByTestId("cart-line-item")).toHaveLength(2);
  });
});
