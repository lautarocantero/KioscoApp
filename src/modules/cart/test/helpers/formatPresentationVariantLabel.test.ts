import { describe, it, expect, vi } from "vitest";
import type { TFunction } from "i18next";
import { formatPresentationVariantLabel } from "../../helpers/formatPresentationVariantLabel";

const t = ((key: string, opts?: { defaultValue?: string }) => opts?.defaultValue ?? key) as TFunction;

describe("formatPresentationVariantLabel", () => {
  it("combina el label del model_type traducido con el model_size", () => {
    const label = formatPresentationVariantLabel({ model_type: "bottle", model_size: 500 }, t);
    expect(label).toBe("bottle, 500");
  });

  it("omite el model_type cuando viene vacío", () => {
    const label = formatPresentationVariantLabel({ model_type: "", model_size: 500 }, t);
    expect(label).toBe(", 500");
  });

  it("usa t con la key modelType.<value>", () => {
    const tSpy = vi.fn().mockReturnValue("Botella") as unknown as TFunction;
    formatPresentationVariantLabel({ model_type: "bottle", model_size: 500 }, tSpy);
    expect(tSpy).toHaveBeenCalledWith("modelType.bottle", { defaultValue: "bottle" });
  });
});
