import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import type { KeyboardEvent } from "react";
import { usePresentationSearch } from "../usePresentationSearch";
import handleAddProductDialogItemToCart from "../../../modules/cart/components/ProductDialog/handleAddProductItemToCart";
import { SnackBarContext } from "../../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import type { Product } from "@typings/product/productTypes";
import type { Presentation } from "@typings/presentation/presentationTypes";

vi.mock("react-redux");
vi.mock("../../../modules/cart/components/ProductDialog/handleAddProductItemToCart");

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedHandleAdd = vi.mocked(handleAddProductDialogItemToCart);

const dispatch = vi.fn();
const showSnackBar = vi.fn();

const presentation = (overrides: Partial<Presentation> = {}): Presentation => ({
  _id: "pres-1",
  brand: "",
  category: [],
  created_at: "",
  description: "",
  expiration_date: "",
  image_url: "",
  min_stock: 5,
  model_size: 500,
  model_type: "bottle",
  model_unit: "ml" as Presentation["model_unit"],
  name: "Coca Cola 500ml",
  price: 100,
  product_id: "prod-1",
  barcode: "",
  sku: "SKU-1",
  stock: 20,
  updated_at: "",
  is_perishable: false,
  sale_type: "unit" as Presentation["sale_type"],
  ...overrides,
});

const product = (overrides: Partial<Product> = {}): Product => ({
  _id: "prod-1",
  name: "Coca Cola",
  description: "",
  brand: "",
  image_url: "",
  created_at: "",
  updated_at: "",
  presentations: [presentation()],
  ...overrides,
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SnackBarContext.Provider
    value={{ showSnackBar, closeSnackBar: vi.fn(), snackBar: { open: false, message: "", color: AlertColor.Info } }}
  >
    {children}
  </SnackBarContext.Provider>
);

describe("usePresentationSearch", () => {
  beforeEach(() => {
    dispatch.mockClear();
    mockedHandleAdd.mockClear();
    mockedUseDispatch.mockReturnValue(dispatch);
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) => selectorFn({ cart: { products: [product()] } }));
  });

  it("no abre el dropdown con la query vacía", () => {
    const { result } = renderHook(() => usePresentationSearch(), { wrapper });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.results).toEqual([]);
  });

  it("busca en el índice derivado de los productos ya cargados", async () => {
    const { result } = renderHook(() => usePresentationSearch(), { wrapper });

    act(() => result.current.onQueryChange("coca"));

    await waitFor(() => expect(result.current.isOpen).toBe(true));
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].product).toBe("Coca Cola");
  });

  it("agrega la presentación resaltada con Enter y limpia la query", async () => {
    mockedHandleAdd.mockResolvedValue(true);
    const { result } = renderHook(() => usePresentationSearch(), { wrapper });

    act(() => result.current.onQueryChange("coca"));
    await waitFor(() => expect(result.current.results).toHaveLength(1));

    await act(async () => {
      result.current.onKeyDown({ key: "Enter", preventDefault: vi.fn() } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    expect(mockedHandleAdd).toHaveBeenCalledWith(
      expect.objectContaining({ quantity: 1, dispatch, showSnackBar })
    );
    expect(result.current.query).toBe("");
  });

  it("agrega en gramos (100) cuando la presentación es por peso", async () => {
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
      selectorFn({ cart: { products: [product({ presentations: [presentation({ sale_type: "weight" as Presentation["sale_type"] })] })] } })
    );
    mockedHandleAdd.mockResolvedValue(true);
    const { result } = renderHook(() => usePresentationSearch(), { wrapper });

    act(() => result.current.onQueryChange("coca"));
    await waitFor(() => expect(result.current.results).toHaveLength(1));

    await act(async () => {
      result.current.onSelect(result.current.results[0]);
    });

    expect(mockedHandleAdd).toHaveBeenCalledWith(expect.objectContaining({ quantity: 100 }));
  });

  it("Escape limpia la query", () => {
    const { result } = renderHook(() => usePresentationSearch(), { wrapper });
    act(() => result.current.onQueryChange("coca"));

    act(() => {
      result.current.onKeyDown({ key: "Escape", preventDefault: vi.fn() } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current.query).toBe("");
  });
});
