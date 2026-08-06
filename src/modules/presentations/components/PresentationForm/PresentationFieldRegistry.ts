import { PRESENTATION_CATEGORY_VALUES, PresentationCategory, SALE_TYPE_VALUES, ModelType, MODEL_TYPE_VALUES, ModelUnit, MODEL_UNIT_VALUES, type SaleType } from "@typings/presentation/presentationEnum";
import { MODEL_TYPE_LABELS, MODEL_UNIT_LABELS, PRESENTATION_CATEGORY_LABELS, SALE_TYPE_LABELS } from "@typings/presentation/presentationLabels";
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
        tooltip: "Formato o envase en el que se presenta el producto",
        type: "select",
        multiple: false,
        options: MODEL_TYPE_VALUES,
        getOptionLabel: (v) => MODEL_TYPE_LABELS[v as ModelType],
        required: true,
    },
    model_size: {
        label: "Tamaño",
        placeholder: "Ej: 500, 25, 6",
        tooltip: "Cantidad numérica de esta presentación. Se combina con el tipo de presentación (ej: 500 + ml, 25 + hojas)",
        type: "number",
        required: true,
        min: "1",
    },
    model_unit: {
        label: "Tipo de presentación",
        tooltip: "Unidad de medida de esta presentación (unidades, ml, litros, hojas, etc.)",
        type: "select",
        multiple: false,
        options: MODEL_UNIT_VALUES,
        getOptionLabel: (v) => MODEL_UNIT_LABELS[v as ModelUnit],
        required: true,
    },
    sale_type: {
        label: "Tipo de venta",
        tooltip: "Define si esta presentación se vende por unidad o por peso",
        type: "select",
        multiple: false,
        options: SALE_TYPE_VALUES,
        getOptionLabel: (v) => SALE_TYPE_LABELS[v as SaleType],
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
    category: {
        label: "Categoría",
        tooltip: "Categoría a la que pertenece esta presentación",
        type: "select",
        multiple: true,
        options: PRESENTATION_CATEGORY_VALUES,
        getOptionLabel: (c) => PRESENTATION_CATEGORY_LABELS[c as PresentationCategory],
        required: true,
    },
    is_perishable: {
        label: "¿Es un producto perecedero?",
        tooltip: "Los perecederos (lácteos, comida, etc.) requieren fecha de vencimiento. Productos como cuadernos o artículos de librería no la necesitan.",
        type: "radio",
        radioOptions: [
            { value: "true", label: "Sí, es perecedero" },
            { value: "false", label: "No, no vence" },
        ],
        required: true,
    },
};