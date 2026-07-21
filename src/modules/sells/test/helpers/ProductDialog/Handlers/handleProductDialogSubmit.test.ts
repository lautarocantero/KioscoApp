import { describe, it, expect, vi, beforeEach } from "vitest";
import onSubmit from "../../../../helpers/ProductDialog/Handlers/handleProductDialogSubmit";
import { AlertColor } from "../../../../../../typings/ui/ui";
import { addToCartThunk } from "../../../../../../store/seller/sellerThunks";
import validateProductForCart from "../../../../helpers/ProductDialog/Validation/ValidateProductForCart";
import formatProductTicket from "../../../../helpers/ProductDialog/Handlers/handleFormatProductTicket";

// Mocks
vi.mock("../Validation/ValidateProductForCart", () => ({
  default: vi.fn(),
}));
vi.mock("./handleFormatProductTicket", () => ({
  default: vi.fn(),
}));
vi.mock("../../../../../store/seller/sellerThunks", () => ({
  addToCartThunk: vi.fn((payload) => ({ type: "ADD_TO_CART", payload })),
}));


const mockDispatch = vi.fn();
const mockShowSnackBar = vi.fn();
const mockSetShowModal = vi.fn();

const baseProduct = {
  _id: "pv001",
  name: "Producto Test",
  description: "desc",
  barcode: "12121212",
  image_url: "img.png",
  brand: "Marca",
  product_id: "prod001",
  sku: "sku001",
  model_type: "tipo",
  model_size: "M",
  price: 100,
  expiration_date: "2027-01-01",
  stock: 10,
  created_at: "2026-01-01",
  updated_at: "2026-01-02",
  min_stock: 1,
};

describe("onSubmit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // it("muestra error si la validación falla", async () => {
  //   (validateProductForCart).mockReturnValue({ valid: false, message: "error" });

  //   await onSubmit({ data: { Presentation: baseProduct, requiredStock: 1 }, showSnackBar: mockShowSnackBar, dispatch: mockDispatch, setShowModal: mockSetShowModal });

  //   expect(mockShowSnackBar).toHaveBeenCalledWith("error", AlertColor.Error);
  //   expect(mockDispatch).not.toHaveBeenCalled();
  // });

  // it("muestra error si el formateo falla", async () => {
  //   (validateProductForCart as any).mockReturnValue({ valid: true });
  //   (formatProductTicket as any).mockReturnValue(undefined);

  //   await onSubmit({ data: { Presentation: baseProduct, requiredStock: 1 }, showSnackBar: mockShowSnackBar, dispatch: mockDispatch, setShowModal: mockSetShowModal });

  //   expect(mockShowSnackBar).toHaveBeenCalledWith("Error agregando el producto al carrito", AlertColor.Error);
  //   expect(mockDispatch).not.toHaveBeenCalled();
  // });

  // it("agrega producto al carrito si todo es válido", async () => {
  //   (validateProductForCart as any).mockReturnValue({ valid: true });
  //   (formatProductTicket as any).mockReturnValue({ ...baseProduct, stock_required: 1 });

  //   await onSubmit({ data: { Presentation: baseProduct, requiredStock: 1 }, showSnackBar: mockShowSnackBar, dispatch: mockDispatch, setShowModal: mockSetShowModal });

  //   expect(mockDispatch).toHaveBeenCalledWith(addToCartThunk({ productData: { ...baseProduct, stock_required: 1 } }));
  //   expect(mockSetShowModal).toHaveBeenCalledWith(false);
  //   expect(mockShowSnackBar).toHaveBeenCalledWith("Agregado 'Producto Test' al carrito", AlertColor.Success);
  // });

  // it("corta nombre largo en el snackbar", async () => {
  //   const longNameProduct = { ...baseProduct, name: "NombreMuyLargoDeProductoQueSupera25Caracteres" };
  //   (validateProductForCart as any).mockReturnValue({ valid: true });
  //   (formatProductTicket as any).mockReturnValue({ ...longNameProduct, stock_required: 1 });

  //   await onSubmit({ data: { Presentation: longNameProduct, requiredStock: 1 }, showSnackBar: mockShowSnackBar, dispatch: mockDispatch, setShowModal: mockSetShowModal });

  //   expect(mockShowSnackBar).toHaveBeenCalledWith("Agregado 'NombreMuyLargoDeProductoQ...' al carrito", AlertColor.Success);
  // });
});
