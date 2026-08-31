import type { PresentationCategory } from "@typings/presentation/presentationEnum";

// Ordena categorías por su label ya traducido (no por el valor crudo del
// enum), así el orden visible es alfabético en el idioma activo.
export const sortCategoriesAlphabetically = (
  categories: PresentationCategory[],
  getLabel: (category: PresentationCategory) => string
): PresentationCategory[] =>
  [...categories].sort((a, b) => getLabel(a).localeCompare(getLabel(b), undefined, { sensitivity: "base" }));

export default sortCategoriesAlphabetically;
