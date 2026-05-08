import { Box, Button, type Theme } from "@mui/material";
import { useFormNavigation } from "../../../../../modules/products/context/FormNavigationContext";

const ProductVariantSubmitButtons = (): React.ReactNode => {
    const { onPrev, isSubmitting } = useFormNavigation();

    return (
        <Box sx={{
            display: "flex", gap: 2, justifyContent: "space-between",
            px: 3, py: 2.5,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(0,0,0,0.2)",
        }}>
            <Button
                onClick={onPrev}
                variant="outlined"
                sx={(theme: Theme) => ({
                    textTransform: "none", fontWeight: 600, minWidth: 120,
                    borderColor: theme?.custom?.fontColorTransparent,
                    color: theme?.custom?.fontColorTransparent,
                })}
            >
                ← Atrás
            </Button>

            <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                    textTransform: "none", fontWeight: 600, minWidth: 120,
                    backgroundColor: "#0386EE",
                    "&:hover": { backgroundColor: "#0270c4" },
                    "&:disabled": { backgroundColor: "rgba(3,134,238,0.5)" },
                }}
            >
                {isSubmitting ? "Creando..." : "Crear presentación"}
            </Button>
        </Box>
    );
};

export default ProductVariantSubmitButtons;