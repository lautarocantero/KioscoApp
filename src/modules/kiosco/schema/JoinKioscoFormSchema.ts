import * as Yup from "yup";
import type { JoinKioscoFormValues } from "@typings/kiosco/kioscoTypes";

export const joinKioscoFormSchema = Yup.object({
    invite_code: Yup.string().trim().min(1, "Código requerido").required("Código requerido"),
});

export const getJoinKioscoInitialValues = (prefillCode?: string | null): JoinKioscoFormValues => ({
    invite_code: prefillCode ?? "",
});
