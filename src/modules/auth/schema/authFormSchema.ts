import type { AuthForgotPasswordFormValues, AuthLoginFormValues, AuthRegisterFormValues, AuthResetPasswordFormValues } from "@typings/auth/authTypes";
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
    acceptedTerms: false,
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
        acceptedTerms: Yup.boolean().oneOf([true], "Debes aceptar los términos y condiciones"),
    })
);

//─── Forgot password ─────────────────────────────────────
export const getForgotPasswordInitialValues = (): AuthForgotPasswordFormValues => ({
    email: "",
});

export const forgotPasswordFormSchema = Yup.lazy(() =>
    Yup.object().shape({
        email: Yup.string()
            .email("Ingresa un E-mail")
            .required("Campo requerido")
            .trim(),
    })
);

//─── Reset password ──────────────────────────────────────
export const getResetPasswordInitialValues = (): AuthResetPasswordFormValues => ({
    newPassword: "",
    repeatNewPassword: "",
});

export const resetPasswordFormSchema = Yup.lazy(() =>
    Yup.object().shape({
        newPassword: Yup.string()
            .min(6, "Mínimo 6 caracteres")
            .required("Campo requerido"),
        repeatNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
            .required("Campo requerido"),
    })
);