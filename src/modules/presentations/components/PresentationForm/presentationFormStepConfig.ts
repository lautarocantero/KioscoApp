import type { TFunction } from "i18next";
import { getPresentationFieldRegistry } from "./PresentationFieldRegistry";
import { isWeightSaleType } from "../../../shared/helpers/saleTypeHelper";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import type { FieldRegistry } from "@typings/shared/types/formCard.types";

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getPresentationStepsLabels                                         ║
║ Labels traducidos de los pasos del wizard, en orden.                  ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getPresentationStepsLabels = (t: TFunction): string[] => [
  t("presentations.form.steps.identity"),
  t("presentations.form.steps.identification"),
  t("presentations.form.steps.format"),
  t("presentations.form.steps.stock"),
  t("presentations.form.steps.commercial"),
  t("presentations.form.steps.providers"),
];

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getIdentificationStepConfig                                        ║
║ Campos del 2do step del form (identificación: sku, barcode, imagen). ║
║ No depende de sale_type, no necesita override de registry.            ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getIdentificationStepConfig = (t: TFunction) => {
  const fields: (keyof PresentationFormValues)[] = ["sku", "barcode", "image_url"];
  return { fields, registryOverride: getPresentationFieldRegistry(t) };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getFormatStepConfig                                                ║
║ Campos y overrides de registry para el 3er step del form              ║
║ (formato y tamaño), según si la presentación es por peso.             ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getFormatStepConfig = (t: TFunction, values: PresentationFormValues) => {
  const isWeight = isWeightSaleType(values.sale_type);

  // model_type no aplica a "weight" (se valida como notRequired en el schema).
  // model_unit SÍ aplica a ambos tipos de venta.
  const fields: (keyof PresentationFormValues)[] = isWeight
    ? ["model_size", "model_unit"]
    : ["model_type", "model_size", "model_unit"];

  return { isWeight, fields, registryOverride: getPresentationFieldRegistry(t) };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getStockStepConfig                                                 ║
║ Campos y overrides de registry para el 4to step del form (stock),    ║
║ según si la presentación es por peso.                                 ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getStockStepConfig = (t: TFunction, values: PresentationFormValues) => {
  const isWeight = isWeightSaleType(values.sale_type);
  const registry = getPresentationFieldRegistry(t);

  // "stock" ahora vive siempre en este step, para ambos tipos de venta.
  const fields: (keyof PresentationFormValues)[] = ["stock", "min_stock"];

  const registryOverride: FieldRegistry<PresentationFormValues> = isWeight
    ? {
        ...registry,
        stock: {
          ...registry.stock,
          label: t("presentations.form.fields.stock.labelWeight"),
          placeholder: t("presentations.form.fields.stock.placeholderWeight"),
          tooltip: t("presentations.form.fields.stock.tooltipWeight"),
        },
        min_stock: {
          ...registry.min_stock,
          label: t("presentations.form.fields.min_stock.labelWeight"),
          tooltip: t("presentations.form.fields.min_stock.tooltipWeight"),
          type: "text",
          placeholder: t("presentations.form.fields.min_stock.placeholderWeight"),
        },
      }
    : registry;

  return { isWeight, fields, registryOverride };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getPricingStepConfig                                               ║
║ Campos y overrides de registry para el 5to step del form (datos      ║
║ comerciales), según si la presentación es por peso.                   ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getPricingStepConfig = (t: TFunction, values: PresentationFormValues) => {
  const isWeight = isWeightSaleType(values.sale_type);
  const registry = getPresentationFieldRegistry(t);

  const fields: (keyof PresentationFormValues)[] = values.is_perishable
    ? ["price", "is_perishable", "expiration_date"]
    : ["price", "is_perishable"];

  const registryOverride = isWeight
    ? {
        ...registry,
        price: {
          ...registry.price,
          label: t("presentations.form.fields.price.labelWeight"),
          tooltip: t("presentations.form.fields.price.tooltipWeight"),
        },
      }
    : registry;

  return { isWeight, fields, registryOverride };
};
