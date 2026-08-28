import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ProductItemData from "../../components/ProductItem/ProductItemData";
import type { Presentation } from "@typings/presentation/presentationTypes";

vi.mock("../../components/ProductItem/ProductItemPresentationRow", () => ({
  default: ({ presentation }: { presentation: { _id: string } }) => (
    <li data-testid="presentation-row">{presentation._id}</li>
  ),
}));

const presentation = (id: string): Presentation =>
  ({ _id: id, name: "Coca Cola 500ml" } as unknown as Presentation);

describe("ProductItemData", () => {
  it("muestra el mensaje de 'sin presentaciones' cuando el producto no tiene ninguna", () => {
    renderWithTheme(<ProductItemData presentations={[]} onAddPresentation={vi.fn()} />);
    expect(screen.getByText("Sin presentaciones")).toBeInTheDocument();
  });

  it("renderiza una fila por presentación", () => {
    renderWithTheme(
      <ProductItemData presentations={[presentation("p1"), presentation("p2")]} onAddPresentation={vi.fn()} />
    );
    expect(screen.getAllByTestId("presentation-row")).toHaveLength(2);
  });
});
