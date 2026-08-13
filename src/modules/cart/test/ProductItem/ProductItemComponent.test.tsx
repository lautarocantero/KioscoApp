import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ProductItemComponent from "../../components/ProductItem/ProductItemComponent";
import { useProductItem } from "@hooks/cart/useProductItem";

vi.mock("@hooks/cart/useProductItem");
vi.mock("../../components/ProductItem/ProductItemImage", () => ({
  default: ({ name }: { name?: string }) => <div data-testid="product-item-image">{name}</div>,
}));
vi.mock("../../components/ProductItem/ProductItemData", () => ({
  default: ({ name }: { name: string }) => <div data-testid="product-item-data">{name}</div>,
}));
vi.mock("../../components/ProductItem/ProductItemButton", () => ({
  default: ({ onClick }: { onClick?: () => void }) => (
    <button data-testid="product-item-button" onClick={onClick}>Agregar</button>
  ),
}));

const mockedUseProductItem = vi.mocked(useProductItem);

describe("ProductItemComponent", () => {
  it("renderiza la imagen, datos y botón del producto", () => {
    mockedUseProductItem.mockReturnValue({
      handleSelect: vi.fn(),
    } as any);

    const product = {
      _id: "1",
      name: "Coca Cola",
      presentations: [],
      image_url: "/img/coca.png",
    } as any;

    renderWithTheme(<ProductItemComponent product={product} />);

    expect(screen.getByTestId("product-item-image")).toHaveTextContent("Coca Cola");
    expect(screen.getByTestId("product-item-data")).toHaveTextContent("Coca Cola");
    expect(screen.getByTestId("product-item-button")).toHaveTextContent("Agregar");
  });
});
