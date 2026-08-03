import { Box, Button, Typography, type Theme } from "@mui/material";
import { MarkEmailRead } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

const CheckEmailContent = (): ReactNode => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: { xs: "90%" },
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                gap: 2,
            }}
        >
            <MarkEmailRead sx={{ fontSize: 48, color: (theme: Theme) => theme?.palette?.primary?.main }} />

            <Typography sx={{ color: (theme: Theme) => theme?.custom?.fontColor, textAlign: "center" }}>
                Te enviamos un mail para confirmar tu cuenta. Revisá tu casilla (y la carpeta de spam) y hacé clic en el link para poder iniciar sesión.
            </Typography>

            <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                    backgroundColor: (theme: Theme) => theme?.palette?.primary?.main,
                    textTransform: "none",
                    fontWeight: 500,
                    py: "0.7em",
                    width: { xs: "100%", sm: "70%", md: "90%", lg: "25em" },
                }}
            >
                Ya confirmé, ir a iniciar sesión
            </Button>
        </Box>
    );
};

export default CheckEmailContent;