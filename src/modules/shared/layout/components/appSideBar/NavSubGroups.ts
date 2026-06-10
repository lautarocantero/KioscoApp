import type { SubGroup } from "@typings/ui/uiModules";


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
        // Las rutas de presentaciones requieren un productId;
        // estos links son puntos de entrada generales.
        { label: "Listado",  url: "/products" },   // ajustá según tu flujo
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
        { label: "Editar",  url: "/shop-administrators-edit" },
      ],
    },
    {
      groupLabel: "Vendedores",
      links: [
        { label: "Listado", url: "/shop-sellers-list" },
        { label: "Crear",   url: "/shop-sellers-create" },
        { label: "Editar",  url: "/shop-sellers-edit" },
      ],
    },
  ],
  "/providers": [
    {
      groupLabel: "Proveedores",
      links: [
        { label: "Listado", url: "/providers-list" },
        { label: "Crear",   url: "/providers-create" },
        { label: "Editar",  url: "/providers-edit" },
      ],
    },
  ],
};