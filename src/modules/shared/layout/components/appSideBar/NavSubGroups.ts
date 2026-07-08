import type { SubGroup } from "@typings/ui/sidebar.types";


export const NAV_SUBGROUPS: Record<string, SubGroup[]> = {
  "/products": [
    {
      groupLabel: "Productos",
      links: [
        { label: "Listado",  url: "/products" },
        { label: "Crear",    url: "/products-create" },
      ],
    },
    {
      groupLabel: "Presentaciones",
      links: [
        { label: "Crear",    url: "/products-create" },
      ],
    },
  ],
  "/shop": [
    {
      groupLabel: "Administradores",
      links: [
        { label: "Listado", url: "/shop-administrators-list" },
        { label: "Crear",   url: "/shop-administrators-create" },
      ],
    },
    {
      groupLabel: "Vendedores",
      links: [
        { label: "Listado", url: "/shop-sellers-list" },
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