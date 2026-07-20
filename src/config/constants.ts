import type { PresentationStatus } from "@typings/presentation/presentationEnum";
import { PresentationStatusColors } from "@typings/presentation/presentationEnum";
import type { DeleteDialogState } from "@typings/ui/dialog.types";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🚀 APP  🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const REACT_APP_API_URL='https://kioscoappbackend.onrender.com'

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🏪 NEGOCIO  🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪🏪                  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const iva = 0;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧱 LAYOUT  🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱                   ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const COLLAPSED_WIDTH = "72px";
export const EXPANDED_WIDTH = "220px";

export const SIDEBAR_STORAGE_KEY = "sidebar-expanded";

export const DRAG_THRESHOLD_PX = 80;

export const MOBILE_SIDE_PADDING = 32;
export const MIN_MOBILE_CARD_WIDTH = 260;

export const FILTER_MIN_WIDTH = 220;

export const CLOSED_DIALOG: DeleteDialogState = { open: false, id: "", name: "" };

export const MONTHS_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧪 VALIDACIÓN — REGEX  🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪         ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// nombres y marcas: letras (incl. acentos/unicode), números, espacios y puntuación básica
export const NAME_REGEX = /^[\p{L}\p{N}\s.,'&()-]+$/u;

// exige al menos una letra — evita nombres compuestos solo por números o símbolos
export const NOT_ONLY_NUMBERS_OR_SYMBOLS_REGEX = /[\p{L}]/u;

// ruta relativa a una imagen (termina en extensión conocida) o URL http(s) completa
export const RELATIVE_OR_URL_REGEX = /^(\/[\w\-./]+\.(png|jpe?g|webp|svg|gif)|https?:\/\/.+)$/i;

// código de barras: 8 a 14 dígitos numéricos (cubre EAN-8, UPC-A, EAN-13 y códigos internos)
export const BARCODE_REGEX = /^\d{8,14}$/;

// tamaño/presentación: número (con . o , decimal) + unidad de medida conocida
export const MODEL_SIZE_REGEX = /^\d+([.,]\d+)?\s?(ml|l|g|kg|oz|lb|cc)$/i;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📝 FORMULARIOS  📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝              ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const PRODUCTS_STEPS_LABELS = [
    "Crear Producto",
];

export const PRODUCTS_EDIT_STEPS_LABELS = [
    "Editar Producto",
];

export const PRODUCTS_VARIANT_STEPS_LABELS = [
    "Identidad",
    "Datos de catálogo",
    "Stock",
    "Datos comerciales",
];

export const stepsConfig = PRODUCTS_STEPS_LABELS.map((label) => ({
    title: label,
    content: null,
}));

export const editStepsConfig = PRODUCTS_EDIT_STEPS_LABELS.map((label) => ({
    title: label,
    content: null,
}));

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🎨 PRESENTACIÓN  🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️        ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// usado para mostrar el estado de una presentacion

export const STATUS_CONFIG: Record<PresentationStatus,
    { label: string; color: PresentationStatusColors }
> = {
    available:    { label: "Disponible",    color: PresentationStatusColors.Success },
    out_of_stock: { label: "Sin stock",     color: PresentationStatusColors.Error   },
    unavailable:  { label: "No disponible", color: PresentationStatusColors.Default },
};