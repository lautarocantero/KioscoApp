import { Box, Button, Card, CardContent, Typography, type Theme } from "@mui/material";
import type { VariantCreatedComponentProps } from "@typings/productVariant/productVariant";
import { useNavigate } from "react-router-dom";


const VariantCreatedComponent = ({ createdVariant, onCreateAnother }: VariantCreatedComponentProps) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", p: 2, pt: 0 }}>
            <Card
                sx={(theme: Theme) => ({
                    width: "100%", maxWidth: 680,
                    bgcolor: theme.custom?.backgroundDark,
                    border: "0.5px solid", borderColor: "rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    boxShadow: `
                        0 1px 3px rgba(0,0,0,0.06),
                        4px 8px 16px rgba(0,0,0,0.10),
                        8px 16px 28px rgba(0,0,0,0.08)
                    `,
                    overflow: "hidden",
                })}
            >
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, py: 2 }}>
                        <Box
                            sx={{
                                width: 64, height: 64, borderRadius: "50%",
                                backgroundColor: "rgba(3,134,238,0.10)",
                                border: "0.5px solid rgba(3,134,238,0.25)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "2rem",
                            }}
                        >
                            ✅
                        </Box>

                        <Typography sx={{ fontSize: "1.05rem", fontWeight: 600, color: "rgba(255,255,255,0.90)", textAlign: "center" }}>
                            Presentación creada correctamente
                        </Typography>

                        <Box sx={{ px: 1.5, py: 0.5, backgroundColor: "rgba(3,134,238,0.08)", border: "0.5px solid rgba(3,134,238,0.20)", borderRadius: "8px" }}>
                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0386EE" }}>
                                {createdVariant.name}
                            </Typography>
                        </Box>

                        <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.40)", textAlign: "center", mt: 0.5 }}>
                            ¿Querés agregar otra presentación para este producto?
                        </Typography>
                    </Box>
                </CardContent>

                <Box
                    sx={{
                        display: "flex", flexDirection: "column", gap: 2,
                        px: 3, py: 2.5,
                        borderTop: "0.5px solid rgba(255,255,255,0.07)",
                        backgroundColor: "rgba(0,0,0,0.2)",
                    }}
                >
                    <Button
                        fullWidth variant="contained"
                        onClick={onCreateAnother}
                        sx={{ textTransform: "none", fontWeight: 600, backgroundColor: "#0386EE", "&:hover": { backgroundColor: "#0270c4" } }}
                    >
                        + Crear otra presentación
                    </Button>

                    <Button
                        fullWidth variant="outlined"
                        onClick={() => navigate("/products/new")}
                        sx={(theme: Theme) => ({
                            textTransform: "none", fontWeight: 600,
                            borderColor: theme?.custom?.fontColorTransparent,
                            color: theme?.custom?.fontColorTransparent,
                            "&:hover": { borderColor: "rgba(255,255,255,0.4)" },
                        })}
                    >
                        Crear otro producto
                    </Button>

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
                        Ver listado de productos
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default VariantCreatedComponent;