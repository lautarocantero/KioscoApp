import { PRESENTATION_FIELD_REGISTRY } from "./PresentationFieldRegistry";
import { getPriceLabel, isWeightSaleType } from "../../../shared/helpers/saleTypeHelper";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import type { FieldRegistry } from "@typings/shared/types/formCard.types";

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getIdentificationStepConfig                                        ║
║ Campos del 2do step del form (identificación: sku, barcode, imagen). ║
║ No depende de sale_type, no necesita override de registry.            ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getIdentificationStepConfig = () => {
  const fields: (keyof PresentationFormValues)[] = ["sku", "barcode", "image_url"];
  return { fields, registryOverride: PRESENTATION_FIELD_REGISTRY };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getFormatStepConfig                                                ║
║ Campos y overrides de registry para el 3er step del form              ║
║ (formato y tamaño), según si la presentación es por peso.             ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getFormatStepConfig = (values: PresentationFormValues) => {
  const isWeight = isWeightSaleType(values.sale_type);

  const fields: (keyof PresentationFormValues)[] = isWeight
    ? ["model_size"]
    : ["model_type", "model_size", "model_unit"];

  const registryOverride = isWeight
    ? {
        ...PRESENTATION_FIELD_REGISTRY,
        model_size: {
          ...PRESENTATION_FIELD_REGISTRY.model_size,
          label: "Cantidad en stock (gramos)",
          placeholder: "Ej: 800",
          tooltip: "Peso total disponible de este producto, en gramos. Esto define el stock inicial.",
        },
      }
    : PRESENTATION_FIELD_REGISTRY;

  return { isWeight, fields, registryOverride };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getStockStepConfig                                                 ║
║ Campos y overrides de registry para el 4to step del form (stock),    ║
║ según si la presentación es por peso.                                 ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getStockStepConfig = (values: PresentationFormValues) => {
  const isWeight = isWeightSaleType(values.sale_type);

  const fields: (keyof PresentationFormValues)[] = isWeight
    ? ["min_stock"]
    : ["stock", "min_stock"];

  const registryOverride: FieldRegistry<PresentationFormValues> = isWeight
    ? {
        ...PRESENTATION_FIELD_REGISTRY,
        min_stock: {
          ...PRESENTATION_FIELD_REGISTRY.min_stock,
          label: "Cantidad mínima de stock (gramos)",
          tooltip: "Umbral mínimo de gramos a partir del cual se avisa que el stock es bajo",
          type: "text",
          placeholder: "Ej: 250g",
        },
      }
    : PRESENTATION_FIELD_REGISTRY;

  return { isWeight, fields, registryOverride };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getPricingStepConfig                                               ║
║ Campos y overrides de registry para el 5to step del form (datos      ║
║ comerciales), según si la presentación es por peso.                   ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getPricingStepConfig = (values: PresentationFormValues) => {
  const isWeight = isWeightSaleType(values.sale_type);

  const fields: (keyof PresentationFormValues)[] = values.is_perishable
    ? ["price", "is_perishable", "expiration_date"]
    : ["price", "is_perishable"];

  const registryOverride = isWeight
    ? {
        ...PRESENTATION_FIELD_REGISTRY,
        price: {
          ...PRESENTATION_FIELD_REGISTRY.price,
          label: getPriceLabel(values.sale_type),
          placeholder: "Ej: 1.50",
          tooltip: "Precio de venta al público cada 100 gramos de esta presentación",
        },
      }
    : PRESENTATION_FIELD_REGISTRY;

  return { isWeight, fields, registryOverride };
};