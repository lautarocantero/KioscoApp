import * as Yup from "yup";
import type {
    ExistingPresentationInterface,
    PresentationFormValues,
} from "@typings/presentation/presentationTypes";

// ── Initial values ────────────────────────────────────────────────────────────

export const getPresentationFormInitialValues = (): PresentationFormValues => ({
    brand:             "",
    description:     "",
    expiration_date: "",
    image_url:       "",
    min_stock:       0,
    model_size:      "",
    model_type:      "",
    name:      "",
    price:           0,
    product_id:           "",
    sku:             "",
    stock:           0,
});

export const getPresentationEditInitialValues = (
    presentation: ExistingPresentationInterface | null
): PresentationFormValues => ({
    sku:             presentation?.sku             ?? "",
    name:            presentation?.name             ?? "",
    brand:           presentation?.brand            ?? "",
    description:     presentation?.description      ?? "",
    model_type:      presentation?.model_type       ?? "",
    model_size:      presentation?.model_size       ?? "",
    image_url:       presentation?.image_url        ?? "",
    product_id:      presentation?.product_id       ?? "",
    min_stock:       presentation?.min_stock        ?? 0,
    stock:           presentation?.stock             ?? 0,
    price:           presentation?.price             ?? 0,
    expiration_date: presentation?.expiration_date  ?? "",
});

// alias para compatibilidad con PresentationDetailForm
export const getPresentationDetailInitialValues = getPresentationEditInitialValues;

// ── Schemas ───────────────────────────────────────────────────────────────────

export const presentationFormSchema = Yup.object({
    sku:        Yup.string().min(2).max(50).required("SKU requerido"),
    model_type: Yup.string().min(2).required("Tipo de modelo requerido"),
    model_size: Yup.string().min(2).required("Tamaño/Presentación requerido"),
    image_url:       Yup.string(),
    min_stock:       Yup.number().min(0).required("Stock mínimo requerido").typeError("Debe ser un número"),
    stock:           Yup.number().min(0).required("Stock requerido").typeError("Debe ser un número"),
    price:           Yup.number().min(0.01).required("Precio requerido").typeError("Debe ser un número"),
    expiration_date: Yup.string().required("Fecha de vencimiento requerida"),
});

export const presentationEditFormSchema = Yup.object({
    sku:        Yup.string().min(2).max(50).required("SKU requerido"),
    model_type: Yup.string().min(2).required("Tipo de modelo requerido"),
    model_size: Yup.string().min(2).required("Tamaño/Presentación requerido"),
    image_url:  Yup.string(),
    min_stock:  Yup.number().min(0).required("Stock mínimo requerido").typeError("Debe ser un número"),
    stock:      Yup.number().min(0).required("Stock requerido").typeError("Debe ser un número"),
    price:      Yup.number().min(0.01).required("Precio requerido").typeError("Debe ser un número"),
    expiration_date: Yup.string().required("Fecha de vencimiento requerida"),
});

// ── Step fields map ───────────────────────────────────────────────────────────

export const stepFieldsMap: Record<number, (keyof PresentationFormValues)[]> = {
    0: ["sku", "model_type", "model_size", "image_url"],
    1: ["min_stock", "stock", "price"],
    2: ["expiration_date"],
};