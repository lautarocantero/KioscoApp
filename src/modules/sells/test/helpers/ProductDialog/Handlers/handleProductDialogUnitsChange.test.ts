import { describe, it, expect, vi } from "vitest";
import handleChangeUnits from "../../../../helpers/ProductDialog/Handlers/handleProductDialogUnitsChange";

const mockSetFieldValue = vi.fn();

const mockedData = {
    _id: "1", 
    brand: "X", 
    created_at: "2024", 
    description: "desc", 
    expiration_date: "2025", 
    gallery_urls: ["not-a-url"], 
    image_url: "img.png", 
    min_stock: 1, 
    model_size: "M", 
    model_type: "type", 
    name: "Test", 
    price: 10, 
    product_id: "pid", 
    sku: "sku", 
    stock: 5, 
    updated_at: "2025" 
}

describe("handleChangeUnits", () => {
  it("actualiza requiredStock si el valor es válido", () => {
    handleChangeUnits({ incomingValue: 3, Presentation: mockedData, setFieldValue: mockSetFieldValue });
    expect(mockSetFieldValue).toHaveBeenCalledWith("requiredStock", 3);
  });

  it("ajusta requiredStock si el valor es menor a 1", () => {
    handleChangeUnits({ incomingValue: 0, Presentation: mockedData, setFieldValue: mockSetFieldValue });
    expect(mockSetFieldValue).toHaveBeenCalledWith("requiredStock", 1);
  });

  it("ajusta requiredStock si el valor supera el stock", () => {
    handleChangeUnits({ incomingValue: 20, Presentation: mockedData, setFieldValue: mockSetFieldValue });
    expect(mockSetFieldValue).toHaveBeenCalledWith("requiredStock", 5);
  });

  it("lanza error si el valor es no numérico", () => {
    expect(() => {
        // @ts-expect-error probando caso inválido
      handleChangeUnits({ incomingValue: "abc", Presentation: mockedData, setFieldValue: mockSetFieldValue });
    }).toThrow("El valor ingresado no es numérico.");
  });

  it("lanza error si no hay producto", () => {
    expect(() => {
        // @ts-expect-error probando caso inválido
        handleChangeUnits({ incomingValue: 2, Presentation: undefined, setFieldValue: mockSetFieldValue });
    }).toThrow("No se ha seleccionado un producto válido.");
  });
});
