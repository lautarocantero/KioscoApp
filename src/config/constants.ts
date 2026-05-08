
export const iva = 0;
export const REACT_APP_API_URL='https://kioscoappbackend.onrender.com'

export const PRODUCTS_STEPS_LABELS = [
    "Datos del producto",
];

export const PRODUCTS_VARIANT_STEPS_LABELS = [
    "Datos de la presentacion",
    "Datos de la presentación",
    "Stock y operación",
];

export const stepsConfig = PRODUCTS_STEPS_LABELS.map((label) => ({
    title: label,
    content: null,
}));