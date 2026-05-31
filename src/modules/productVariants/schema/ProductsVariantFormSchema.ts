// modules/productVariants/schema/ProductsVariantFormSchema.ts

import type {
    ProductVariantFormValues,
    ExistingProductVariantInterface,
} from "@typings/productVariant/productVariantTypes";
import * as Yup from "yup";

// ── Initial values ────────────────────────────────────────────────────────────

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

export const getProductVariantEditInitialValues = (
    variant: ExistingProductVariantInterface
): ProductVariantFormValues => ({
    sku:             variant.sku,
    model_type:      variant.model_type,
    model_size:      variant.model_size,
    image_file:      null,
    image_url:       variant.image_url       ?? "",
    min_stock:       variant.min_stock,
    stock:           variant.stock,
    price:           variant.price,
    expiration_date: variant.expiration_date ?? "",
});

// se mantiene por compatibilidad con ProductVariantDetailForm
export const getProductVariantDetailInitialValues = getProductVariantEditInitialValues;

// ── Schemas ───────────────────────────────────────────────────────────────────

export const productVariantFormSchema = Yup.object({
    sku:        Yup.string().min(2).max(50).required("SKU requerido"),
    model_type: Yup.string().min(2).required("Tipo de modelo requerido"),
    model_size: Yup.string().min(2).required("Tamaño/Presentación requerido"),
    image_file: Yup.mixed<File>()
        .required("Imagen de envase requerida")
        .test("is-file", "Imagen de envase requerida", (value) => value instanceof File),
    image_url:       Yup.string(),
    min_stock:       Yup.number().min(0).required("Stock mínimo requerido").typeError("Debe ser un número"),
    stock:           Yup.number().min(0).required("Stock requerido").typeError("Debe ser un número"),
    price:           Yup.number().min(0.01).required("Precio requerido").typeError("Debe ser un número"),
    expiration_date: Yup.string().required("Fecha de vencimiento requerida"),
});

export const productVariantEditFormSchema = Yup.object({
    sku:        Yup.string().min(2).max(50).required("SKU requerido"),
    model_type: Yup.string().min(2).required("Tipo de modelo requerido"),
    model_size: Yup.string().min(2).required("Tamaño/Presentación requerido"),
    image_file: Yup.mixed<File>().nullable().optional(),
    image_url:  Yup.string(),
    min_stock:  Yup.number().min(0).required("Stock mínimo requerido").typeError("Debe ser un número"),
    stock:      Yup.number().min(0).required("Stock requerido").typeError("Debe ser un número"),
    price:      Yup.number().min(0.01).required("Precio requerido").typeError("Debe ser un número"),
    expiration_date: Yup.string().required("Fecha de vencimiento requerida"),
});

// ── Step fields map ───────────────────────────────────────────────────────────

export const stepFieldsMap: Record<number, (keyof ProductVariantFormValues)[]> = {
    0: ["sku", "model_type", "model_size", "image_url"],
    1: ["min_stock", "stock", "price"],
    2: ["expiration_date"],
};