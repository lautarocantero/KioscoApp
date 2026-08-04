import { Alert, Box, CircularProgress, Link, Typography, type Theme } from "@mui/material";
import type { SuccessOnRegisterInterface } from "@typings/auth/authComponentTypes";
import type { ReactNode } from "react";
import { Link as LinkReactRouter } from "react-router-dom";


const SuccessOnRegister = ({ isSuccess, secondsLeft }: SuccessOnRegisterInterface): ReactNode => {

    if (!isSuccess) return null;

    return (
        <Box
            sx={{
                width: { xs: "90%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1em",
                margin: "auto",
                textAlign: "center",
            }}
        >
            <Alert severity="success" sx={{ width: "100%" }}>
                ¡Cuenta creada con éxito!
            </Alert>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.6em" }}>
                <CircularProgress size={18} />
                <Typography
                    sx={{
                        fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
                        color: (theme: Theme) => theme?.custom?.fontColor,
                    }}
                >
                    Te estamos redirigiendo al login en {secondsLeft}s...
                </Typography>
            </Box>
            <Link
                component={LinkReactRouter}
                to="/login"
                sx={{
                    color: (theme: Theme) => theme?.palette?.primary?.main,
                    fontWeight: 600,
                    textDecoration: "none",
                }}
            >
                Ir ahora
            </Link>
        </Box>
    );
};

export default SuccessOnRegister;