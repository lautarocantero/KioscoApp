import { TextField, Grid, Card, CardContent, Box, type Theme, Button, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { useFormNavigation } from "../../../modules/products/context/FormNavigationContext";
import type { ProductVariantFormValues } from "@typings/productVariant/productVariant";

const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&:hover fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&.Mui-focused fieldset": { borderColor: theme?.custom?.fontColorTransparent },
    },
});

const ProductVariantFormSecondStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductVariantFormValues>();
    const { onNext, onPrev, validateForm } = useFormNavigation();

    const handleNextClick = async () => {
        if (validateForm) {
            await onNext(validateForm);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "auto",
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
                })}
            >
                <CardContent sx={{ p: 4 }}>
                    <Box>
                        <Grid container spacing={2.5} display={"flex"} flexDirection={"column"}>
                            <Grid spacing={{ xs: 12, sm: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Stock"
                                    type="number"
                                    placeholder="Ej: 100"
                                    value={values.stock}
                                    onChange={(e) => setFieldValue("stock", e.target.value)}
                                    error={!!errors.stock}
                                    helperText={errors.stock}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid spacing={{ xs: 12, sm: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Stock mínimo"
                                    type="number"
                                    placeholder="Ej: 10"
                                    value={values.min_stock}
                                    onChange={(e) => setFieldValue("min_stock", e.target.value)}
                                    error={!!errors.min_stock}
                                    helperText={errors.min_stock}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid spacing={{ xs: 12, sm: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Precio"
                                    type="number"
                                    placeholder="Ej: 1.50"
                                    value={values.price}
                                    onChange={(e) => setFieldValue("price", e.target.value)}
                                    error={!!errors.price}
                                    helperText={errors.price}
                                    variant="outlined"
                                    sx={sharedSx}
                                    inputProps={{ step: "0.01" }}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>

                {/* ── Footer con nota de campos requeridos ── */}
                <Box
                    sx={{
                        px: 3,
                        py: 1.5,
                        borderTop: "0.5px solid rgba(255,255,255,0.07)",
                    }}
                >
                    <Typography
                        sx={(theme: Theme) => ({
                            fontSize: "0.72rem",
                            color: theme.custom?.fontColorTransparent,
                            opacity: 0.6,
                        })}
                    >
                        <Box component="span" sx={{ color: "#0386EE", mr: 0.5 }}>*</Box>
                        Campos requeridos
                    </Typography>
                </Box>

                {/* ── Botones de navegación ── */}
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
                        onClick={onPrev}
                        variant="outlined"
                        sx={(theme: Theme) => ({
                            textTransform: "none",
                            fontWeight: 600,
                            minWidth: 120,
                            borderColor: theme?.custom?.fontColorTransparent,
                            color: theme?.custom?.fontColorTransparent,
                        })}
                    >
                        ← Atrás
                    </Button>
                    <Button
                        onClick={handleNextClick}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            minWidth: 120,
                            backgroundColor: "#0386EE",
                            "&:hover": { backgroundColor: "#0270c4" },
                        }}
                    >
                        Siguiente →
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default ProductVariantFormSecondStep;
