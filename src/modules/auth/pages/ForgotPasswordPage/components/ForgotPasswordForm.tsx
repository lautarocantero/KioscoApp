import { Box, TextField, Typography, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import { useForgotPasswordForm } from "../../../../../hooks/auth/useAuthForm";
import PrimaryButtonComponent from "../../../../shared/components/Buttons/PrimaryButtonComponent";
import ApiErrorsHandler from "../../../../shared/components/ErrorHandler/ErrorFormHandler";

const ForgotPasswordForm = (): ReactNode => {
    const { formik, isSubmitting, errorMessage } = useForgotPasswordForm();
    const { handleSubmit, values, handleChange, errors } = formik;

    /*
    🚧 BYPASS TEMPORAL (sin Resend pago): antes de este bypass, un submit
    exitoso dejaba al usuario acá, esperando el mail. Ahora
    useForgotPasswordForm navega directo a /reset-password?token=... apenas
    el backend responde, así que este bloque nunca se llega a renderizar.

    Para restaurar cuando se reactive Resend:
    1. Volver a desestructurar `handleGoToLogin` del hook arriba.
    2. Volver a exponer `isSent` en useForgotPasswordForm y usarlo acá.

    if (isSent) {
        return (
            <Box
                sx={{
                    width: { xs: "90%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    margin: "auto",
                    textAlign: "center",
                }}
            >
                <Typography sx={{ color: (theme: Theme) => theme?.custom?.fontColor }}>
                    Si ese email está registrado, te enviamos un link para restablecer tu contraseña.
                </Typography>
                <PrimaryButtonComponent
                    buttonText="Volver a iniciar sesión"
                    buttonOnClick={handleGoToLogin}
                    buttonWidth={{ xs: "100%", md: "100%" }}
                    buttonType="button"
                    buttonColor="default"
                    padding={1}
                />
            </Box>
        );
    }
    */

    return (
        <Box
            component="form"
            role="form"
            onSubmit={handleSubmit}
            sx={{
                width: { xs: "90%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                gap: 2,
            }}
        >
            <Typography sx={{ color: (theme: Theme) => theme?.custom?.translucidFontColor, textAlign: "center" }}>
                Ingresá tu email y podras restablecer tu contraseña.
            </Typography>

            <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
            />

            <ApiErrorsHandler error={errorMessage} />

            <PrimaryButtonComponent
                buttonText="Continuar"
                buttonOnClick={() => {}}
                buttonWidth={{ xs: "100%", md: "100%" }}
                buttonType="submit"
                buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
                padding={1}
                disabled={isSubmitting}
            />
        </Box>
    );
};

export default ForgotPasswordForm;