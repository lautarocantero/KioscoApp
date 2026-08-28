import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import DensePresentationRow from "../../components/ProductsExhibitorList/DensePresentationRow";
import type { PresentationRow } from "@typings/cart/cartTypes";

const row = (overrides: Partial<PresentationRow> = {}): PresentationRow => ({
  key: "prod-1:pres-1",
  productId: "prod-1",
  presentationId: "pres-1",
  product: "Coca Cola",
  presentation: "Botella, 500",
  category: "Bebidas",
  sku: "SKU-1",
  price: 100,
  stock: 10,
  minStock: 5,
  isWeight: false,
  presentationData: { _id: "pres-1" } as PresentationRow["presentationData"],
  ...overrides,
});

const renderRow = (r: PresentationRow, onAdd = vi.fn()) =>
  renderWithTheme(
    <table>
      <tbody>
        <DensePresentationRow row={r} onAdd={onAdd} />
      </tbody>
    </table>
  );

describe("DensePresentationRow", () => {
  it("muestra producto, presentación, sku, categoría y precio", () => {
    renderRow(row());
    expect(screen.getByText("Coca Cola")).toBeInTheDocument();
    expect(screen.getByText("Botella, 500")).toBeInTheDocument();
    expect(screen.getByText("SKU-1")).toBeInTheDocument();
    expect(screen.getByText("Bebidas")).toBeInTheDocument();
  });

  it("llama a onAdd con la presentación completa al clickear +", async () => {
    const onAdd = vi.fn();
    renderRow(row(), onAdd);
    await userEvent.click(screen.getByRole("button"));
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ _id: "pres-1" }));
  });

  it("deshabilita + sin stock y sin ser venta por peso", () => {
    renderRow(row({ stock: 0 }));
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
