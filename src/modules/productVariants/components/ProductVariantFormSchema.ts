import type { ProductVariantFormValues } from "@typings/productVariant/productVariant";
import * as Yup from "yup";


export const getProductVariantFormInitialValues = (): ProductVariantFormValues => ({
    sku:             "",
    model_type:      "",
    model_size:      "",
    image_file:      null,
    image_url:       "",
    min_stock:       "",
    stock:           "",
    price:           "",
    expiration_date: "",
});

export const productVariantFormSchema = Yup.object({
    sku:        Yup.string().min(2).max(50).required("SKU requerido"),
    model_type: Yup.string().min(2).required("Tipo de modelo requerido"),
    model_size: Yup.string().min(2).required("Tamaño/Presentación requerido"),

    // ✅ Validar el File, no el string vacío
    image_file: Yup.mixed<File>()
        .required("Imagen de envase requerida")
        .test("is-file", "Imagen de envase requerida", (value) => value instanceof File),

    image_url:       Yup.string(),  // ya no required
    min_stock:       Yup.number().min(0).required("Stock mínimo requerido").typeError("Debe ser un número"),
    stock:           Yup.number().min(0).required("Stock requerido").typeError("Debe ser un número"),
    price:           Yup.number().min(0.01).required("Precio requerido").typeError("Debe ser un número"),
    expiration_date: Yup.string().required("Fecha de vencimiento requerida"),
});

// Campos por step (para validación parcial)
export const stepFieldsMap: Record<number, (keyof ProductVariantFormValues)[]> = {
    0: ["sku", "model_type", "model_size", "image_url"],
    1: ["min_stock", "stock", "price"],
    2: ["expiration_date"],
};
