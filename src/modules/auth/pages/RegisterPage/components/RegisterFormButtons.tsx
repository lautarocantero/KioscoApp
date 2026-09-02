import { Box, Divider, Link, Typography, type Theme } from "@mui/material";
import type { RegisterFormButtonsInterface } from "../../../../../typings/auth/authComponentTypes";
import PrimaryButton from "../../../../shared/components/Buttons/PrimaryButtonComponent";
import { GoogleAuthButton } from "../../../../shared/components/Buttons/GoogleButton";
import type { ReactNode } from "react";

const RegisterFormButtons = ({
    errors,
    isSubmitting,
    onGoToLogin,
    disabled,
}: RegisterFormButtonsInterface): ReactNode => {


    return (
        <Box
            sx={{
                mt: "1.5em",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
            }}
        >
            <PrimaryButton
                buttonText="Registrarse"
                buttonType="submit"
                buttonOnClick={() => {}}
                buttonWidth={{ xs: "100%", md: "100%" }}
                buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
                padding={1}
                disabled={isSubmitting || disabled}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%", my: 0.5 }}>
                <Divider sx={{ flex: 1, borderColor: (theme: Theme) => theme?.custom?.darkGray }} />
                <Typography
                    sx={{
                        color: (theme: Theme) => theme?.custom?.translucidFontColor,
                        fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
                        whiteSpace: "nowrap",
                    }}
                >
                    o regístrate con
                </Typography>
                <Divider sx={{ flex: 1, borderColor: (theme: Theme) => theme?.custom?.darkGray }} />
            </Box>

            <GoogleAuthButton label="Iniciar sesión con Google" />

            <Box
                sx={(theme: Theme) => ({
                    width: "100%",
                    textAlign: "center",
                    mt: 2,
                    pt: 2,
                    borderTop: `1px solid ${theme?.custom?.darkGray}`,
                })}
            >
                <Typography
                    component="span"
                    sx={{
                        color: (theme: Theme) => theme?.custom?.translucidFontColor,
                        fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
                    }}
                >
                    ¿Ya tienes cuenta?{" "}
                </Typography>
                <Link
                    component="button"
                    type="button"
                    onClick={onGoToLogin}
                    sx={{
                        color: (theme: Theme) => theme?.palette?.primary?.main,
                        fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
                        fontWeight: 600,
                        textDecoration: "none",
                    }}
                >
                    Inicia Sesión
                </Link>
            </Box>
        </Box>
    );
};

export default RegisterFormButtons;
