import type { AuthLoginFormValues, AuthRegisterFormValues } from "@typings/auth/authTypes";
import * as Yup from "yup";

//─── Login ───────────────────────────────────────────────
export const getLoginInitialValues = (): AuthLoginFormValues => ({
    email: "",
    password: "",
    rememberMe: true,
});

export const loginFormSchema = Yup.lazy(() =>
    Yup.object().shape({
        email: Yup.string()
            .email("Ingresa un E-mail")
            .required("Campo requerido")
            .trim(),
        password: Yup.string().required("Campo requerido"),
        rememberMe: Yup.boolean(),
    })
);

//─── Register ────────────────────────────────────────────
export const getRegisterInitialValues = (): AuthRegisterFormValues => ({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    profilePhoto: null,
});

export const registerFormSchema = Yup.lazy(() =>
    Yup.object().shape({
        username: Yup.string().required("Campo requerido").trim(),
        email: Yup.string()
            .email("Ingresa un E-mail")
            .required("Campo requerido")
            .trim(),
        password: Yup.string()
            .min(6, "Mínimo 6 caracteres")
            .required("Campo requerido"),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
            .required("Campo requerido"),
    })
);