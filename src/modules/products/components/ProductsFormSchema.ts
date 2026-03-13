// # Schema: productFormSchema
// ## Descripción 📦
// Esquemas de validación Yup divididos por step del formulario de productos.
// Cada step exporta su propio schema parcial y sus tipos derivados.
//-----------------------------------------------------------------------------//

import * as Yup from "yup";

// ─── Step 1: Datos principales ───────────────────────────────────────────────
export const step1Schema = Yup.object().shape({
    name: Yup.string()
        .required("Campo requerido")
        .min(2, "Mínimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .trim(),
    description: Yup.string()
        .required("Campo requerido")
        .min(5, "Mínimo 5 caracteres")
        .max(500, "Máximo 500 caracteres")
        .trim(),
    sku: Yup.string()
        .required("Campo requerido")
        .trim(),
    price: Yup.number()
        .typeError("Debe ser un número")
        .required("Campo requerido")
        .positive("Debe ser mayor a 0"),
});

// ─── Step 2: Datos técnicos ───────────────────────────────────────────────────
export const step2Schema = Yup.object().shape({
    productType: Yup.string()
        .required("Campo requerido"),
    stock: Yup.number()
        .typeError("Debe ser un número")
        .required("Campo requerido")
        .integer("Debe ser entero")
        .min(0, "No puede ser negativo"),
    minStock: Yup.number()
        .typeError("Debe ser un número")
        .required("Campo requerido")
        .integer("Debe ser entero")
        .min(0, "No puede ser negativo"),
    productImage: Yup.mixed<File>()
        .nullable()
        .optional(),
});

// ─── Step 3: Datos técnicos II ────────────────────────────────────────────────
export const step3Schema = Yup.object().shape({
    size: Yup.string()
        .required("Campo requerido"),
    brand: Yup.string()
        .required("Campo requerido")
        .trim(),
    barcode: Yup.string()
        .optional()
        .trim(),
    expirationDate: Yup.date()
        .nullable()
        .optional()
        .typeError("Fecha inválida"),
});

// ─── Step 4: Datos finales ────────────────────────────────────────────────────
export const step4Schema = Yup.object().shape({
    supplierId: Yup.string()
        .required("Selecciona un proveedor"),
});

// ─── Schema completo (unión de todos los steps) ───────────────────────────────
export const productFormSchema = step1Schema
    .concat(step2Schema)
    .concat(step3Schema)
    .concat(step4Schema);

// ─── Tipos derivados ──────────────────────────────────────────────────────────
export type Step1Values = Yup.InferType<typeof step1Schema>;
export type Step2Values = Yup.InferType<typeof step2Schema>;
export type Step3Values = Yup.InferType<typeof step3Schema>;
export type Step4Values = Yup.InferType<typeof step4Schema>;
export type ProductFormValues = Yup.InferType<typeof productFormSchema>;

// ─── Campos por step (para trigger de validación parcial) ────────────────────
export const stepFieldsMap: Record<number, (keyof ProductFormValues)[]> = {
    0: ["name", "description", "sku", "price"],
    1: ["productType", "stock", "minStock"],
    2: ["size", "brand", "barcode", "expirationDate"],
    3: ["supplierId"],
};

// ─── Valores iniciales ────────────────────────────────────────────────────────
export const getProductFormInitialValues = (): ProductFormValues => ({
    // Step 1
    name: "",
    description: "",
    sku: "",
    price: 0,
    // Step 2
    productType: "",
    stock: 0,
    minStock: 0,
    productImage: null,
    // Step 3
    size: "",
    brand: "",
    barcode: "",
    expirationDate: null,
    // Step 4
    supplierId: "",
});
