// modules/products/schema/ProductFormSchema.ts

import * as Yup from "yup";
import type {
    ProductFormValues,
    ProductEditFormValues,
    ExistingProductInterface,
} from "@typings/product/productTypes";

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

// ── Schemas ───────────────────────────────────────────────────────────────────

export const productFormSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede exceder 100 caracteres")
        .required("El nombre del producto es requerido"),
    description: Yup.string()
        .trim()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede exceder 500 caracteres")
        .required("La descripción es requerida"),
    brand: Yup.string()
        .trim()
        .min(2, "La marca debe tener al menos 2 caracteres")
        .max(50, "La marca no puede exceder 50 caracteres")
        .required("La marca es requerida"),
    image_url: Yup.string()
        .url("Debe ser una URL válida")
        .nullable()
        .optional(),
});

export const productEditFormSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .required("El nombre es obligatorio"),
    description: Yup.string()
        .trim()
        .min(3, "La descripción debe tener al menos 3 caracteres")
        .required("La descripción es obligatoria"),
    brand: Yup.string()
        .trim()
        .min(2, "La marca debe tener al menos 2 caracteres")
        .required("La marca es obligatoria"),
    image_url: Yup.string()
        .url("Debe ser una URL válida")
        .nullable()
        .optional(),
});

// ── Step fields map ───────────────────────────────────────────────────────────

export const stepFieldsMap: Record<number, (keyof ProductFormValues)[]> = {
    0: ["name", "description", "brand", "image_url"],
};

export const editStepFieldsMap: Record<number, (keyof ProductEditFormValues)[]> = {
    0: ["name", "description", "brand", "image_url"],
};