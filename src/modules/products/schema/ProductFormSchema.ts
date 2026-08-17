// modules/products/schema/ProductFormSchema.ts

import * as Yup from "yup";
import type { TFunction } from "i18next";
import type {
    ProductFormValues,
    ProductEditFormValues,
    ExistingProductInterface,
} from "@typings/product/productTypes";
import {
    NAME_REGEX,
    NOT_ONLY_NUMBERS_OR_SYMBOLS_REGEX,
    RELATIVE_OR_URL_REGEX,
} from "../../../config/constants";

// ── Initial values ────────────────────────────────────────────────────────────

export const getProductFormInitialValues = (): ProductFormValues => ({
    name:        "",
    description: "",
    brand:       "",
    image_url:   "",
});

export const getProductEditInitialValues = (
    product: ExistingProductInterface | null
): ProductEditFormValues => ({
    name:         product?.name         ?? "",
    description:  product?.description  ?? "",
    brand:        product?.brand        ?? "",
    image_url:    product?.image_url    ?? "",
});

// ── Field validators (compartidos entre create/edit) ─────────────────────────

const getNameField = (t: TFunction) =>
    Yup.string()
        .trim()
        .min(3, t("products.validation.name.min"))
        .max(100, t("products.validation.name.max"))
        .matches(NAME_REGEX, t("products.validation.name.matches"))
        .matches(NOT_ONLY_NUMBERS_OR_SYMBOLS_REGEX, t("products.validation.name.notOnlyNumbers"))
        .required(t("products.validation.name.required"));

const getBrandField = (t: TFunction) =>
    Yup.string()
        .trim()
        .min(2, t("products.validation.brand.min"))
        .max(50, t("products.validation.brand.max"))
        .matches(NAME_REGEX, t("products.validation.brand.matches"))
        .matches(NOT_ONLY_NUMBERS_OR_SYMBOLS_REGEX, t("products.validation.brand.notOnlyNumbers"))
        .required(t("products.validation.brand.required"));

const getDescriptionField = (t: TFunction) =>
    Yup.string()
        .trim()
        .min(10, t("products.validation.description.min"))
        .max(500, t("products.validation.description.max"))
        .required(t("products.validation.description.required"));

const getImageUrlField = (t: TFunction) =>
    Yup.string()
        .trim()
        .test(
            "valid-image-path",
            t("products.validation.image_url.invalid"),
            (value) => !value || RELATIVE_OR_URL_REGEX.test(value),
        );

// ── Schemas ───────────────────────────────────────────────────────────────────

const getBaseShape = (t: TFunction) => ({
    name: getNameField(t),
    description: getDescriptionField(t),
    brand: getBrandField(t),
    image_url: getImageUrlField(t),
});

export const getProductFormSchema = (t: TFunction) => Yup.object(getBaseShape(t));
export const getProductEditFormSchema = (t: TFunction) => Yup.object(getBaseShape(t));

// ── Step fields map ───────────────────────────────────────────────────────────

export const stepFieldsMap: Record<number, (keyof ProductFormValues)[]> = {
    0: ["name", "description", "brand", "image_url"],
};

export const editStepFieldsMap: Record<number, (keyof ProductEditFormValues)[]> = {
    0: ["name", "description", "brand", "image_url"],
};