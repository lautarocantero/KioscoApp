import type { TFunction } from "i18next";
import type { ProductFormValues, ProductEditFormValues } from "@typings/product/productTypes";
import type { FieldRegistry } from "@typings/shared/types/formCard.types";

export const getProductFieldRegistry = (
    t: TFunction
): FieldRegistry<ProductFormValues & ProductEditFormValues> => ({
    name: {
        label: t("products.form.fields.name.label"),
        tooltip: t("products.form.fields.name.tooltip"),
        required: true,
    },
    brand: {
        label: t("products.form.fields.brand.label"),
        tooltip: t("products.form.fields.brand.tooltip"),
        required: true,
    },
    description: {
        label: t("products.form.fields.description.label"),
        tooltip: t("products.form.fields.description.tooltip"),
        required: true,
        multiline: true,
        rows: 4,
    },
    image_url: {
        label: t("products.form.fields.image_url.label"),
        placeholder: "/images/productExample/mi-producto.png",
        tooltip: t("products.form.fields.image_url.tooltip"),
        helperTextWhenEmpty: t("products.form.fields.image_url.helperTextWhenEmpty"),
    },
});