import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import type { FieldRegistry } from "@typings/shared/types/formCard.types";

export const PRESENTATION_FIELD_REGISTRY: FieldRegistry<PresentationFormValues> = {
    name: {
        label: "Nombre",
        placeholder: "Ej: Coca Cola Lata 500ml",
        tooltip: "Nombre visible de la presentación, por ejemplo el envase y tamaño del producto",
        required: true,
    },
    description: {
        label: "Descripcion",
        placeholder: "Ej: Coca Cola Lata 500ml",
        tooltip: "Detalle o aclaración adicional sobre esta presentación",
        required: true,
    },
    barcode: {
        label: "Código de barras",
        placeholder: "Ej: 7791234567890",
        tooltip: "Código de barras del producto, si lo tiene",
        helperTextWhenEmpty: "Opcional — código de barras físico",
    },
    sku: {
        label: "SKU",
        placeholder: "Ej: COK-500ML-BLACK",
        tooltip: "Código único que identifica esta presentación en el inventario",
        required: true,
    },
    model_type: {
        label: "Tipo de modelo",
        placeholder: "Ej: Lata, Botella, Tetra Pack",
        tooltip: "Formato o envase en el que se presenta el producto",
        required: true,
    },
    model_size: {
        label: "Tamaño/Presentación",
        placeholder: "Ej: 500ml, 1L, 2L",
        tooltip: "Tamaño, volumen o cantidad de esta presentación",
        required: true,
    },
    image_url: {
        label: "URL de imagen",
        placeholder: "/images/productExample/mi-producto.png",
        tooltip: "Ruta relativa o URL externa hacia la imagen de esta presentación",
        helperTextWhenEmpty: "Opcional — ruta relativa o URL externa",
    },
    stock: {
        label: "Stock",
        placeholder: "Ej: 100",
        tooltip: "Cantidad de unidades disponibles actualmente en inventario",
        type: "number",
        required: true,
    },
    min_stock: {
        label: "Stock mínimo",
        placeholder: "Ej: 10",
        tooltip: "Umbral mínimo de unidades a partir del cual se avisa que el stock es bajo",
        type: "number",
        required: true,
    },
    price: {
        label: "Precio",
        placeholder: "Ej: 1.50",
        tooltip: "Precio de venta al público de esta presentación",
        type: "number",
        required: true,
        step: "0.01",
    },
    expiration_date: {
        label: "Fecha de vencimiento",
        tooltip: "Fecha límite hasta la cual esta presentación puede venderse",
        type: "date",
        required: true,
    },
};