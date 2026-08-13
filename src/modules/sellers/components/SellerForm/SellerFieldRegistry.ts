import type { FieldRegistry } from "@typings/shared/types/formCard.types";
import type { Seller } from "@typings/seller/sellerTypes";

type SellerFormValues = Pick<Seller, "name" | "email" | "rol"> & { password?: string };

export const SELLER_FIELD_REGISTRY: FieldRegistry<SellerFormValues> = {
    name: {
        label: "Nombre",
        tooltip: "Nombre completo del vendedor",
        required: true,
    },
    email: {
        label: "Email",
        tooltip: "Email de contacto del vendedor",
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
        required: true,
    },
};

export default SELLER_FIELD_REGISTRY;
