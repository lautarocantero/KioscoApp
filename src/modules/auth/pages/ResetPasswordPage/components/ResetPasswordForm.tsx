import { Box, TextField, Typography, type Theme } from "@mui/material";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import type { ReactNode } from "react";
import { ResetPasswordStatusEnum } from "@typings/auth/authEnums";
import { useResetPasswordForm } from "../../../../../hooks/auth/useAuthForm";
import PrimaryButtonComponent from "../../../../shared/components/Buttons/PrimaryButtonComponent";

const ResetPasswordForm = (): ReactNode => {
    const { formik, status, errorMessage, isSubmitting, hasToken, handleGoToLogin, handleGoToForgotPassword } = useResetPasswordForm();
    const { handleSubmit, values, handleChange, errors } = formik;

    // Sin token en la URL: no tiene sentido mostrar el form.
    if (!hasToken) {
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
                <ErrorOutline sx={{ fontSize: 48, color: (theme: Theme) => theme?.palette?.error?.main }} />
                <Typography sx={{ color: (theme: Theme) => theme?.palette?.error?.main }}>
                    {errorMessage}
                </Typography>
                <PrimaryButtonComponent
                    buttonText="Pedir un link nuevo"
                    buttonOnClick={handleGoToForgotPassword}
                    buttonWidth={{ xs: "100%", md: "100%" }}
                    buttonType="button"
                    buttonColor="default"
                    padding={1}
                />
            </Box>
        );
    }

    if (status === ResetPasswordStatusEnum.Success) {
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
                <CheckCircle sx={{ fontSize: 48, color: (theme: Theme) => theme?.palette?.success?.main }} />
                <Typography sx={{ color: (theme: Theme) => theme?.custom?.fontColor }}>
                    Tu contraseña fue actualizada con éxito.
                </Typography>
                <PrimaryButtonComponent
                    buttonText="Iniciar sesión"
                    buttonOnClick={handleGoToLogin}
                    buttonWidth={{ xs: "100%", md: "100%" }}
                    buttonType="button"
                    buttonColor="default"
                    padding={1}
                />
            </Box>
        );
    }

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
            <TextField
                fullWidth
                name="newPassword"
                type="password"
                placeholder="Nueva contraseña"
                value={values.newPassword}
                onChange={handleChange}
                error={Boolean(errors.newPassword)}
                helperText={errors.newPassword}
            />

            <TextField
                fullWidth
                name="repeatNewPassword"
                type="password"
                placeholder="Repetí la nueva contraseña"
                value={values.repeatNewPassword}
                onChange={handleChange}
                error={Boolean(errors.repeatNewPassword)}
                helperText={errors.repeatNewPassword}
            />

            {status === ResetPasswordStatusEnum.Error && (
                <Typography
                    sx={{
                        color: (theme: Theme) => theme?.palette?.error?.main,
                        fontSize: (theme: Theme) => theme?.typography?.caption?.fontSize,
                    }}
                >
                    {errorMessage}
                </Typography>
            )}

            <PrimaryButtonComponent
                buttonText="Restablecer contraseña"
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

export default ResetPasswordForm;