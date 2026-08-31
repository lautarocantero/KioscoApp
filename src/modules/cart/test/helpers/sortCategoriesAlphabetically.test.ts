import { describe, it, expect } from "vitest";
import { sortCategoriesAlphabetically } from "../../helpers/sortCategoriesAlphabetically";
import { PresentationCategory } from "@typings/presentation/presentationEnum";

const LABELS: Record<PresentationCategory, string> = {
  [PresentationCategory.Bakery]: "Panadería",
  [PresentationCategory.Dairy]: "Lácteos",
} as Record<PresentationCategory, string>;

const getLabel = (category: PresentationCategory): string => LABELS[category];

describe("sortCategoriesAlphabetically", () => {
  it("ordena por label alfabético, no por el orden de entrada", () => {
    const result = sortCategoriesAlphabetically([PresentationCategory.Bakery, PresentationCategory.Dairy], getLabel);
    expect(result).toEqual([PresentationCategory.Dairy, PresentationCategory.Bakery]);
  });

  it("no muta el array original", () => {
    const input = [PresentationCategory.Bakery, PresentationCategory.Dairy];
    sortCategoriesAlphabetically(input, getLabel);
    expect(input).toEqual([PresentationCategory.Bakery, PresentationCategory.Dairy]);
  });

  it("devuelve un array vacío si no hay categorías", () => {
    expect(sortCategoriesAlphabetically([], getLabel)).toEqual([]);
  });
});
