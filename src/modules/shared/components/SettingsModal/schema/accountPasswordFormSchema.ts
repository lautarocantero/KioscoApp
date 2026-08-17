import * as Yup from "yup";
import type { AccountPasswordFormValues } from "@typings/settings/settingsTypes";

export const getAccountPasswordInitialValues = (): AccountPasswordFormValues => ({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
});

export const accountPasswordFormSchema = Yup.lazy(() =>
    Yup.object().shape({
        currentPassword: Yup.string().required("Campo requerido"),
        newPassword: Yup.string()
            .min(6, "Mínimo 6 caracteres")
            .required("Campo requerido"),
        repeatNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
            .required("Campo requerido"),
    })
);
