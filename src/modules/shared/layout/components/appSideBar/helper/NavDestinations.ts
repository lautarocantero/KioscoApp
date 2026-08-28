import type { NavDestinationsMap } from "@typings/ui/sidebar.types";

// Destinos reales por sección activa, mostrados en SidebarSectionLinks.
// El sidebar.md de referencia imagina una lista más rica por sección
// (ej. "Ventas de hoy · Historial · Parciales sin cerrar · Cierre de caja"),
// pero hoy esas vistas no existen como rutas/filtros navegables — solo se
// listan acá los destinos que ya tienen una ruta real, para no linkear a
// nada. Sumar el resto a medida que esas vistas se construyan.
//
// "Productos con bajo stock" y "Productos más vendidos" son mock: todavía
// no hay una vista/filtro real para ellos, así que apuntan a /products
// (el listado general) y el count es un valor de ejemplo fijo, no un dato
// real — sacarlo del count/URL de acá en cuanto exista la vista propia.
export const NAV_DESTINATIONS: NavDestinationsMap = {
  "/products": [
    { label: "Categorías", url: "/categories-list" },
    { label: "Productos con bajo stock", url: "/products", count: 5 },
    { label: "Productos más vendidos", url: "/products", count: 12 },
  ],
  "/shop": [
    { label: "Reporte mensual", url: "/shop/stadistics" },
  ],
};
