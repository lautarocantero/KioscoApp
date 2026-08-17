import type { PresentationStatus } from "@typings/presentation/presentationEnum";
import { PresentationStatusColors } from "@typings/presentation/presentationEnum";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import { ShopSalesRange } from "@typings/shop/shopEnums";
import type { DeleteDialogState, RestockDialogState } from "@typings/ui/dialog.types";

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

export const CLOSED_RESTOCK_DIALOG: RestockDialogState = { open: false, id: "", name: "", stock: 0, minStock: 0 };

// formatea fecha

export const MONTHS_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// cantidad de elementos en el product exhibitor
export const PAGE_SIZE_PRODUCT_EXHIBITOR = 20;
// cantidad de elementos en el product exhibitor skeleton
export const SKELETON_COUNT = 20;

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
export const MODEL_SIZE_REGEX = /^\d+([.,]\d+)?\s?(ml|l|g|kg|oz|lb|cc|u)$/i;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📝 FORMULARIOS  📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝              ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const PRODUCTS_STEPS_LABELS = [
    "Crear Producto",
];

export const PRODUCTS_EDIT_STEPS_LABELS = [
    "Editar Producto",
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

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🎨 CARRITO   🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️              ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const SELL_STATUS_OPTIONS = [
    { value: SellStatusEnum.Completada, label: 'Abono total' },
    { value: SellStatusEnum.Parcial, label: 'Abono parcial' },
];

export const PRODUCTS_EXHIBITOR_ANCHOR_ID = "seller-products-exhibitor";

// Cantidad de días agregados por rango del gráfico de ventas de /shop.
// No es un label (no hay texto), por eso vive acá y no en las traducciones.
export const SHOP_SALES_RANGE_DAYS: Record<ShopSalesRange, number> = {
    [ShopSalesRange.SevenDays]: 7,
    [ShopSalesRange.Fortnight]: 15,
    [ShopSalesRange.Month]: 30,
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ ⚙️ AJUSTES  ⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const FONT_SIZE_MIN = 12;
export const FONT_SIZE_MAX = 24;
export const FONT_SIZE_DEFAULT = 16;
export const FONT_SIZE_STORAGE_KEY = "appFontSize";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🎨 BOLETAS   🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️              ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const MAX_VISIBLE_ITEMS = 15;

export const RECEIPT_ADVICE_ITEMS: string[] = [
  "Asegurate de que el archivo tenga los encabezados correctos.",
  "No modifiqués el orden de las columnas.",
  "Verificá que los códigos de producto existan en el catálogo.",
];

export const RECEIPT_HELP_DESCRIPTION =
  "Contactá al soporte si tenés dudas sobre el formato o la carga de archivos.";

export const RECEIPT_ACCEPTED_FORMATS = [".xlsx", ".xls"];

export const RECEIPT_MAX_SIZE = "10 MB";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🎨 IMAGENES   🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️              ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const FALLBACK_PRODUCT_IMAGE = "/images/stocko_images/empty_product.png";