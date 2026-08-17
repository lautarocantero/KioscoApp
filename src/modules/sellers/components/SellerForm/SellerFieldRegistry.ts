import type { FieldRegistry } from "@typings/shared/types/formCard.types";
import type { SellerFormValues } from "@typings/seller/sellerTypes";
import { AuthRoleEnum, ROLE_VALUES } from "@typings/auth/authEnums";
import i18n from "@i18n/i18n";

export const SELLER_FIELD_REGISTRY: FieldRegistry<SellerFormValues> = {
    name: {
        label: "Nombre",
        tooltip: "Nombre completo del vendedor",
        required: true,
    },
    email: {
        label: "Email",
        tooltip: "Email de contacto del vendedor (no editable)",
        required: true,
    },
    password: {
        label: "Contraseña",
        tooltip: "Contraseña para el acceso (solo al crear)",
        required: false,
        helperTextWhenEmpty: "Opcional — solo para creación",
    },
    rol: {
        label: "Rol",
        tooltip: "Rol del vendedor",
        type: "select",
        multiple: false,
        options: ROLE_VALUES,
        getOptionLabel: (v) => i18n.t(`roles.${v as AuthRoleEnum}`),
        required: true,
    },
};

export default SELLER_FIELD_REGISTRY;
