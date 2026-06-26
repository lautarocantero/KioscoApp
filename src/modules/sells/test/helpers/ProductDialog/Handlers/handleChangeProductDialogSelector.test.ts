import { describe, it, expect, vi, beforeEach } from "vitest";
import handleChangeProductDialogSelector from "../../../../helpers/ProductDialog/Handlers/handleChangeProductDialogSelector";

const mockSetFieldValue = vi.fn();

const mockedData = [
    { 
        _id: "pv001", 
        brand: "MarcaX", 
        created_at: "2026-01-01T10:00:00Z", 
        description: "Producto de prueba número 1", 
        expiration_date: "2027-01-01T00:00:00Z", 
        gallery_urls: 
            [
                "https://example.com/img1.png", 
                "https://example.com/img2.png"], 
        image_url: "https://example.com/img-main1.png", 
        min_stock: 5, 
        model_size: "M", 
        model_type: "Ropa", 
        name: "Camiseta Básica", 
        price: 199.99, 
        product_id: "prod001", 
        sku: "SKU001", 
        stock: 50, 
        updated_at: "2026-01-10T12:00:00Z", 
    }, 
    { 
        _id: "pv002", 
        brand: "MarcaY", 
        created_at: "2026-01-02T11:00:00Z", 
        description: "Producto de prueba número 2", 
        expiration_date: "2027-06-01T00:00:00Z", 
        gallery_urls: ["https://example.com/img3.png"], 
        image_url: "https://example.com/img-main2.png", 
        min_stock: 2, 
        model_size: "L", 
        model_type: "Calzado", 
        name: "Zapatillas Urbanas", 
        price: 499.5, 
        product_id: "prod002", 
        sku: "SKU002", 
        stock: 20, 
        updated_at: "2026-01-11T14:30:00Z", 
    },
]

describe("handleChangeProductDialogSelector", () => {
  beforeEach(() => {
    mockSetFieldValue.mockClear();
  });

  it("lanza error si el evento no tiene target", () => {
    expect(() => {
      handleChangeProductDialogSelector({ event: {}, products: [], setFieldValue: mockSetFieldValue });
    }).toThrow("No se ha recibido el evento de cambio.");
  });

  it("lanza error si productId está vacío", () => {
    expect(() => {
      handleChangeProductDialogSelector({ event: { target: { value: "" } }, products: [], setFieldValue: mockSetFieldValue });
    }).toThrow("No se ha encontrado el producto.");
  });

  it("lanza error si products no es array", () => {
    expect(() => {
        // @ts-expect-error probando caso inválido
      handleChangeProductDialogSelector({ event: { target: { value: "123" } }, products: null, setFieldValue: mockSetFieldValue });
    }).toThrow("No han cargado correctamente los productos.");
  });

  it("no hace nada si el producto no se encuentra", () => {
      // @ts-expect-error probando caso inválido
    handleChangeProductDialogSelector({ event: { target: { value: "999" } }, products: [{ _id: "123" }], setFieldValue: mockSetFieldValue });
    expect(mockSetFieldValue).not.toHaveBeenCalled();
  });

  it("actualiza los campos si el producto se encuentra", () => {
    const Presentation = mockedData[0]; 
    handleChangeProductDialogSelector({ event: { target: { value: "pv001" } }, products: mockedData, setFieldValue: mockSetFieldValue });
    expect(mockSetFieldValue).toHaveBeenCalledWith("PresentationId", "pv001");
    expect(mockSetFieldValue).toHaveBeenCalledWith("Presentation", Presentation);
  });
});
