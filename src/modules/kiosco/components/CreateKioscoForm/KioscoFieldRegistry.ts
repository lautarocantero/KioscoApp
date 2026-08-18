import type { FieldRegistry } from "@typings/shared/types/formCard.types";
import type { CreateKioscoFormValues } from "@typings/kiosco/kioscoTypes";

export const KIOSCO_FIELD_REGISTRY: FieldRegistry<CreateKioscoFormValues> = {
    name: {
        label: "Nombre del kiosco",
        tooltip: "El nombre con el que vas a identificar tu negocio",
        required: true,
    },
    address: {
        label: "Dirección",
        tooltip: "La dirección de tu kiosco",
        required: true,
    },
};

export default KIOSCO_FIELD_REGISTRY;
