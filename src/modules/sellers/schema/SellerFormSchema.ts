import * as Yup from "yup";


export const sellerEditFormSchema = Yup.object({
    name: Yup.string().trim().min(1).required("Nombre requerido"),
    email: Yup.string().email("Email inválido").required("Email requerido"),
});


export const getSellerEditInitialValues = (seller: any | null) => ({
    name:                   seller?.name ?? "",
    email:                  seller?.email ?? "",
    rol:                    seller?.rol ?? "seller",
});