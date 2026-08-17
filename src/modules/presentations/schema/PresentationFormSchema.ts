// PresentationFormSchema.ts
import * as Yup from "yup";
import type { TFunction } from "i18next";
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
    providers:       [],
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
    providers:       presentation?.providers        ?? [],
});

// alias para compatibilidad con PresentationDetailForm
export const getPresentationDetailInitialValues = getPresentationEditInitialValues;

// ── Schemas ───────────────────────────────────────────────────────────────────

const getBaseShape = (t: TFunction) => ({
    name:       Yup.string().trim().min(2, t("presentations.validation.name.min")).max(100, t("presentations.validation.name.max")).required(t("presentations.validation.name.required")),
    description:       Yup.string().trim().min(2, t("presentations.validation.description.min")).max(100, t("presentations.validation.description.max")).required(t("presentations.validation.description.required")),
    sku:        Yup.string().min(2, t("presentations.validation.sku.min")).max(50, t("presentations.validation.sku.max")),
    barcode:    Yup.string()
        .test(
            "barcode-format",
            t("presentations.validation.barcode.format"),
            (value) => !value || BARCODE_REGEX.test(value),
        ),
    model_type: Yup.mixed<ModelType>()
        .oneOf(MODEL_TYPE_VALUES, t("presentations.validation.model_type.invalid"))
        .when('sale_type', {
            is: WEIGHT_SALE_TYPE,
            then: (schema) => schema.notRequired(),
            otherwise: (schema) => schema.required(t("presentations.validation.model_type.required")),
        }),
    model_size: Yup.number()
        .typeError(t("presentations.validation.model_size.typeError"))
        .integer(t("presentations.validation.model_size.integer"))
        .positive(t("presentations.validation.model_size.positive"))
        .required(t("presentations.validation.model_size.required")),
    model_unit: Yup.mixed<ModelUnit>()
        .oneOf(MODEL_UNIT_VALUES, t("presentations.validation.model_unit.invalid"))
        .when('sale_type', {
            is: WEIGHT_SALE_TYPE,
            then: (schema) => schema.notRequired(),
            otherwise: (schema) => schema.required(t("presentations.validation.model_unit.required")),
        }),
    sale_type: Yup.mixed<SaleType>()
        .oneOf(SALE_TYPE_VALUES, t("presentations.validation.sale_type.invalid"))
        .required(t("presentations.validation.sale_type.required")),
    image_url:       Yup.string()
        .trim()
        .test(
            "valid-image-path",
            t("presentations.validation.image_url.invalid"),
            (value) => !value || RELATIVE_OR_URL_REGEX.test(value),
        ),
    min_stock: Yup.string()
        .required(t("presentations.validation.min_stock.required"))
        .matches(/^\d+$/, t("presentations.validation.min_stock.format"))
        .test(
            "min-stock-non-negative",
            t("presentations.validation.min_stock.nonNegative"),
            (value) => value === undefined || Number(value) >= 0,
        ),
    stock: Yup.number()
        .integer(t("presentations.validation.stock.integer"))
        .min(0, t("presentations.validation.stock.nonNegative"))
        .required(t("presentations.validation.stock.required"))
        .typeError(t("presentations.validation.stock.typeError")),
    price:           Yup.number().moreThan(0, t("presentations.validation.price.moreThan")).required(t("presentations.validation.price.required")).typeError(t("presentations.validation.price.typeError")),
    is_perishable: Yup.boolean().required(t("presentations.validation.is_perishable.required")),
    expiration_date: Yup.date()
        .when('is_perishable', {
            is: true,
            then: (schema) => schema
                .min(getStartOfToday(), t("presentations.validation.expiration_date.min"))
                .required(t("presentations.validation.expiration_date.required"))
                .typeError(t("presentations.validation.expiration_date.invalid")),
            otherwise: (schema) => schema.notRequired(),
        }),
    category: Yup.array().of(Yup.mixed<PresentationCategory>().oneOf(Object.values(PresentationCategory))),
    providers: Yup.array().of(Yup.string()),
});

export const getPresentationFormSchema = (t: TFunction) => Yup.object(getBaseShape(t));
export const getPresentationEditFormSchema = (t: TFunction) => Yup.object(getBaseShape(t));

// ── Step fields map ───────────────────────────────────────────────────────────

export const stepFieldsMap: Record<number, (keyof PresentationFormValues)[]> = {
    0: ["sale_type", "name", "description", "category"],
    1: ["sku", "barcode", "image_url"],
    2: ["model_type", "model_size", "model_unit"],
    3: ["stock", "min_stock"],
    4: ["price", "is_perishable", "expiration_date"],
    5: ["providers"],
};
