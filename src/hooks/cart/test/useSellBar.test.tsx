// src/hooks/sellers/test/useSellbar.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useSellbar } from "../useSellBar";
import { useSellbarBarcode } from "../useSellbarBarcode";
import { SnackBarContext } from "../../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import type { CartStateInterface } from "@typings/cart/cartTypes";
import { SortOption, ViewMode } from "@typings/cart/cartEnums";

vi.mock("react-redux");
vi.mock("../useSellbarBarcode");

const mockedUseSelector = vi.mocked(useSelector);
const mockedUseSellbarBarcode = vi.mocked(useSellbarBarcode);

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

/*──────────────── 🧱 buildCartState ────────────────╗
║ Shape completo de CartRootState['cart'] (SellerStateInterface).       ║
║ Evita repetir un objeto parcial a mano en cada test: si el hook       ║
║ empieza a leer un campo nuevo del slice, ya está acá con un default   ║
║ razonable en vez de romper con "Cannot destructure ... undefined".    ║
╚════════════════════════════════════════════════════════════════════*/

const buildCartState = (overrides: Partial<CartStateInterface> = {}) => ({
  _id: null,
  cart: [] as unknown[],
  productSelected: null,
  presentationSelected: null,
  presentations: [] as unknown[],
  presentationsLoading: false,
  products: [] as unknown[],
  productsLoading: false,
  errorMessage: null,
  sort: SortOption.NameAsc,
  viewMode: ViewMode.Grid,
  page: 1,
  selectedCategory: null,
  searchTerm: "",
  exactMatch: false,
  ...overrides,
});

const mockSelector = (cartOverrides: Partial<CartStateInterface> = {}) => {
  mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
    selectorFn({ cart: buildCartState(cartOverrides) })
  );
};

describe("useSellbar", () => {
  beforeEach(() => {
    mockSelector();
    mockedUseSellbarBarcode.mockReturnValue({
      showBarcodeInput: false,
      value: "",
      inputRef: { current: null },
      toggleShowInput: vi.fn(),
      onChange: vi.fn(),
      onKeyDown: vi.fn(),
    });
  });

  it("expone barcode resuelto por su hook dedicado", () => {
    const { result } = renderHook(() => useSellbar(), { wrapper });

    expect(result.current.barcode.showBarcodeInput).toBe(false);
  });

  it("pasa el carrito del store a useSellbarBarcode", () => {
    const cartItems = [{ _id: "1" }] as unknown as CartStateInterface["cart"];
    mockSelector({ cart: cartItems });

    renderHook(() => useSellbar(), { wrapper });

    expect(mockedUseSellbarBarcode).toHaveBeenCalledWith(
      expect.objectContaining({ cart: cartItems, showSnackBar })
    );
  });
});
