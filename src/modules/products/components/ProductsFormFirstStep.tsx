import { Box, Card, CardContent, Grid, TextField, Typography, Button, type Theme } from "@mui/material";
import { useFormikContext } from "formik";
import { useFormNavigation } from "../context/FormNavigationContext";
import type { ProductFormValues } from "modules/productVariants/schema/ProductsVariantFormSchema";

const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": {
        color: theme?.custom?.fontColorTransparent,
        fontSize: "0.82rem",
        letterSpacing: "0.04em",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&:hover fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&.Mui-focused fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        fontSize: "0.88rem",
    },
    "& .MuiFormHelperText-root": {
        fontSize: "0.72rem",
    },
});

const ProductsFormFirstStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();
    const { currentStep, onNext, onPrev, validateForm } = useFormNavigation();

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
                {/* ── Header ── */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 3,
                        py: 2,
                        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
                    }}
                >
                    <Box
                        sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "8px",
                            background: "rgba(3,134,238,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="2" width="5.5" height="7" rx="1.5" fill="#0386EE" opacity="0.9" />
                            <rect x="9" y="7" width="5" height="5" rx="1.5" fill="#0386EE" opacity="0.5" />
                            <rect x="9" y="2" width="5" height="4" rx="1.5" fill="#0386EE" opacity="0.7" />
                            <rect x="2" y="10.5" width="5.5" height="3.5" rx="1.5" fill="#0386EE" opacity="0.4" />
                        </svg>
                    </Box>
                    <Box>
                        <Typography
                            sx={(theme: Theme) => ({
                                fontSize: "0.88rem",
                                fontWeight: 500,
                                color: !theme.custom?.white
                                    ? "rgba(255,255,255,0.88)"
                                    : theme.custom?.white,
                                lineHeight: 1.3,
                            })}
                        >
                            Datos del producto
                        </Typography>
                        <Typography
                            sx={(theme: Theme) => ({
                                fontSize: "0.75rem",
                                color: theme.custom?.fontColorTransparent,
                                mt: "2px",
                            })}
                        >
                            Información general — aplica a todas las presentaciones
                        </Typography>
                    </Box>
                </Box>

                {/* ── Formulario ── */}
                <CardContent sx={{ p: 3 }}>
                    <Box component="form" noValidate autoComplete="off">
                        <Grid container spacing={2.5}>

                            {/* Nombre + Marca — misma fila */}
                            <Grid spacing={{ xs:"12", sm:"6" }}>
                                <TextField
                                    fullWidth
                                    label="Nombre del producto"
                                    value={values.name}
                                    onChange={(e) => setFieldValue("name", e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid spacing={{ xs:"12", sm:"6" }}>
                                <TextField
                                    fullWidth
                                    label="Marca"
                                    value={values.brand}
                                    onChange={(e) => setFieldValue("brand", e.target.value)}
                                    error={!!errors.brand}
                                    helperText={errors.brand}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            {/* Descripción — ancho completo */}
                            <Grid spacing={{ xs:"12" }}>
                                <TextField
                                    fullWidth
                                    label="Descripción"
                                    value={values.description}
                                    onChange={(e) => setFieldValue("description", e.target.value)}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            {/* URL de imagen — ancho completo */}
                            <Grid spacing={{ xs:"12" }}>
                                <TextField
                                    fullWidth
                                    label="URL de imagen"
                                    placeholder="/images/productExample/mi-producto.png"
                                    value={values.image_url}
                                    onChange={(e) => setFieldValue("image_url", e.target.value)}
                                    error={!!errors.image_url}
                                    helperText={errors.image_url ?? "Opcional — ruta relativa o URL externa"}
                                    variant="outlined"
                                    sx={sharedSx}
                                />
                            </Grid>

                            {/* Preview de imagen si hay URL */}
                            {values.image_url && (
                                <Grid spacing={{ xs:"12" }}>
                                    <Box
                                        sx={{
                                            border: "0.5px dashed",
                                            borderColor: "rgba(255,255,255,0.12)",
                                            borderRadius: "10px",
                                            p: 1.5,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                            background: "rgba(255,255,255,0.02)",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={values.image_url}
                                            alt="Vista previa"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = "none";
                                            }}
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: "8px",
                                                objectFit: "cover",
                                                background: "rgba(255,255,255,0.06)",
                                                flexShrink: 0,
                                            }}
                                        />
                                        <Typography
                                            sx={(theme: Theme) => ({
                                                fontSize: "0.75rem",
                                                color: theme.custom?.fontColorTransparent,
                                                wordBreak: "break-all",
                                            })}
                                        >
                                            {values.image_url}
                                        </Typography>
                                    </Box>
                                </Grid>
                            )}

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
                        disabled={currentStep === 0}
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
                        onClick={() => {
                            if (validateForm) {
                                onNext(validateForm);
                            }
                        }}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            minWidth: 120,
                            backgroundColor: "#0386EE",
                            "&:hover": {
                                backgroundColor: "#0270c4",
                            },
                        }}
                    >
                        Siguiente →
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default ProductsFormFirstStep;
