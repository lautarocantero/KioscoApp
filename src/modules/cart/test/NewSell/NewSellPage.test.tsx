import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import NewSellPage from "../../pages/NewSell/NewSellPage";
import { useSellShortcuts } from "@hooks/cart/useSellShortcuts";

vi.mock("@hooks/cart/useSellShortcuts");
vi.mock("../../components/CatalogHeader/CatalogHeader", () => ({
  default: () => <div data-testid="catalog-header" />,
}));
vi.mock("../../components/ProductsExhibitorList/ProductsExhibitorComponent", () => ({
  default: () => <div data-testid="products-exhibitor" />,
}));
vi.mock("../../components/CartComponent/CartComponent", () => ({
  default: () => <div data-testid="cart-component" />,
}));
vi.mock("../../components/ProductDialog/ProductDialog", () => ({
  default: () => <div data-testid="product-dialog" />,
}));

const mockedUseSellShortcuts = vi.mocked(useSellShortcuts);

describe("NewSellPage", () => {
  it("registra los atajos globales y renderiza catálogo + carrito lado a lado", () => {
    renderWithTheme(<NewSellPage />);

    expect(mockedUseSellShortcuts).toHaveBeenCalled();
    expect(screen.getByTestId("catalog-header")).toBeInTheDocument();
    expect(screen.getByTestId("products-exhibitor")).toBeInTheDocument();
    expect(screen.getByTestId("cart-component")).toBeInTheDocument();
    expect(screen.getByTestId("product-dialog")).toBeInTheDocument();
  });
});
