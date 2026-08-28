import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ProductItemComponent from "../../components/ProductItem/ProductItemComponent";
import { useProductItem } from "@hooks/cart/useProductItem";
import type { Product } from "@typings/product/productTypes";

vi.mock("@hooks/cart/useProductItem");
vi.mock("../../components/ProductItem/ProductItemAvatar", () => ({
  default: ({ name }: { name?: string }) => <div data-testid="product-item-avatar">{name}</div>,
}));
vi.mock("../../components/ProductItem/ProductItemData", () => ({
  default: ({ presentations }: { presentations: unknown[] }) => (
    <div data-testid="product-item-data">{presentations.length}</div>
  ),
}));

const mockedUseProductItem = vi.mocked(useProductItem);

const product = {
  _id: "1",
  name: "Coca Cola",
  presentations: [{ _id: "p1" }],
  image_url: "/img/coca.png",
} as unknown as Product;

describe("ProductItemComponent", () => {
  it("renderiza el avatar y los datos del producto", () => {
    mockedUseProductItem.mockReturnValue({
      handleSelect: vi.fn(),
      handleAddPresentation: vi.fn(),
    });

    renderWithTheme(<ProductItemComponent product={product} />);

    expect(screen.getByTestId("product-item-avatar")).toHaveTextContent("Coca Cola");
    expect(screen.getByTestId("product-item-data")).toHaveTextContent("1");
    expect(screen.getAllByText("Coca Cola").length).toBeGreaterThan(0);
  });

  it("llama a handleSelect al hacer click en el header (avatar + nombre)", async () => {
    const handleSelect = vi.fn();
    mockedUseProductItem.mockReturnValue({ handleSelect, handleAddPresentation: vi.fn() });

    renderWithTheme(<ProductItemComponent product={product} />);
    await userEvent.click(screen.getByRole("button", { name: "Ver detalle de Coca Cola" }));

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
