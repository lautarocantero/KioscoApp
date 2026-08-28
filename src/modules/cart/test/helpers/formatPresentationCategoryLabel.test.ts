import { describe, it, expect } from "vitest";
import type { TFunction } from "i18next";
import { PresentationCategory } from "@typings/presentation/presentationEnum";
import { formatPresentationCategoryLabel } from "../../helpers/formatPresentationCategoryLabel";

const t = ((key: string, opts?: { defaultValue?: string }) => opts?.defaultValue ?? key) as TFunction;

describe("formatPresentationCategoryLabel", () => {
  it("retorna vacío cuando no hay categorías", () => {
    expect(formatPresentationCategoryLabel(undefined, t)).toBe("");
    expect(formatPresentationCategoryLabel([], t)).toBe("");
  });

  it("une varias categorías traducidas con coma", () => {
    const label = formatPresentationCategoryLabel(
      [PresentationCategory.Dairy, PresentationCategory.Bakery],
      t
    );
    expect(label).toBe("dairy, bakery");
  });
});
