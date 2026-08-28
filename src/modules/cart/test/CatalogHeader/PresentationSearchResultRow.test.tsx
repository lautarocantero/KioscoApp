import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { PresentationRow } from "@typings/cart/cartTypes";
import PresentationSearchResultRow from "../../components/CatalogHeader/PresentationSearchResultRow";

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
  presentationData: {} as PresentationRow["presentationData"],
  ...overrides,
});

describe("PresentationSearchResultRow", () => {
  it("muestra producto, presentación, categoría y sku", () => {
    render(<PresentationSearchResultRow row={row()} isHighlighted={false} onSelect={vi.fn()} onMouseEnter={vi.fn()} />);
    expect(screen.getByText("Coca Cola · Botella, 500")).toBeInTheDocument();
    expect(screen.getByText("Bebidas")).toBeInTheDocument();
  });

  it("llama a onSelect al hacer click en la fila", async () => {
    const onSelect = vi.fn();
    render(<PresentationSearchResultRow row={row()} isHighlighted={false} onSelect={onSelect} onMouseEnter={vi.fn()} />);
    await userEvent.click(screen.getByRole("option"));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ key: "prod-1:pres-1" }));
  });

  it("deshabilita el botón + cuando no hay stock y no es venta por peso", async () => {
    const onSelect = vi.fn();
    render(
      <PresentationSearchResultRow row={row({ stock: 0 })} isHighlighted={false} onSelect={onSelect} onMouseEnter={vi.fn()} />
    );

    const addButton = screen.getByRole("button");
    expect(addButton).toBeDisabled();

    await userEvent.click(screen.getByRole("option"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("no deshabilita cuando es venta por peso aunque el stock sea 0", () => {
    render(
      <PresentationSearchResultRow row={row({ stock: 0, isWeight: true })} isHighlighted={false} onSelect={vi.fn()} onMouseEnter={vi.fn()} />
    );
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("marca aria-selected cuando está resaltada por teclado", () => {
    render(<PresentationSearchResultRow row={row()} isHighlighted onSelect={vi.fn()} onMouseEnter={vi.fn()} />);
    expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "true");
  });
});
