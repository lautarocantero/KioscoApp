import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import type { FieldRegistry } from "@typings/shared/types/formCard.types";

const todayISODate = new Date().toISOString().slice(0, 10);

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
        tooltip: "Código de barras del producto (EAN-8, UPC-A o EAN-13), si lo tiene",
        helperTextWhenEmpty: "Opcional — 8 a 13 dígitos numéricos",
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
        placeholder: "Ej: 500ml, 1l, 2kg",
        tooltip: "Tamaño, volumen o cantidad de esta presentación (número + unidad: ml, l, g, kg, oz, lb, cc)",
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
        min: "0",
    },
    min_stock: {
        label: "Stock mínimo",
        placeholder: "Ej: 10",
        tooltip: "Umbral mínimo de unidades a partir del cual se avisa que el stock es bajo",
        type: "number",
        required: true,
        min: "0",
    },
    price: {
        label: "Precio",
        placeholder: "Ej: 1.50",
        tooltip: "Precio de venta al público de esta presentación",
        type: "number",
        required: true,
        step: "0.01",
        min: "0.01",
    },
    expiration_date: {
        label: "Fecha de vencimiento",
        tooltip: "Fecha límite hasta la cual esta presentación puede venderse",
        type: "date",
        required: true,
        min: todayISODate,
    },
};