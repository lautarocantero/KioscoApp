export const iva = 0;
export const REACT_APP_API_URL='https://kioscoappbackend.onrender.com'

export const PRODUCTS_STEPS_LABELS = [
    "Crear Producto",
];

export const PRODUCTS_EDIT_STEPS_LABELS = [
    "Editar Producto",
];

export const PRODUCTS_VARIANT_STEPS_LABELS = [
    "Datos de la presentacion",
    "Stock y operación",
    "Caducidad",
];

export const stepsConfig = PRODUCTS_STEPS_LABELS.map((label) => ({
    title: label,
    content: null,
}));

export const editStepsConfig = PRODUCTS_EDIT_STEPS_LABELS.map((label) => ({
    title: label,
    content: null,
}));