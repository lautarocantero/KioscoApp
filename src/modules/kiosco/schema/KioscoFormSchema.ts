import * as Yup from "yup";
import type { CreateKioscoFormValues } from "@typings/kiosco/kioscoTypes";

export const createKioscoFormSchema = Yup.object({
    name: Yup.string().trim().min(1, "Nombre requerido").required("Nombre requerido"),
    address: Yup.string().trim().min(1, "Dirección requerida").required("Dirección requerida"),
});

export const getCreateKioscoInitialValues = (): CreateKioscoFormValues => ({
    name: "",
    address: "",
});
