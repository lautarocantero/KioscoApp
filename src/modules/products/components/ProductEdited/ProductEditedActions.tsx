// ProductEditedActions.tsx
import { Box, Button, type Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProductEditedActionsProps {
    productId: string;
}

const ProductEditedActions = ({ productId }: ProductEditedActionsProps): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column" }, px: 3, py: 2.5, width: "50%", margin: "0 auto" }}>
            <Button
                fullWidth variant="contained"
                onClick={() => navigate(`/products/edit/${productId}`)}
                sx={{ textTransform: "none", fontWeight: 600, backgroundColor: "#0386EE", "&:hover": { backgroundColor: "#0270c4" } }}
            >
                Seguir editando
            </Button>

            <Button
                fullWidth variant="outlined"
                onClick={() => navigate("/products")}
                sx={(theme: Theme) => ({ textTransform: "none", fontWeight: 600, borderColor: theme?.custom?.fontColorTransparent, color: theme?.custom?.black, "&:hover": { borderColor: "rgba(255,255,255,0.4)" } })}
            >
                Ver productos
            </Button>
        </Box>
    );
};

export default ProductEditedActions;