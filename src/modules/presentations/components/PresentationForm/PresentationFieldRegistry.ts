import type { TFunction } from "i18next";
import { PRESENTATION_CATEGORY_VALUES, PresentationCategory, SALE_TYPE_VALUES, ModelType, MODEL_TYPE_VALUES, ModelUnit, MODEL_UNIT_VALUES, type SaleType } from "@typings/presentation/presentationEnum";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import type { FieldRegistry } from "@typings/shared/types/formCard.types";

const todayISODate = new Date().toISOString().slice(0, 10);

export const getPresentationFieldRegistry = (
    t: TFunction
): FieldRegistry<PresentationFormValues> => ({
    name: {
        label: t("presentations.form.fields.name.label"),
        placeholder: t("presentations.form.fields.name.placeholder"),
        tooltip: t("presentations.form.fields.name.tooltip"),
        required: true,
    },
    description: {
        label: t("presentations.form.fields.description.label"),
        placeholder: t("presentations.form.fields.description.placeholder"),
        tooltip: t("presentations.form.fields.description.tooltip"),
        required: true,
    },
    barcode: {
        label: t("presentations.form.fields.barcode.label"),
        placeholder: t("presentations.form.fields.barcode.placeholder"),
        tooltip: t("presentations.form.fields.barcode.tooltip"),
        helperTextWhenEmpty: t("presentations.form.fields.barcode.helperTextWhenEmpty"),
    },
    sku: {
        label: t("presentations.form.fields.sku.label"),
        placeholder: t("presentations.form.fields.sku.placeholder"),
        tooltip: t("presentations.form.fields.sku.tooltip"),
        required: true,
    },
    model_type: {
        label: t("presentations.form.fields.model_type.label"),
        tooltip: t("presentations.form.fields.model_type.tooltip"),
        type: "select",
        multiple: false,
        options: MODEL_TYPE_VALUES,
        getOptionLabel: (v) => t(`modelType.${v as ModelType}`),
        required: true,
    },
    model_size: {
        label: t("presentations.form.fields.model_size.label"),
        placeholder: t("presentations.form.fields.model_size.placeholder"),
        tooltip: t("presentations.form.fields.model_size.tooltip"),
        type: "number",
        required: true,
        min: "1",
    },
    model_unit: {
        label: t("presentations.form.fields.model_unit.label"),
        tooltip: t("presentations.form.fields.model_unit.tooltip"),
        type: "select",
        multiple: false,
        options: MODEL_UNIT_VALUES,
        getOptionLabel: (v) => t(`modelUnit.${v as ModelUnit}`),
        required: true,
    },
    sale_type: {
        label: t("presentations.form.fields.sale_type.label"),
        tooltip: t("presentations.form.fields.sale_type.tooltip"),
        type: "select",
        multiple: false,
        options: SALE_TYPE_VALUES,
        getOptionLabel: (v) => t(`saleType.${v as SaleType}`),
        required: true,
    },
    image_url: {
        label: t("presentations.form.fields.image_url.label"),
        placeholder: t("presentations.form.fields.image_url.placeholder"),
        tooltip: t("presentations.form.fields.image_url.tooltip"),
        helperTextWhenEmpty: t("presentations.form.fields.image_url.helperTextWhenEmpty"),
    },
    stock: {
        label: t("presentations.form.fields.stock.label"),
        placeholder: t("presentations.form.fields.stock.placeholder"),
        tooltip: t("presentations.form.fields.stock.tooltip"),
        type: "number",
        required: true,
        min: "0",
    },
    min_stock: {
        label: t("presentations.form.fields.min_stock.label"),
        placeholder: t("presentations.form.fields.min_stock.placeholder"),
        tooltip: t("presentations.form.fields.min_stock.tooltip"),
        type: "number",
        required: true,
        min: "0",
    },
    price: {
        label: t("presentations.form.fields.price.label"),
        placeholder: t("presentations.form.fields.price.placeholder"),
        tooltip: t("presentations.form.fields.price.tooltip"),
        type: "number",
        required: true,
        step: "0.01",
        min: "0.01",
    },
    expiration_date: {
        label: t("presentations.form.fields.expiration_date.label"),
        tooltip: t("presentations.form.fields.expiration_date.tooltip"),
        type: "date",
        required: true,
        min: todayISODate,
    },
    category: {
        label: t("presentations.form.fields.category.label"),
        tooltip: t("presentations.form.fields.category.tooltip"),
        type: "select",
        multiple: true,
        options: PRESENTATION_CATEGORY_VALUES,
        getOptionLabel: (c) => t(`presentationCategory.${c as PresentationCategory}`),
        required: true,
    },
    is_perishable: {
        label: t("presentations.form.fields.is_perishable.label"),
        tooltip: t("presentations.form.fields.is_perishable.tooltip"),
        type: "radio",
        radioOptions: [
            { value: "true", label: t("presentations.form.fields.is_perishable.yes") },
            { value: "false", label: t("presentations.form.fields.is_perishable.no") },
        ],
        required: true,
    },
});
