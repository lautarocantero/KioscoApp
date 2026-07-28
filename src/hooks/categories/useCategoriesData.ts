// hooks/categories/useCategoriesData.ts
import type { LinkDataResult } from "@typings/ui/layout.types";

// TODO: reemplazar por fetch real cuando el backend esté listo
export const useCategoriesListLinkData = (): LinkDataResult => ({
  value: "12",
  subtitle: "12 categorías registradas",
});

export const useCategoriesCreateLinkData = (): LinkDataResult => ({
  subtitle: "Nueva categoría de productos",
});

export const useCategoriesEditLinkData = (): LinkDataResult => ({
  subtitle: "Modificá una categoría existente",
});