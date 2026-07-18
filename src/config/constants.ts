import type { PresentationStatus } from "@typings/presentation/presentationEnum";
import { PresentationStatusColors } from "@typings/presentation/presentationEnum";

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
// ║ 📦 PRODUCTOS  📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦             ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🏷️ PRECIOS Y STOCK  🏷️💰📊🏷️💰📊🏷️💰📊🏷️💰📊🏷️💰📊🏷️            ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛒 CATÁLOGO  🛒🛍️🛒🛍️🛒🛍️🛒🛍️🛒🛍️🛒🛍️🛒🛍️🛒🛍️🛒🛍️🛒               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// /*══════════════════════════════════════════════════════════════════════╗
// ║ ✅ DISPONIBILIDAD  ✅❌✅❌✅❌✅❌✅❌✅❌✅❌✅❌✅❌✅❌✅❌            ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🎨 PRESENTACIÓN  🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️🎨🖼️        ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// usado para mostrar el estado de una presentacion

export const STATUS_CONFIG: Record<
    PresentationStatus,
    { label: string; color: PresentationStatusColors }
> = {
    available:    { label: "Disponible",    color: PresentationStatusColors.Success },
    out_of_stock: { label: "Sin stock",     color: PresentationStatusColors.Error   },
    unavailable:  { label: "No disponible", color: PresentationStatusColors.Default },
};