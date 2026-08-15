import * as Yup from "yup";
import type { Provider, ProviderFormValues } from "@typings/provider/providerTypes";

export const providerFormSchema = Yup.object({
    name: Yup.string().trim().min(1).required("Nombre requerido"),
    valoration: Yup.number()
        .min(1, "La valoración mínima es 1")
        .max(5, "La valoración máxima es 5")
        .required("Valoración requerida"),
    contact_phone: Yup.string().trim().min(1).required("Teléfono requerido"),
    contact_email: Yup.string().email("Email inválido").required("Email requerido"),
});

export const providerEditFormSchema = providerFormSchema;

export const getProviderFormInitialValues = (): ProviderFormValues => ({
    name: "",
    valoration: 5,
    contact_phone: "",
    contact_email: "",
});

export const getProviderEditInitialValues = (provider: Provider | null): ProviderFormValues => ({
    name: provider?.name ?? "",
    valoration: provider?.valoration ?? 5,
    contact_phone: provider?.contact_phone ?? "",
    contact_email: provider?.contact_email ?? "",
});
