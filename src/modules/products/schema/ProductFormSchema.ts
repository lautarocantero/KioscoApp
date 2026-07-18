// modules/products/schema/ProductFormSchema.ts

import * as Yup from "yup";
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

const nameField = Yup.string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .matches(NAME_REGEX, "El nombre contiene caracteres no permitidos")
    .matches(NOT_ONLY_NUMBERS_OR_SYMBOLS_REGEX, "El nombre debe contener al menos una letra")
    .required("El nombre del producto es requerido");

const brandField = Yup.string()
    .trim()
    .min(2, "La marca debe tener al menos 2 caracteres")
    .max(50, "La marca no puede exceder 50 caracteres")
    .matches(NAME_REGEX, "La marca contiene caracteres no permitidos")
    .matches(NOT_ONLY_NUMBERS_OR_SYMBOLS_REGEX, "La marca debe contener al menos una letra")
    .required("La marca es requerida");

const descriptionField = Yup.string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres")
    .required("La descripción es requerida");

const imageUrlField = Yup.string()
    .trim()
    .test(
        "valid-image-path",
        "Debe ser una ruta relativa (ej: /images/foto.png) o una URL válida (https://...)",
        (value) => !value || RELATIVE_OR_URL_REGEX.test(value),
    );

// ── Schemas ───────────────────────────────────────────────────────────────────

const baseShape = {
    name: nameField,
    description: descriptionField,
    brand: brandField,
    image_url: imageUrlField,
};

export const productFormSchema = Yup.object(baseShape);
export const productEditFormSchema = Yup.object(baseShape);

// ── Step fields map ───────────────────────────────────────────────────────────

export const stepFieldsMap: Record<number, (keyof ProductFormValues)[]> = {
    0: ["name", "description", "brand", "image_url"],
};

export const editStepFieldsMap: Record<number, (keyof ProductEditFormValues)[]> = {
    0: ["name", "description", "brand", "image_url"],
};