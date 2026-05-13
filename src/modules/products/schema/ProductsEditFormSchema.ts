import * as Yup from "yup";
import type { ExistingProductInterface, ProductEditFormValues } from "@typings/product/productTypes";


// # Schema: ProductsEditFormSchema
//
// ## Descripción 📦
// Validaciones Yup y función de valores iniciales para el formulario de edición.
//
// ## Exports
// - `productEditFormSchema`       → schema Yup para Formik
// - `getProductEditInitialValues` → hidrata el formulario con datos del producto existente
// - `editStepFieldsMap`           → mapa de campos por paso (para validación paso a paso)
//-----------------------------------------------------------------------------//

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

    gallery_urls: Yup.array()
        .of(Yup.string().url("Cada URL de galería debe ser válida"))
        .optional(),
});

/** Hidrata el formulario con los datos del producto existente.
 *  Si `product` es null (aún cargando), devuelve campos vacíos. */
export const getProductEditInitialValues = (
    product: ExistingProductInterface | null
): ProductEditFormValues => ({
    name:         product?.name         ?? "",
    description:  product?.description  ?? "",
    brand:        product?.brand        ?? "",
    image_url:    product?.image_url    ?? "",
    gallery_urls: product?.gallery_urls ?? [],
});

/** Campos del paso 0 — usado en `useProductsForm` para validar solo el paso activo. */
export const editStepFieldsMap: Record<number, (keyof ProductEditFormValues)[]> = {
    0: ["name", "description", "brand", "image_url", "gallery_urls"],
};
