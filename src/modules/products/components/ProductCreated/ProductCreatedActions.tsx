import { Box, Button, type Theme } from "@mui/material";
import type { ProductCreatedActionsProps } from "@typings/product/productComponentTypes";
import { useNavigate } from "react-router-dom";


const ProductCreatedActions = ({ productId }: ProductCreatedActionsProps): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: "flex", gap: 2, justifyContent: "space-between",
            px: 3, py: 2.5,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(0,0,0,0.2)",
        }}>
            <Button
                fullWidth variant="outlined"
                onClick={() => navigate("/products")}
                sx={(theme: Theme) => ({
                    textTransform: "none", fontWeight: 600,
                    borderColor: theme?.custom?.fontColorTransparent,
                    color: theme?.custom?.fontColorTransparent,
                    "&:hover": { borderColor: "rgba(255,255,255,0.4)" },
                })}
            >
                ← Volver a productos
            </Button>

            <Button
                fullWidth variant="contained"
                onClick={() => navigate(`/products/${productId}/presentations/new`)}
                sx={{
                    textTransform: "none", fontWeight: 600,
                    backgroundColor: "#0386EE",
                    "&:hover": { backgroundColor: "#0270c4" },
                }}
            >
                Crear presentación →
            </Button>
        </Box>
    );
};

export default ProductCreatedActions;