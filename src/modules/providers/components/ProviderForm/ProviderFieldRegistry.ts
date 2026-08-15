import type { FieldRegistry } from "@typings/shared/types/formCard.types";
import type { ProviderFormValues } from "@typings/provider/providerTypes";

export const PROVIDER_FIELD_REGISTRY: FieldRegistry<ProviderFormValues> = {
    name: {
        label: "Nombre",
        tooltip: "Nombre o razón social del proveedor",
        required: true,
    },
    valoration: {
        label: "Valoración",
        tooltip: "Valoración del proveedor, de 1 a 5 estrellas",
        type: "rating",
        maxRating: 5,
        required: true,
    },
    contact_phone: {
        label: "Teléfono de contacto",
        tooltip: "Número de teléfono para contactar al proveedor",
        required: true,
    },
    contact_email: {
        label: "Email de contacto",
        tooltip: "Email para contactar al proveedor",
        required: true,
    },
};

export default PROVIDER_FIELD_REGISTRY;
