import type { FieldRegistry } from "@typings/shared/types/formCard.types";
import type { JoinKioscoFormValues } from "@typings/kiosco/kioscoTypes";

export const JOIN_KIOSCO_FIELD_REGISTRY: FieldRegistry<JoinKioscoFormValues> = {
    invite_code: {
        label: "Código de invitación",
        tooltip: "El código que te compartió el administrador del kiosco",
        required: true,
    },
};

export default JOIN_KIOSCO_FIELD_REGISTRY;
