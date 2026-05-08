import { TextField, Grid, Card, CardContent, Box, type Theme, Button, Typography } from "@mui/material";
import type { ProductVariantFormValues } from "@typings/productVariant/productVariantTypes";
import { useFormikContext } from "formik";
import { useFormNavigation } from "modules/products/context/FormNavigationContext";
import { useState } from "react";

const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&:hover fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&.Mui-focused fieldset": { borderColor: theme?.custom?.fontColorTransparent },
    },
});

const ProductVariantFormFirstStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductVariantFormValues>();
    const { onNext, onPrev, validateForm, currentStep } = useFormNavigation();
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Solo para el preview visual
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target?.result as string);
        reader.readAsDataURL(file);

        // Guardá el File real en Formik, no el base64
        setFieldValue("image_file", file);
    };

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
                                    label="SKU"
                                    placeholder="Ej: COK-500ML-BLACK"
                                    value={values.sku}
                                    onChange={(e) => setFieldValue("sku", e.target.value)}
                                    error={!!errors.sku}
                                    helperText={errors.sku}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid spacing={{ xs: 12, sm: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Tipo de modelo"
                                    placeholder="Ej: Lata, Botella, Tetra Pack"
                                    value={values.model_type}
                                    onChange={(e) => setFieldValue("model_type", e.target.value)}
                                    error={!!errors.model_type}
                                    helperText={errors.model_type}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid spacing={{ xs: 12, sm: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Tamaño/Presentación"
                                    placeholder="Ej: 500ml, 1L, 2L"
                                    value={values.model_size}
                                    onChange={(e) => setFieldValue("model_size", e.target.value)}
                                    error={!!errors.model_size}
                                    helperText={errors.model_size}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            {/* Campo de imagen/envase */}
                            <Grid spacing={{ xs: 12, sm: 12 }}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                    <Typography
                                        sx={(theme: Theme) => ({
                                            fontSize: "0.9rem",
                                            fontWeight: 500,
                                            color: theme?.custom?.fontColorTransparent,
                                        })}
                                    >
                                        Imagen del envase <Box component="span" sx={{ color: "#0386EE" }}>*</Box>
                                    </Typography>

                                    {/* Preview de imagen */}
                                    {imagePreview || values.image_url ? (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                width: "100%",
                                                height: 200,
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                                backgroundColor: "rgba(0,0,0,0.3)",
                                                border: "0.5px solid rgba(3,134,238,0.30)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <img
                                                src={imagePreview || values.image_url}
                                                alt="Preview"
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: 200,
                                                borderRadius: "8px",
                                                border: "1.5px dashed rgba(3,134,238,0.30)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "rgba(3,134,238,0.05)",
                                            }}
                                        >
                                            <Typography
                                                sx={(theme: Theme) => ({
                                                    fontSize: "0.85rem",
                                                    color: theme?.custom?.fontColorTransparent,
                                                    opacity: 0.6,
                                                })}
                                            >
                                                Selecciona una imagen
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Input de archivo */}
                                    <Box component="label" sx={{ cursor: "pointer" }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            hidden
                                        />
                                        <Button
                                            component="span"
                                            variant="outlined"
                                            fullWidth
                                            sx={(theme: Theme) => ({
                                                textTransform: "none",
                                                fontWeight: 600,
                                                borderColor: theme?.custom?.fontColorTransparent,
                                                color: theme?.custom?.fontColorTransparent,
                                                "&:hover": {
                                                    borderColor: "rgba(3,134,238,0.5)",
                                                    backgroundColor: "rgba(3,134,238,0.05)",
                                                },
                                            })}
                                        >
                                            📷 Subir imagen
                                        </Button>
                                    </Box>
                                    {errors.image_file && (
                                        <Typography sx={{ fontSize: "0.75rem", color: "#ff5252", mt: 0.5 }}>
                                            {errors.image_file as string}
                                        </Typography>
                                    )}
                                </Box>
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
                        disabled={ currentStep === 0}
                        variant="outlined"
                        sx={(theme: Theme) => ({
                            textTransform: "none",
                            fontWeight: 600,
                            minWidth: 120,
                            borderColor: theme?.custom?.fontColorTransparent,
                            color: theme?.custom?.fontColorTransparent,
                            "&:disabled": {
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "rgba(255,255,255,0.3)",
                            },
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
                            "&:disabled": { backgroundColor: "rgba(3, 134, 238, 0.5)" },
                        }}
                    >
                        Siguiente →
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default ProductVariantFormFirstStep;
