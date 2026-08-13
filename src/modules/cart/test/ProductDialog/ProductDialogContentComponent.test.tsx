import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ProductDialogContentComponent from "../../components/ProductDialog/ProductDialogContentComponent";

vi.mock("../../components/ProductDialog/ProductDialogImageComponent", () => ({
  default: ({ product }: { product: { name: string } }) => (
    <div data-testid="dialog-image">{product.name}</div>
  ),
}));
vi.mock("../../components/ProductDialog/ProductDialogMainContent", () => ({
  default: ({ product }: { product: { name: string } }) => (
    <div data-testid="dialog-main-content">{product.name}</div>
  ),
}));

describe("ProductDialogContentComponent", () => {
  it("renderiza imagen y contenido del producto seleccionado", () => {
    const product = { _id: "1", name: "Producto prueba" } as any;

    renderWithTheme(
      <ProductDialogContentComponent product={product} products={[]} />
    );

    expect(screen.getByTestId("dialog-image")).toHaveTextContent("Producto prueba");
    expect(screen.getByTestId("dialog-main-content")).toHaveTextContent("Producto prueba");
  });
});
