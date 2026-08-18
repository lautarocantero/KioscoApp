// SellFieldRegistry.ts
import type { TFunction } from "i18next";
import type { SellEditFormValues } from "@typings/sells/sellTypes";
import type { FieldConfig } from "@typings/shared/types/formCard.types";

export const getSellFieldRegistry = (
    t: TFunction
): Record<keyof SellEditFormValues, FieldConfig> => ({
    _id: {
        label: t("sells.form.fields._id.label"),
        tooltip: t("sells.form.fields._id.tooltip"),
        required: false,
    },
    purchase_date: {
        label: t("sells.form.fields.purchase_date.label"),
        tooltip: t("sells.form.fields.purchase_date.tooltip"),
        required: true,
        placeholder: t("sells.form.fields.purchase_date.placeholder"),
    },
    modification_date: {
        label: t("sells.form.fields.modification_date.label"),
        tooltip: t("sells.form.fields.modification_date.tooltip"),
        required: false,
    },
    seller_id: {
        label: t("sells.form.fields.seller_id.label"),
        tooltip: t("sells.form.fields.seller_id.tooltip"),
        required: false,
    },
    seller_name: {
        label: t("sells.form.fields.seller_name.label"),
        tooltip: t("sells.form.fields.seller_name.tooltip"),
        required: true,
    },
    payment_method: {
        label: t("sells.form.fields.payment_method.label"),
        tooltip: t("sells.form.fields.payment_method.tooltip"),
        required: true,
    },
    products: {
        label: t("sells.form.fields.products.label"),
        tooltip: t("sells.form.fields.products.tooltip"),
        required: false,
    },
    sub_total: {
        label: t("sells.form.fields.sub_total.label"),
        tooltip: t("sells.form.fields.sub_total.tooltip"),
        required: true,
        type: "number",
        step: `0.01`,
        min: `0`,
    },
    iva: {
        label: t("sells.form.fields.iva.label"),
        tooltip: t("sells.form.fields.iva.tooltip"),
        required: true,
        type: "number",
        step: `0.01`,
        min: `0`,
    },
    total_amount: {
        label: t("sells.form.fields.total_amount.label"),
        tooltip: t("sells.form.fields.total_amount.tooltip"),
        required: true,
        type: "number",
        step: `0.01`,
        min: `0`,
    },
    currency: {
        label: t("sells.form.fields.currency.label"),
        tooltip: t("sells.form.fields.currency.tooltip"),
        required: true,
    },
    status: {
        label: t("sells.form.fields.status.label"),
        tooltip: t("sells.form.fields.status.tooltip"),
        required: true,
    },
    amount_paid: {
        label: t("sells.form.fields.amount_paid.label"),
        tooltip: t("sells.form.fields.amount_paid.tooltip"),
        required: false,
        type: "number",
        step: `0.01`,
        min: `0`,
    },
    debtor_name: {
        label: t("sells.form.fields.debtor_name.label"),
        tooltip: t("sells.form.fields.debtor_name.tooltip"),
        required: false,
    },
    // No se renderizan en el form (no están en `fields` de SellFormFirstStep) —
    // son links de solo lectura que se muestran aparte en SellDetailAditionalData.
    settles_sell_id: {
        label: t("sells.form.fields.settles_sell_id.label"),
        tooltip: t("sells.form.fields.settles_sell_id.tooltip"),
        required: false,
    },
    settled_by_sell_id: {
        label: t("sells.form.fields.settled_by_sell_id.label"),
        tooltip: t("sells.form.fields.settled_by_sell_id.tooltip"),
        required: false,
    },
});