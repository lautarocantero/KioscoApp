// src/hooks/sellers/test/useSellbar.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useSellbar } from "../useSellBar";
import { setSearchTerm, setSelectedCategory } from "../../../store/seller/sellerSlice";
import { useSellbarCart } from "../useSellbarCart";
import { useSellbarBarcode } from "../useSellbarBarcode";
import { useSellbarCategories } from "../useSellbarCategories";
import { SnackBarContext } from "../../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import type { UseSellerBarCategoriesResult } from "@typings/seller/sellerTypes";
import { PresentationCategory } from "@typings/presentation/presentationEnum";

vi.mock("react-redux");
vi.mock("../../../store/seller/sellerSlice", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../../store/seller/sellerSlice")>();
  return {
    ...actual,
    setSearchTerm: vi.fn(actual.setSearchTerm),
    setSelectedCategory: vi.fn(actual.setSelectedCategory),
  };
});
vi.mock("../useSellbarCart");
vi.mock("../useSellbarBarcode");
vi.mock("../useSellbarCategories");

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedUseSellbarCart = vi.mocked(useSellbarCart);
const mockedUseSellbarBarcode = vi.mocked(useSellbarBarcode);
const mockedUseSellbarCategories = vi.mocked(useSellbarCategories);

const dispatch = vi.fn();
const showSnackBar = vi.fn();
const closeSnackBar = vi.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SnackBarContext.Provider
    value={{
      showSnackBar,
      closeSnackBar,
      snackBar: { open: false, message: "", color: AlertColor?.Info, },
    }}
  >
    {children}
  </SnackBarContext.Provider>
);

const buildCategories = (
  overrides: Partial<UseSellerBarCategoriesResult> = {}
): UseSellerBarCategoriesResult => ({
  list: [],
  isLoading: false,
  selected: null,
  selectedCategory: null,
  selectedLabel: null,
  getLabel: vi.fn(),
  anchorEl: null,
  isMenuOpen: false,
  onOpenMenu: vi.fn(),
  onCloseMenu: vi.fn(),
  onSelect: vi.fn(),
  ...overrides,
});

describe("useSellbar", () => {
  beforeEach(() => {
    dispatch.mockClear();
    mockedUseDispatch.mockReturnValue(dispatch);
    mockedUseSelector.mockImplementation((selectorFn: any) =>
      selectorFn({ seller: { cart: [], searchTerm: "" } })
    );
    mockedUseSellbarCart.mockReturnValue({ count: 0, goToCart: vi.fn() });
    mockedUseSellbarBarcode.mockReturnValue({
      showBarcodeInput: false,
      value: "",
      inputRef: { current: null },
      toggleShowInput: vi.fn(),
      onChange: vi.fn(),
      onKeyDown: vi.fn(),
    });
    mockedUseSellbarCategories.mockReturnValue(buildCategories());
  });

  it("despacha setSelectedCategory al montar con la categoría inicial de useSellbarCategories", () => {
    mockedUseSellbarCategories.mockReturnValue(
      buildCategories({ selected: PresentationCategory.NonAlcoholicBeverages })
    );
    renderHook(() => useSellbar(), { wrapper });
    expect(dispatch).toHaveBeenCalledWith(setSelectedCategory(PresentationCategory.NonAlcoholicBeverages));
  });

  it("vuelve a despachar setSelectedCategory cuando cambia la categoría seleccionada", () => {
    mockedUseSellbarCategories.mockReturnValue(buildCategories({ selected: null }));
    const { rerender } = renderHook(() => useSellbar(), { wrapper });
    dispatch.mockClear();

    mockedUseSellbarCategories.mockReturnValue(
      buildCategories({ selected: PresentationCategory.Dairy })
    );
    rerender();

    expect(dispatch).toHaveBeenCalledWith(setSelectedCategory(PresentationCategory.Dairy));
  });

  it("no vuelve a despachar si la categoría seleccionada no cambió", () => {
    mockedUseSellbarCategories.mockReturnValue(
      buildCategories({ selected: PresentationCategory.NonAlcoholicBeverages })
    );
    const { rerender } = renderHook(() => useSellbar(), { wrapper });
    dispatch.mockClear();
    rerender();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("despacha setSearchTerm al llamar search.onChange", () => {
    const { result } = renderHook(() => useSellbar(), { wrapper });
    result.current.search.onChange("arroz");
    expect(dispatch).toHaveBeenCalledWith(setSearchTerm("arroz"));
  });

  it("despacha setSearchTerm('') al llamar search.onClear", () => {
    const { result } = renderHook(() => useSellbar(), { wrapper });
    result.current.search.onClear();
    expect(dispatch).toHaveBeenCalledWith(setSearchTerm(""));
  });
});