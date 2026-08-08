// PresentationFormSchema.ts
import * as Yup from "yup";
import type {
    ExistingPresentationInterface,
    PresentationFormValues,
} from "@typings/presentation/presentationTypes";
import { MODEL_TYPE_VALUES, MODEL_UNIT_VALUES, ModelType, ModelUnit, PresentationCategory, SALE_TYPE_VALUES, WEIGHT_SALE_TYPE, type SaleType } from "@typings/presentation/presentationEnum";
import { BARCODE_REGEX, RELATIVE_OR_URL_REGEX } from "../../../config/constants";

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
    image_url:       "",
    min_stock:       "0",
    model_size:      0,
    model_type:      "",
    model_unit:      "",
    sale_type:       "unit",
    name:      "",
    price:           0,
    product_id:           "",
    barcode:        "",
    sku:             "",
    stock:           0,
    is_perishable:   true,
    expiration_date: getTodayISODate(),
    category:        [],
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
    model_size:      presentation?.model_size        ?? 0,
    model_unit:      presentation?.model_unit        ?? "",
    sale_type:      presentation?.sale_type       ?? "unit",
    image_url:       presentation?.image_url        ?? "",
    product_id:      presentation?.product_id       ?? "",
    min_stock:       String(presentation?.min_stock ?? ""),
    stock:           presentation?.stock             ?? 0,
    price:           presentation?.price             ?? 0,
    is_perishable:   presentation?.is_perishable ?? true,
    expiration_date: presentation?.expiration_date  ?? getTodayISODate(),
    category:        presentation?.category         ?? [],
});

// alias para compatibilidad con PresentationDetailForm
export const getPresentationDetailInitialValues = getPresentationEditInitialValues;

// ── Schemas ───────────────────────────────────────────────────────────────────

const baseShape = {
    name:       Yup.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100).required("Nombre requerido"),
    description:       Yup.string().trim().min(2, "La descripcion debe tener al menos 2 caracteres").max(100).required("Descripcion requerida"),
    sku:        Yup.string().min(2).max(50),
    barcode:    Yup.string()
        .test(
            "barcode-format",
            "El código de barras debe tener entre 8 y 14 dígitos numéricos",
            (value) => !value || BARCODE_REGEX.test(value),
        ),
    model_type: Yup.mixed<ModelType>()
        .oneOf(MODEL_TYPE_VALUES, "Tipo de modelo inválido")
        .when('sale_type', {
            is: WEIGHT_SALE_TYPE,
            then: (schema) => schema.notRequired(),
            otherwise: (schema) => schema.required("Tipo de modelo requerido"),
        }),
    model_size: Yup.number()
        .typeError("Debe ser un número")
        .integer("Debe ser un número entero")
        .positive("Debe ser mayor a 0")
        .required("Tamaño requerido"),
    model_unit: Yup.mixed<ModelUnit>()
        .oneOf(MODEL_UNIT_VALUES, "Tipo de presentación inválido")
        .when('sale_type', {
            is: WEIGHT_SALE_TYPE,
            then: (schema) => schema.notRequired(),
            otherwise: (schema) => schema.required("Tipo de presentación requerido"),
        }),
    sale_type: Yup.mixed<SaleType>()
        .oneOf(SALE_TYPE_VALUES, "Tipo de venta inválido")
        .required("Tipo de venta requerido"),
    image_url:       Yup.string()
        .trim()
        .test(
            "valid-image-path",
            "Debe ser una ruta relativa (ej: /images/foto.png) o una URL válida (https://...)",
            (value) => !value || RELATIVE_OR_URL_REGEX.test(value),
        ),
    min_stock: Yup.string()
        .required("Stock mínimo requerido")
        .matches(/^\d+$/, "Debe ser un número entero")
        .test(
            "min-stock-non-negative",
            "No puede ser negativo",
            (value) => value === undefined || Number(value) >= 0,
        ),
    stock: Yup.number()
        .integer("Debe ser un número entero")
        .min(0, "No puede ser negativo")
        .required("Stock requerido")
        .typeError("Debe ser un número"),
    price:           Yup.number().moreThan(0, "El precio debe ser mayor a 0").required("Precio requerido").typeError("Debe ser un número"),
    is_perishable: Yup.boolean().required("Indicá si el producto es perecedero"),
    expiration_date: Yup.date()
        .when('is_perishable', {
            is: true,
            then: (schema) => schema
                .min(getStartOfToday(), "La fecha no puede ser anterior a hoy")
                .required("Fecha de vencimiento requerida")
                .typeError("Fecha inválida"),
            otherwise: (schema) => schema.notRequired(),
        }),
    category: Yup.array().of(Yup.mixed<PresentationCategory>().oneOf(Object.values(PresentationCategory))),
};

export const presentationFormSchema = Yup.object(baseShape);
export const presentationEditFormSchema = Yup.object(baseShape);

// ── Step fields map ───────────────────────────────────────────────────────────

export const stepFieldsMap: Record<number, (keyof PresentationFormValues)[]> = {
    0: ["sale_type", "name", "description", "category"],
    1: ["sku", "barcode", "image_url"],
    2: ["model_type", "model_size", "model_unit"],
    3: ["stock", "min_stock"],
    4: ["price", "is_perishable", "expiration_date"],
};