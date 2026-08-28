import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartLineItem from "../../components/CartComponent/CartLineItem";
import type { ProductTicketWithStockType } from "@typings/sells/sellTypes";

vi.mock("../../components/CartComponent/CartProductRowActionCell", () => ({
  default: ({ product }: { product: { _id: string } }) => <div data-testid="remove-cell">{product._id}</div>,
}));

const buildProduct = (overrides: Partial<ProductTicketWithStockType> = {}): ProductTicketWithStockType => ({
  _id: "1",
  sku: "SKU-1",
  name: "Coca Cola",
  description: "",
  brand: "",
  model_type: "bottle",
  model_size: 500,
  price: 100,
  expiration_date: "",
  image_url: "",
  stock_required: 2,
  sale_type: "unit" as ProductTicketWithStockType["sale_type"],
  product_id: "prod-1",
  stock: 10,
  subtotal: 200,
  ...overrides,
});

describe("CartLineItem", () => {
  it("muestra nombre, variante y precio unitario", () => {
    renderWithTheme(
      <CartLineItem product={buildProduct()} onIncrease={vi.fn()} onDecrease={vi.fn()} onSubtotalChange={vi.fn()} onQuantityChange={vi.fn()} />
    );
    expect(screen.getByText("Coca Cola")).toBeInTheDocument();
  });

  it("muestra stepper +/- para venta por unidad y llama a onIncrease/onDecrease", async () => {
    const onIncrease = vi.fn();
    const onDecrease = vi.fn();
    renderWithTheme(
      <CartLineItem product={buildProduct()} onIncrease={onIncrease} onDecrease={onDecrease} onSubtotalChange={vi.fn()} onQuantityChange={vi.fn()} />
    );

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);

    expect(onDecrease).toHaveBeenCalledWith("1");
    expect(onIncrease).toHaveBeenCalledWith("1");
  });

  it("muestra input editable de gramos (no stepper) para venta por peso", () => {
    renderWithTheme(
      <CartLineItem
        product={buildProduct({ sale_type: "weight" as ProductTicketWithStockType["sale_type"], stock_required: 300 })}
        onIncrease={vi.fn()}
        onDecrease={vi.fn()}
        onSubtotalChange={vi.fn()}
        onQuantityChange={vi.fn()}
      />
    );

    expect(screen.getByText("g")).toBeInTheDocument();
  });

  it("delega la eliminación en CartProductRowActionCell", () => {
    renderWithTheme(
      <CartLineItem product={buildProduct({ _id: "42" })} onIncrease={vi.fn()} onDecrease={vi.fn()} onSubtotalChange={vi.fn()} onQuantityChange={vi.fn()} />
    );
    expect(screen.getByTestId("remove-cell")).toHaveTextContent("42");
  });
});
