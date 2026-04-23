import * as Yup from "yup";

export interface ProductVariantFormValues {
    name:            string;
    description:     string;
    brand:           string;
    image_url:       string;
    sku:             string;
    model_type:      string;
    model_size:      string;
    min_stock:       number | "";
    stock:           number | "";
    price:           number | "";
    expiration_date: string;
    product_id:      string;
}

export const getProductVariantFormInitialValues = (productId: string): ProductVariantFormValues => ({
    name:            "",
    description:     "",
    brand:           "",
    image_url:       "",
    sku:             "",
    model_type:      "",
    model_size:      "",
    min_stock:       "",
    stock:           "",
    price:           "",
    expiration_date: "",
    product_id:      productId,
});

export const productVariantFormSchema = Yup.object({
    name:            Yup.string().min(3, "Mínimo 3 caracteres").required("Requerido"),
    description:     Yup.string().min(3, "Mínimo 3 caracteres").required("Requerido"),
    brand:           Yup.string().min(3, "Mínimo 3 caracteres").required("Requerido"),
    image_url:       Yup.string().url("Debe ser una URL válida").required("Requerido"),
    sku:             Yup.string().min(3, "Mínimo 3 caracteres").max(30, "Máximo 30 caracteres").required("Requerido"),
    model_type:      Yup.string().min(2, "Mínimo 2 caracteres").required("Requerido"),
    model_size:      Yup.string().min(2, "Mínimo 2 caracteres").required("Requerido"),
    min_stock:       Yup.number().min(1, "Debe ser mayor a 0").required("Requerido"),
    stock:           Yup.number().min(0, "No puede ser negativo").required("Requerido"),
    price:           Yup.number().min(1, "Debe ser mayor a 0").required("Requerido"),
    expiration_date: Yup.string().required("Requerido"),
    product_id:      Yup.string().required("Requerido"),
});

// Campos por step (para validación parcial)
export const stepFieldsMap: Record<number, (keyof ProductVariantFormValues)[]> = {
    0: ["name", "description", "brand", "image_url"],
    1: ["sku", "model_type", "model_size", "expiration_date"],
    2: ["min_stock", "stock", "price"],
};
