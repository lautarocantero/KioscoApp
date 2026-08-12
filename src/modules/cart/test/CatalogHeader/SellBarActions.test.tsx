import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useSellbar } from "@hooks/sellers/useSellBar";
import SellBarActions from "../../components/CatalogHeader/SellBarActions";

vi.mock("@hooks/sellers/useSellBar");

vi.mock("../../components/CatalogHeader/BarcodeButtonComponent", () => ({
  default: (props: any) => <div data-testid="barcode-btn">{JSON.stringify(!!props.barcode)}</div>,
}));
vi.mock("../../components/CatalogHeader/SellBarFilter", () => ({
  default: (props: any) => <div data-testid="sellbar-filter">{JSON.stringify(!!props.categories)}</div>,
}));
vi.mock("../../components/CatalogHeader/CartButtonComponent", () => ({
  default: (props: any) => <div data-testid="cart-btn">{JSON.stringify(!!props.cart)}</div>,
}));
vi.mock("../../components/CatalogHeader/SellBarSearch", () => ({
  default: (props: any) => <div data-testid="sellbar-search">{JSON.stringify(!!props.search)}</div>,
}));

const mockedUseSellbar = vi.mocked(useSellbar);

describe("SellBarActions", () => {
  beforeEach(() => {
    mockedUseSellbar.mockReturnValue({
      search: {
        value: "",
        onChange: vi.fn(),
        onClear: vi.fn(),
        exactMatch: false,
        onToggleExactMatch: vi.fn(),
      },
      barcode: {
        showBarcodeInput: false,
        value: "",
        inputRef: { current: null },
        toggleShowInput: vi.fn(),
        onChange: vi.fn(),
        onKeyDown: vi.fn(),
      },
      cart: { count: 0, goToCart: vi.fn() },
      categories: {
        list: [],
        isLoading: false,
        selected: null,
        selectedLabel: null,
        getLabel: vi.fn(),
        anchorEl: null,
        isMenuOpen: false,
        onOpenMenu: vi.fn(),
        onCloseMenu: vi.fn(),
        onSelect: vi.fn(),
      },
    });
  });

  it("renderiza las secciones de búsqueda y acciones rápidas con los datos del hook", () => {
    render(<SellBarActions />);
    expect(screen.getByText("Búsqueda")).toBeInTheDocument();
    expect(screen.getByText("Acciones rápidas")).toBeInTheDocument();
    expect(screen.getByTestId("sellbar-search")).toHaveTextContent("true");
    expect(screen.getByTestId("barcode-btn")).toHaveTextContent("true");
    expect(screen.getByTestId("sellbar-filter")).toHaveTextContent("true");
    expect(screen.getByTestId("cart-btn")).toHaveTextContent("true");
  });
});