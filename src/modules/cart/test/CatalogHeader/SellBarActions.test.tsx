import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SellBarActions from "../../components/CatalogHeader/SellBarActions";
import { useSellbar } from "@hooks/cart/useSellBar";
import { usePresentationSearch } from "@hooks/cart/usePresentationSearch";
import type { BarcodeButtonComponentProps, PresentationSearchBarProps } from "@typings/cart/cartComponentTypes";

vi.mock("@hooks/cart/useSellBar");
vi.mock("@hooks/cart/usePresentationSearch");

vi.mock("../../components/CatalogHeader/BarcodeButtonComponent", () => ({
  default: (props: BarcodeButtonComponentProps) => <div data-testid="barcode-btn">{JSON.stringify(!!props.barcode)}</div>,
}));
vi.mock("../../components/CatalogHeader/PresentationSearchBar", () => ({
  default: (props: PresentationSearchBarProps) => <div data-testid="presentation-search-bar">{JSON.stringify(!!props.search)}</div>,
}));

const mockedUseSellbar = vi.mocked(useSellbar);
const mockedUsePresentationSearch = vi.mocked(usePresentationSearch);

describe("SellBarActions", () => {
  beforeEach(() => {
    mockedUseSellbar.mockReturnValue({
      barcode: {
        showBarcodeInput: false,
        value: "",
        inputRef: { current: null },
        toggleShowInput: vi.fn(),
        onChange: vi.fn(),
        onKeyDown: vi.fn(),
      },
    });

    mockedUsePresentationSearch.mockReturnValue({
      query: "",
      onQueryChange: vi.fn(),
      results: [],
      highlightedIndex: 0,
      isOpen: false,
      onKeyDown: vi.fn(),
      onHighlight: vi.fn(),
      onSelect: vi.fn(),
      onClear: vi.fn(),
    });
  });

  it("renderiza el buscador de presentaciones y el escáner", () => {
    render(<SellBarActions />);
    expect(screen.getByTestId("presentation-search-bar")).toHaveTextContent("true");
    expect(screen.getByTestId("barcode-btn")).toHaveTextContent("true");
  });
});
