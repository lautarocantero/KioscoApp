import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartLineItem from "../../components/CartComponent/CartLineItem";
import { formatCurrency } from "../../helpers/formatCurrency";
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

const handlers = { onIncrease: vi.fn(), onDecrease: vi.fn(), onItemDiscountChange: vi.fn() };

describe("CartLineItem", () => {
  it("muestra nombre, variante y precio unitario", () => {
    renderWithTheme(<CartLineItem product={buildProduct()} {...handlers} />);
    expect(screen.getByText("Coca Cola")).toBeInTheDocument();
  });

  it("muestra el stepper +/- para venta por unidad y llama a onIncrease/onDecrease", async () => {
    const onIncrease = vi.fn();
    const onDecrease = vi.fn();
    renderWithTheme(<CartLineItem product={buildProduct()} {...handlers} onIncrease={onIncrease} onDecrease={onDecrease} />);

    await userEvent.click(screen.getByLabelText("Restar"));
    await userEvent.click(screen.getByLabelText("Sumar"));

    expect(onDecrease).toHaveBeenCalledWith("1");
    expect(onIncrease).toHaveBeenCalledWith("1");
  });

  it("muestra la cantidad en gramos para venta por peso, con el mismo stepper", () => {
    renderWithTheme(
      <CartLineItem
        product={buildProduct({ sale_type: "weight" as ProductTicketWithStockType["sale_type"], stock_required: 300 })}
        {...handlers}
      />
    );

    expect(screen.getByText("300 g")).toBeInTheDocument();
  });

  it("agrega el sufijo /100 g al precio para venta por peso", () => {
    renderWithTheme(
      <CartLineItem
        product={buildProduct({ sale_type: "weight" as ProductTicketWithStockType["sale_type"], price: 1180 })}
        {...handlers}
      />
    );

    const expectedText = `Botella, 500 · ${formatCurrency(1180)} /100 g`;
    expect(screen.getByText((_, node) => node?.textContent === expectedText)).toBeInTheDocument();
  });

  it("llama a onItemDiscountChange al tipear en el input de descuento", async () => {
    const onItemDiscountChange = vi.fn();
    renderWithTheme(<CartLineItem product={buildProduct({ _id: "1" })} {...handlers} onItemDiscountChange={onItemDiscountChange} />);

    await userEvent.type(screen.getByRole("textbox", { name: "Descuento por ítem" }), "5");

    expect(onItemDiscountChange).toHaveBeenCalledWith("1", "5");
  });

  it("delega la eliminación en CartProductRowActionCell", () => {
    renderWithTheme(<CartLineItem product={buildProduct({ _id: "42" })} {...handlers} />);
    expect(screen.getByTestId("remove-cell")).toHaveTextContent("42");
  });
});
