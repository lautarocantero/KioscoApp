import * as Yup from "yup";
import { AuthRoleEnum, ROLE_VALUES } from "@typings/auth/authEnums";
import type { SellerWithRole } from "@typings/seller/sellerTypes";


export const sellerEditFormSchema = Yup.object({
    name: Yup.string().trim().min(1).required("Nombre requerido"),
    email: Yup.string().email("Email inválido").required("Email requerido"),
    rol: Yup.mixed<AuthRoleEnum>()
        .oneOf(ROLE_VALUES, "Rol inválido")
        .required("Rol requerido"),
});


export const getSellerEditInitialValues = (seller: SellerWithRole | null) => ({
    name:                   seller?.name ?? "",
    email:                  seller?.email ?? "",
    rol:                    seller?.role ?? AuthRoleEnum.Seller,
});