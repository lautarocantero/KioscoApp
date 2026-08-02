import { Box, Button, type Theme } from "@mui/material";
import type { VerificationFormButtonsProps } from "@typings/ui/buttons.types";
import type { ReactNode } from "react";


const VerificationFormButtons = ({
    status,
    onGoToLogin,
    onGoToRegister,
}: VerificationFormButtonsProps): ReactNode => {
    return (
        <Box
            sx={{
                width: { xs: "100%", sm: "70%", md: "90%", lg: "25em" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "1.5em",
            }}
        >
            {status === "success" && (
                <Button
                    fullWidth
                    variant="contained"
                    onClick={onGoToLogin}
                    sx={{
                        backgroundColor: (theme: Theme) => theme?.palette?.primary?.main,
                        textTransform: "none",
                        fontWeight: 500,
                        py: "0.7em",
                    }}
                >
                    Ir a iniciar sesión
                </Button>
            )}

            {status === "error" && (
                <Button
                    fullWidth
                    variant="contained"
                    onClick={onGoToRegister}
                    sx={{
                        backgroundColor: (theme: Theme) => theme?.palette?.primary?.main,
                        textTransform: "none",
                        fontWeight: 500,
                        py: "0.7em",
                    }}
                >
                    Volver a registrarme
                </Button>
            )}
        </Box>
    );
};

export default VerificationFormButtons;