import type { TFunction } from "i18next";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";

// Label legible de las categorías de una presentación (ej. "Almacén, Bebidas").
// Único lugar que arma este string — lo usan ProductExhibitorColumns y buildPresentationRows.
export const formatPresentationCategoryLabel = (category: PresentationCategory[] | undefined, t: TFunction): string => {
  if (!category || category.length === 0) return "";

  return category.map((cat) => t(`presentationCategory.${cat}`, { defaultValue: cat })).join(", ");
};

export default formatPresentationCategoryLabel;
