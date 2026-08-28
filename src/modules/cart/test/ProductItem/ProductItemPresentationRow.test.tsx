import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ProductItemPresentationRow from "../../components/ProductItem/ProductItemPresentationRow";
import type { Presentation } from "@typings/presentation/presentationTypes";

const presentation = (overrides: Partial<Presentation> = {}): Presentation => ({
  _id: "pres-1",
  brand: "",
  category: [],
  created_at: "",
  description: "",
  expiration_date: "",
  image_url: "",
  min_stock: 5,
  model_size: 500,
  model_type: "bottle",
  model_unit: "ml" as Presentation["model_unit"],
  name: "Coca Cola 500ml",
  price: 100,
  product_id: "prod-1",
  barcode: "",
  sku: "SKU-1",
  stock: 20,
  updated_at: "",
  is_perishable: false,
  sale_type: "unit" as Presentation["sale_type"],
  ...overrides,
});

describe("ProductItemPresentationRow", () => {
  it("llama a onAdd con la presentación al clickear +", async () => {
    const onAdd = vi.fn();
    renderWithTheme(<ProductItemPresentationRow presentation={presentation()} onAdd={onAdd} />);

    await userEvent.click(screen.getByRole("button"));

    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ _id: "pres-1" }));
  });

  it("deshabilita el botón + sin stock y sin ser venta por peso", () => {
    renderWithTheme(<ProductItemPresentationRow presentation={presentation({ stock: 0 })} onAdd={vi.fn()} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("no deshabilita el botón + para venta por peso aunque el stock sea 0", () => {
    renderWithTheme(
      <ProductItemPresentationRow presentation={presentation({ stock: 0, sale_type: "weight" as Presentation["sale_type"] })} onAdd={vi.fn()} />
    );
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
