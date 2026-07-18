import * as Yup from "yup";
import type {
    ExistingPresentationInterface,
    PresentationFormValues,
} from "@typings/presentation/presentationTypes";

const BARCODE_REGEX = /^\d{8,14}$/;
const MODEL_SIZE_REGEX = /^\d+([.,]\d+)?\s?(ml|l|g|kg|oz|lb|cc)$/i;

const getTodayISODate = () => new Date().toISOString().slice(0, 10);
const getStartOfToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};

// ── Initial values ────────────────────────────────────────────────────────────

export const getPresentationFormInitialValues = (): PresentationFormValues => ({
    brand:             "",
    description:     "",
    expiration_date: getTodayISODate(),
    image_url:       "",
    min_stock:       0,
    model_size:      "",
    model_type:      "",
    name:      "",
    price:           0,
    product_id:           "",
    barcode:        "",
    sku:             "",
    stock:           0,
});

export const getPresentationEditInitialValues = (
    presentation: ExistingPresentationInterface | null
): PresentationFormValues => ({
    sku:             presentation?.sku             ?? "",
    barcode:             presentation?.barcode             ?? "",
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
    expiration_date: presentation?.expiration_date  ?? getTodayISODate(),
});

// alias para compatibilidad con PresentationDetailForm
export const getPresentationDetailInitialValues = getPresentationEditInitialValues;

// ── Schemas ───────────────────────────────────────────────────────────────────

const baseShape = {
    name:       Yup.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100).required("Nombre requerido"),
    description:       Yup.string().trim().min(2, "La descripcion debe tener al menos 2 caracteres").max(100).required("Descripcion requerida"),
    sku:        Yup.string().min(2).max(50).required("SKU requerido"),
    barcode:    Yup.string()
        .test(
            "barcode-format",
            "El código de barras debe tener entre 8 y 14 dígitos numéricos",
            (value) => !value || BARCODE_REGEX.test(value),
        ),
    model_type: Yup.string().min(2).required("Tipo de modelo requerido"),
    model_size: Yup.string()
        .required("Tamaño/Presentación requerido")
        .matches(MODEL_SIZE_REGEX, "Formato inválido. Ej: 500ml, 1l, 2kg"),
    image_url:       Yup.string(),
    min_stock:       Yup.number().integer("Debe ser un número entero").min(0, "No puede ser negativo").required("Stock mínimo requerido").typeError("Debe ser un número"),
    stock:           Yup.number().integer("Debe ser un número entero").min(0, "No puede ser negativo").required("Stock requerido").typeError("Debe ser un número"),
    price:           Yup.number().moreThan(0, "El precio debe ser mayor a 0").required("Precio requerido").typeError("Debe ser un número"),
    expiration_date: Yup.date()
        .min(getStartOfToday(), "La fecha no puede ser anterior a hoy")
        .required("Fecha de vencimiento requerida")
        .typeError("Fecha inválida"),
};

export const presentationFormSchema = Yup.object(baseShape);
export const presentationEditFormSchema = Yup.object(baseShape);

// ── Step fields map ───────────────────────────────────────────────────────────

export const stepFieldsMap: Record<number, (keyof PresentationFormValues)[]> = {
    0: ["name", "description"],
    1: ["sku", "barcode", "model_type", "model_size", "image_url"],
    2: ["stock", "min_stock"],
    3: ["price", "expiration_date"],
};