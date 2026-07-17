import type { ProductFormValues, ProductEditFormValues } from "@typings/product/productTypes";
import type { FieldRegistry } from "@typings/shared/types/formCard.types";

export const PRODUCT_FIELD_REGISTRY: FieldRegistry<ProductFormValues & ProductEditFormValues> = {
    name: {
        label: "Nombre del producto",
        tooltip: "Nombre con el que se identifica este producto en el catálogo",
        required: true,
    },
    brand: {
        label: "Marca",
        tooltip: "Marca o fabricante del producto",
        required: true,
    },
    description: {
        label: "Descripción",
        tooltip: "Descripción general del producto, común a todas sus presentaciones",
        required: true,
        multiline: true,
        rows: 4,
    },
    image_url: {
        label: "URL de imagen",
        placeholder: "/images/productExample/mi-producto.png",
        tooltip: "Ruta relativa o URL externa hacia la imagen del producto",
        helperTextWhenEmpty: "Opcional — ruta relativa o URL externa",
    },
};