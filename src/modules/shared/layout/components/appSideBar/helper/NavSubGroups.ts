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
  "/providers": [
    {
      groupLabel: "Proveedores",
      links: [
        { label: "Listado", url: "/providers" },
        { label: "Crear",   url: "/provider-create" },
      ],
    },
  ],
};