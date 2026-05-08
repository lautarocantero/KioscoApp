import { Box, Button, Card, CardContent, Typography, type Theme } from "@mui/material";
import type { CreatedProductInterface } from "@typings/product/productTypes";
import { useNavigate } from "react-router-dom";


const ProductCreatedComponent = ({ createdProduct }: { createdProduct: CreatedProductInterface }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                p: 2,
                pt: 0,
            }}
        >
            <Card
                sx={(theme: Theme) => ({
                    width: "100%",
                    maxWidth: 680,
                    bgcolor: theme.custom?.backgroundDark,
                    border: "0.5px solid",
                    borderColor: "rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    boxShadow: `
                        0 1px 3px rgba(0, 0, 0, 0.06),
                        4px 8px 16px rgba(0, 0, 0, 0.10),
                        8px 16px 28px rgba(0, 0, 0, 0.08)
                    `,
                    overflow: "hidden",
                })}
            >
                {/* ── Cuerpo ── */}
                <CardContent sx={{ p: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1.5,
                            py: 2,
                        }}
                    >
                        {/* Ícono grande */}
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                backgroundColor: "rgba(3,134,238,0.10)",
                                border: "0.5px solid rgba(3,134,238,0.25)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "2rem",
                            }}
                        >
                            ✅
                        </Box>
                        <Typography
                            sx={{
                                fontSize: "1.05rem",
                                fontWeight: 600,
                                color: "rgba(255,255,255,0.90)",
                                textAlign: "center",
                            }}
                        >
                            Producto creado correctamente
                        </Typography>
                        {/* Nombre del producto en chip */}
                        <Box
                            sx={{
                                px: 1.5,
                                py: 0.5,
                                backgroundColor: "rgba(3,134,238,0.08)",
                                border: "0.5px solid rgba(3,134,238,0.20)",
                                borderRadius: "8px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    color: "#0386EE",
                                }}
                            >
                                {createdProduct.name}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                fontSize: "0.78rem",
                                color: "rgba(255,255,255,0.40)",
                                textAlign: "center",
                                mt: 0.5,
                            }}
                        >
                            ¿Querés agregar una presentación para este producto?
                        </Typography>
                    </Box>
                </CardContent>
                {/* ── Divider + nota ── */}
                <Box
                    sx={{
                        px: 3,
                        py: 1.5,
                        borderTop: "0.5px solid rgba(255,255,255,0.07)",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.72rem",
                            color: "rgba(255,255,255,0.30)",
                        }}
                    >
                        Podés agregar presentaciones (2L, lata, retornable...) con stock y precio individuales.
                    </Typography>
                </Box>
                {/* ── Botones de acción ── */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "space-between",
                        px: 3,
                        py: 2.5,
                        borderTop: "0.5px solid rgba(255,255,255,0.07)",
                        backgroundColor: "rgba(0,0,0,0.2)",
                    }}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate("/products")}
                        sx={(theme: Theme) => ({
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: theme?.custom?.fontColorTransparent,
                            color: theme?.custom?.fontColorTransparent,
                            "&:hover": {
                                borderColor: "rgba(255,255,255,0.4)",
                            },
                        })}
                    >
                        ← Volver a productos
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate(`/products/${createdProduct._id}/variants/new`)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            backgroundColor: "#0386EE",
                            "&:hover": { backgroundColor: "#0270c4" },
                        }}
                    >
                        Crear presentación →
                    </Button>
                </Box>
            </Card>
        </Box>  
    );
}

export default ProductCreatedComponent;