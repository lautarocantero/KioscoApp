import type { SubGroup } from "@typings/ui/sidebar.types";


export const NAV_SUBGROUPS: Record<string, SubGroup[]> = {
  "/sells": [
    {
      groupLabel: "Ventas",
      links: [
        { label: "Listado",  url: "/sells" },
        { label: "Nueva venta",    url: "/new-sell" },
      ],
    },
  ],
  "/products": [
    {
      groupLabel: "Productos",
      links: [
        { label: "Listado",  url: "/products" },
        { label: "Crear",    url: "/product-create" },
      ],
    },
  ],
  "/shop": [
    {
      groupLabel: "Vendedores",
      links: [
        { label: "Listado", url: "/shop-sellers" },
        { label: "Crear",   url: "/shop-sellers-create" },
      ],
    },
  ],
  "/providers": [
    {
      groupLabel: "Proveedores",
      links: [
        { label: "Listado", url: "/providers-list" },
        { label: "Crear",   url: "/providers-create" },
      ],
    },
  ],
};