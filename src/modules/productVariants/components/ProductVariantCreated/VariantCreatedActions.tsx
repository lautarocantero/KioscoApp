import { Box, Button, type Theme } from "@mui/material";
import type { VariantCreatedActionsProps } from "@typings/productVariant/productVariantComponentTypes";
import { useNavigate } from "react-router-dom";


const VariantCreatedActions = ({ onCreateAnother }: VariantCreatedActionsProps): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", gap: 2,
            px: 3, py: 2.5,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(0,0,0,0.2)",
        }}>
            <Button fullWidth variant="contained" onClick={onCreateAnother}
                sx={{ textTransform: "none", fontWeight: 600, backgroundColor: "#0386EE", "&:hover": { backgroundColor: "#0270c4" } }}
            >
                + Crear otra presentación
            </Button>

            <Button fullWidth variant="outlined" onClick={() => navigate("/products/new")}
                sx={(theme: Theme) => ({
                    textTransform: "none", fontWeight: 600,
                    borderColor: theme?.custom?.fontColorTransparent,
                    color: theme?.custom?.fontColorTransparent,
                    "&:hover": { borderColor: "rgba(255,255,255,0.4)" },
                })}
            >
                Crear otro producto
            </Button>

            <Button fullWidth variant="outlined" onClick={() => navigate("/products")}
                sx={(theme: Theme) => ({
                    textTransform: "none", fontWeight: 600,
                    borderColor: theme?.custom?.fontColorTransparent,
                    color: theme?.custom?.fontColorTransparent,
                    "&:hover": { borderColor: "rgba(255,255,255,0.4)" },
                })}
            >
                Ver listado de productos
            </Button>
        </Box>
    );
};

export default VariantCreatedActions;