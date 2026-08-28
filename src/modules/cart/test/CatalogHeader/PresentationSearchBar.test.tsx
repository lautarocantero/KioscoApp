import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { PresentationSearchBarProps } from "@typings/cart/cartComponentTypes";
import type { PresentationRow } from "@typings/cart/cartTypes";
import PresentationSearchBar from "../../components/CatalogHeader/PresentationSearchBar";

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

const buildSearch = (
  overrides: Partial<PresentationSearchBarProps["search"]> = {}
): PresentationSearchBarProps["search"] => ({
  query: "",
  onQueryChange: vi.fn(),
  results: [],
  highlightedIndex: 0,
  isOpen: false,
  onKeyDown: vi.fn(),
  onHighlight: vi.fn(),
  onSelect: vi.fn(),
  onClear: vi.fn(),
  ...overrides,
});

describe("PresentationSearchBar", () => {
  it("no muestra el dropdown cuando isOpen es false", () => {
    render(<PresentationSearchBar search={buildSearch()} />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("muestra los resultados cuando isOpen es true", () => {
    render(<PresentationSearchBar search={buildSearch({ isOpen: true, query: "coca", results: [row()] })} />);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Coca Cola · Botella, 500")).toBeInTheDocument();
  });

  it("muestra el mensaje de 'sin resultados' cuando no hay filas", () => {
    render(<PresentationSearchBar search={buildSearch({ isOpen: true, query: "xyz", results: [] })} />);
    expect(screen.getByText("No se encontraron presentaciones")).toBeInTheDocument();
  });

  it("dispara onQueryChange al tipear", async () => {
    const search = buildSearch();
    render(<PresentationSearchBar search={search} />);
    await userEvent.type(screen.getByRole("combobox"), "c");
    expect(search.onQueryChange).toHaveBeenCalled();
  });

  it("muestra el botón de limpiar solo cuando hay query", () => {
    const { rerender } = render(<PresentationSearchBar search={buildSearch({ query: "" })} />);
    expect(screen.queryByLabelText("Limpiar búsqueda")).not.toBeInTheDocument();

    rerender(<PresentationSearchBar search={buildSearch({ query: "coca" })} />);
    expect(screen.getByLabelText("Limpiar búsqueda")).toBeInTheDocument();
  });
});
