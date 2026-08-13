// src/hooks/sellers/test/useSellbar.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useSellbar } from "../useSellBar";
import {
  setSearchTermThunk,
  clearSearchTermThunk,
  setSelectedCategoryThunk,
  setExactMatchThunk,
} from "../../../store/cart/cartThunks";
import { useSellbarCart } from "../useSellbarCart";
import { useSellbarBarcode } from "../useSellbarBarcode";
import { useSellbarCategories } from "../useSellbarCategories";
import { SnackBarContext } from "../../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import type { CartStateInterface, UseCartBarCategoriesResult } from "@typings/cart/cartTypes";
import { PresentationCategory } from "@typings/presentation/presentationEnum";
import { SortOption, ViewMode } from "@typings/cart/cartEnums";

vi.mock("react-redux");
vi.mock("../../../store/cart/cartThunks", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../../store/cart/cartThunks")>();
  return {
    ...actual,
    setSearchTermThunk: vi.fn(actual.setSearchTermThunk),
    clearSearchTermThunk: vi.fn(actual.clearSearchTermThunk),
    setSelectedCategoryThunk: vi.fn(actual.setSelectedCategoryThunk),
    setExactMatchThunk: vi.fn(actual.setExactMatchThunk),
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
const mockedSetSelectedCategoryThunk = vi.mocked(setSelectedCategoryThunk);
const mockedSetSearchTermThunk = vi.mocked(setSearchTermThunk);
const mockedClearSearchTermThunk = vi.mocked(clearSearchTermThunk);
const mockedSetExactMatchThunk = vi.mocked(setExactMatchThunk);

const dispatch = vi.fn();
const showSnackBar = vi.fn();
const closeSnackBar = vi.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SnackBarContext.Provider
    value={{
      showSnackBar,
      closeSnackBar,
      snackBar: { open: false, message: "", color: AlertColor?.Info },
    }}
  >
    {children}
  </SnackBarContext.Provider>
);

const buildCategories = (
  overrides: Partial<UseCartBarCategoriesResult> = {}
): UseCartBarCategoriesResult => ({
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

/*──────────────── 🧱 buildCartState ────────────────╗
║ Shape completo de CartRootState['cart'] (SellerStateInterface).       ║
║ Evita repetir un objeto parcial a mano en cada test: si el hook       ║
║ empieza a leer un campo nuevo del slice, ya está acá con un default   ║
║ razonable en vez de romper con "Cannot destructure ... undefined".    ║
╚════════════════════════════════════════════════════════════════════*/

const buildCartState = (overrides: Partial<CartStateInterface> = {}) => ({
  _id: null,
  name: "",
  cart: [] as unknown[],
  productSelected: null,
  presentationSelected: null,
  presentations: [] as unknown[],
  presentationsLoading: false,
  products: [] as unknown[],
  productsLoading: false,
  description: "",
  created_at: "",
  updated_at: "",
  errorMessage: null,
  sort: SortOption.NameAsc,
  viewMode: ViewMode.Grid,
  page: 1,
  selectedCategory: null as PresentationCategory | null,
  searchTerm: "",
  exactMatch: false,
  ...overrides,
});

const mockSelector = (cartOverrides: Partial<CartStateInterface> = {}) => {
  mockedUseSelector.mockImplementation((selectorFn: any) =>
    selectorFn({ cart: buildCartState(cartOverrides) })
  );
};

describe("useSellbar", () => {
  beforeEach(() => {
    dispatch.mockClear();
    mockedSetSelectedCategoryThunk.mockClear();
    mockedSetSearchTermThunk.mockClear();
    mockedClearSearchTermThunk.mockClear();
    mockedSetExactMatchThunk.mockClear();
    mockedUseDispatch.mockReturnValue(dispatch);
    mockSelector();
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

  it("despacha setSelectedCategoryThunk al montar con la categoría inicial de useSellbarCategories", () => {
    mockedUseSellbarCategories.mockReturnValue(
      buildCategories({ selected: PresentationCategory.NonAlcoholicBeverages })
    );
    renderHook(() => useSellbar(), { wrapper });

    expect(mockedSetSelectedCategoryThunk).toHaveBeenCalledWith(
      PresentationCategory.NonAlcoholicBeverages
    );
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("vuelve a despachar setSelectedCategoryThunk cuando cambia la categoría seleccionada", () => {
    mockedUseSellbarCategories.mockReturnValue(buildCategories({ selected: null }));
    const { rerender } = renderHook(() => useSellbar(), { wrapper });
    dispatch.mockClear();
    mockedSetSelectedCategoryThunk.mockClear();

    mockedUseSellbarCategories.mockReturnValue(
      buildCategories({ selected: PresentationCategory.Dairy })
    );
    rerender();

    expect(mockedSetSelectedCategoryThunk).toHaveBeenCalledWith(PresentationCategory.Dairy);
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("no vuelve a despachar si la categoría seleccionada no cambió", () => {
    mockedUseSellbarCategories.mockReturnValue(
      buildCategories({ selected: PresentationCategory.NonAlcoholicBeverages })
    );
    const { rerender } = renderHook(() => useSellbar(), { wrapper });
    dispatch.mockClear();
    mockedSetSelectedCategoryThunk.mockClear();
    rerender();

    // "selected" es un valor primitivo (enum) y no cambió entre renders,
    // así que la dependencia del useEffect sigue siendo igual (Object.is) y no vuelve a correr.
    expect(dispatch).not.toHaveBeenCalled();
    expect(mockedSetSelectedCategoryThunk).not.toHaveBeenCalled();
  });

  it("despacha setSearchTermThunk al llamar search.onChange", () => {
    const { result } = renderHook(() => useSellbar(), { wrapper });
    result.current.search.onChange("arroz");

    expect(mockedSetSearchTermThunk).toHaveBeenCalledWith("arroz");
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("despacha clearSearchTermThunk al llamar search.onClear", () => {
    const { result } = renderHook(() => useSellbar(), { wrapper });
    result.current.search.onClear();

    expect(mockedClearSearchTermThunk).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("despacha setExactMatchThunk con el valor negado al togglear", () => {
    mockSelector({ exactMatch: true });
    const { result } = renderHook(() => useSellbar(), { wrapper });
    result.current.search.onToggleExactMatch();

    expect(mockedSetExactMatchThunk).toHaveBeenCalledWith(false);
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});