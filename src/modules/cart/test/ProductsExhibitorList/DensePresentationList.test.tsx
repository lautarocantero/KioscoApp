import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import DensePresentationList from "../../components/ProductsExhibitorList/DensePresentationList";
import type { PresentationRow } from "@typings/cart/cartTypes";

vi.mock("../../components/ProductsExhibitorList/DensePresentationRow", () => ({
  default: ({ row }: { row: { key: string } }) => (
    <tr data-testid="dense-row">
      <td>{row.key}</td>
    </tr>
  ),
}));

const row = (key: string): PresentationRow => ({ key } as unknown as PresentationRow);

describe("DensePresentationList", () => {
  it("muestra el mensaje vacío sin presentaciones", () => {
    renderWithTheme(<DensePresentationList rows={[]} onAdd={vi.fn()} />);
    expect(screen.getByText("No hay presentaciones")).toBeInTheDocument();
  });

  it("renderiza una fila por presentación con los headers de columna", () => {
    renderWithTheme(<DensePresentationList rows={[row("1"), row("2")]} onAdd={vi.fn()} />);
    expect(screen.getAllByTestId("dense-row")).toHaveLength(2);
    expect(screen.getByText("Producto")).toBeInTheDocument();
    expect(screen.getByText("SKU")).toBeInTheDocument();
  });
});
