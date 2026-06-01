import React from "react";
import { Box, Button, type Theme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

interface Props { variantId: string; }

const VariantUpdatedActions = ({ variantId }: Props): React.ReactNode => {
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", gap: 2,
            px: 3, py: 2.5,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(0,0,0,0.2)",
        }}>
            <Button fullWidth variant="contained"
                onClick={() => navigate(`/products/${productId}/variants/${variantId}`)}
                sx={{ textTransform: "none", fontWeight: 600, backgroundColor: "#0386EE", "&:hover": { backgroundColor: "#0270c4" } }}
            >
                Ver detalle
            </Button>

            <Button fullWidth variant="outlined"
                onClick={() => navigate(`/products/${productId}/variants`)}
                sx={(theme: Theme) => ({
                    textTransform: "none", fontWeight: 600,
                    borderColor: theme?.custom?.fontColorTransparent,
                    color: theme?.custom?.fontColorTransparent,
                    "&:hover": { borderColor: "rgba(255,255,255,0.4)" },
                })}
            >
                Ver presentaciones del producto
            </Button>

            <Button fullWidth variant="outlined"
                onClick={() => navigate("/products")}
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

export default VariantUpdatedActions;