import type { TFunction } from "i18next";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { ModelType } from "@typings/presentation/presentationEnum";

type PresentationVariant = Pick<Presentation, "model_type" | "model_size">;

// Label legible de la variante de una presentación (ej. "Botella, 500").
// Único lugar que arma este string — lo usan ProductExhibitorColumns y buildPresentationRows.
export const formatPresentationVariantLabel = (presentation: PresentationVariant, t: TFunction): string => {
  const modelTypeLabel = presentation.model_type
    ? t(`modelType.${presentation.model_type as ModelType}`, { defaultValue: presentation.model_type })
    : "";

  return `${modelTypeLabel}, ${presentation.model_size ?? ""}`.trim();
};

export default formatPresentationVariantLabel;
