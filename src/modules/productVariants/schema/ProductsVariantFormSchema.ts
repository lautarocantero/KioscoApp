import type { ProductFormValues } from "@typings/product/productTypes";
import * as Yup from "yup";


export const getProductFormInitialValues = (): ProductFormValues => ({
    // Step 1
    name: "",
    description: "",
    brand: "",
    image_url: "",

    // Step 2
    sku: "",
    model_type: "",
    model_size: "",
    price: 0,
    variant_image_url: "",
    gallery_urls: [],

    // Step 3
    stock: 0,
    min_stock: 0,
    expiration_date: null,
});

export const productFormSchema = Yup.object().shape({
    // Step 1
    name: Yup.string()
        .required("El nombre del producto es requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede exceder 100 caracteres"),
    description: Yup.string()
        .required("La descripción es requerida")
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede exceder 500 caracteres"),
    brand: Yup.string()
        .required("La marca es requerida")
        .min(2, "La marca debe tener al menos 2 caracteres")
        .max(50, "La marca no puede exceder 50 caracteres"),
    image_url: Yup.string()
        .url("Debe ser una URL válida")
        .optional(),

    // Step 2
    sku: Yup.string()
        .max(50, "El SKU no puede exceder 50 caracteres"),
    model_type: Yup.string(),
    model_size: Yup.string()
        .min(2, "El tamaño debe tener al menos 2 caracteres"),
    price: Yup.number()
        .required("El precio es requerido")
        .min(0, "El precio no puede ser negativo")
        .typeError("El precio debe ser un número"),
    variant_image_url: Yup.string()
        .url("Debe ser una URL válida")
        .optional(),
    gallery_urls: Yup.array()
        .of(Yup.string().url("Cada URL de galería debe ser válida"))
        .optional(),

    // Step 3
    stock: Yup.number()
        .required("El stock es requerido")
        .min(0, "El stock no puede ser negativo")
        .typeError("El stock debe ser un número"),
    min_stock: Yup.number()
        .required("El stock mínimo es requerido")
        .min(0, "El stock mínimo no puede ser negativo")
        .typeError("El stock mínimo debe ser un número"),
    expiration_date: Yup.date()
        .optional()
        .nullable()
        .typeError("La fecha debe ser válida"),
});

export const stepFieldsMap: Record<number, (keyof ProductFormValues)[]> = {
    0: ["name", "description", "brand", "image_url"],
    1: ["sku", "model_type", "model_size", "price", "variant_image_url", "gallery_urls"],
    2: ["stock", "min_stock", "expiration_date"],
};