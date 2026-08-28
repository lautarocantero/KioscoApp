import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useProductItem, useProductStock } from "../useProductItem";
import handleAddProductDialogItemToCart from "../../../modules/cart/components/ProductDialog/handleAddProductItemToCart";
import { ProductDialogContext } from "../../../modules/cart/context/Product/ProductDialogContext";
import { SnackBarContext } from "../../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import type { ProductWithPresentations } from "@typings/product/productTypes";
import type { Presentation } from "@typings/presentation/presentationTypes";

vi.mock("react-redux");
vi.mock("../../../modules/cart/components/ProductDialog/handleAddProductItemToCart");

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedHandleAdd = vi.mocked(handleAddProductDialogItemToCart);

const dispatch = vi.fn();
const setShowModal = vi.fn();
const showSnackBar = vi.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProductDialogContext.Provider value={{ setShowModal, showModal: false }}>
    <SnackBarContext.Provider
      value={{ showSnackBar, closeSnackBar: vi.fn(), snackBar: { open: false, message: "", color: AlertColor.Info } }}
    >
      {children}
    </SnackBarContext.Provider>
  </ProductDialogContext.Provider>
);

const product: ProductWithPresentations = {
  _id: "prod-1",
  name: "Coca Cola",
  description: "",
  brand: "",
  image_url: "",
  created_at: "",
  updated_at: "",
  presentations: [],
};

const presentation: Presentation = {
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
};

describe("useProductItem", () => {
  beforeEach(() => {
    dispatch.mockClear();
    setShowModal.mockClear();
    mockedHandleAdd.mockClear();
    mockedUseDispatch.mockReturnValue(dispatch);
  });

  it("handleSelect despacha selectProductThunk y abre el modal", async () => {
    const { result } = renderHook(() => useProductItem(product), { wrapper });

    await act(async () => result.current.handleSelect());

    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(setShowModal).toHaveBeenCalledWith(true);
  });

  it("handleAddPresentation delega en el pipeline compartido con quantity=1 para venta por unidad", () => {
    const { result } = renderHook(() => useProductItem(product), { wrapper });

    act(() => result.current.handleAddPresentation(presentation));

    expect(mockedHandleAdd).toHaveBeenCalledWith(
      expect.objectContaining({ presentation, quantity: 1, dispatch, showSnackBar })
    );
  });

  it("handleAddPresentation usa quantity=100 para venta por peso", () => {
    const { result } = renderHook(() => useProductItem(product), { wrapper });

    act(() => result.current.handleAddPresentation({ ...presentation, sale_type: "weight" as Presentation["sale_type"] }));

    expect(mockedHandleAdd).toHaveBeenCalledWith(expect.objectContaining({ quantity: 100 }));
  });
});

describe("useProductStock", () => {
  it("suma el stock de las presentaciones", () => {
    const { result } = renderHook(() => useProductStock([{ ...presentation, stock: 3 }, { ...presentation, stock: 4 }]));
    expect(result.current.totalStock).toBe(7);
  });

  it("retorna 0 sin presentaciones", () => {
    const { result } = renderHook(() => useProductStock(undefined));
    expect(result.current.totalStock).toBe(0);
  });
});
