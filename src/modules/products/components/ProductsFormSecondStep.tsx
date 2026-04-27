// # Componente: ProductsFormStep2
// ## Descripción 📦
// Step 2 del formulario de productos: Datos técnicos.
// Campos: tipo de producto (select), stock, stock mínimo y foto del producto.
// Consume el contexto de Formik mediante useFormikContext.
//-----------------------------------------------------------------------------//

import {
    TextField,
    Grid,
    MenuItem,
    Button,
    Box,
    Typography,
    type Theme,
    CardContent,
    Card,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useRef } from "react";
import type { ProductFormValues } from "./ProductsFormSchema";
import { useFormNavigation } from "./ProductsForm";

const PRODUCT_TYPES = [
    { value: "food", label: "Alimento" },
    { value: "drink", label: "Bebida" },
    { value: "cleaning", label: "Limpieza" },
    { value: "personal_care", label: "Cuidado personal" },
    { value: "other", label: "Otro" },
];

const ProductsFormSecondStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();
    // ─── Antes faltaba este hook — los handlers onPrev/onNext no estaban definidos ───
    const { currentStep, totalSteps, onNext, onPrev, isSubmitting, validateForm } =
        useFormNavigation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFieldValue("productImage", file);
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
                            background: "rgba(29,158,117,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="8" width="12" height="6" rx="1.5" fill="#1D9E75" opacity="0.9" />
                            <rect x="2" y="2" width="7" height="5" rx="1.5" fill="#1D9E75" opacity="0.5" />
                            <rect x="11" y="2" width="3" height="5" rx="1.5" fill="#1D9E75" opacity="0.7" />
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
                            Datos técnicos
                        </Typography>
                        <Typography
                            sx={(theme: Theme) => ({
                                fontSize: "0.75rem",
                                color: theme.custom?.fontColorTransparent,
                                mt: "2px",
                            })}
                        >
                            Información del stock y tipo de producto
                        </Typography>
                    </Box>
                </Box>

                {/* ── Contenido del formulario ── */}
                <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        {/* Tipo de producto */}
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Tipo de producto"
                                value={values.productType}
                                onChange={(e) => setFieldValue("productType", e.target.value)}
                                error={!!errors.productType}
                                helperText={errors.productType}
                                variant="standard"
                                sx={(theme: Theme) => ({
                                    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
                                    "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
                                    "& .MuiSvgIcon-root": { color: theme?.custom?.fontColorTransparent },
                                })}
                            >
                                {PRODUCT_TYPES.map((opt) => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Stock */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Stock"
                                type="number"
                                value={values.stock === 0 ? "" : values.stock}
                                onChange={(e) => setFieldValue("stock", parseInt(e.target.value) || 0)}
                                error={!!errors.stock}
                                helperText={errors.stock}
                                variant="standard"
                                inputProps={{ min: 0, step: 1 }}
                                sx={(theme: Theme) => ({
                                    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
                                    "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
                                })}
                            />
                        </Grid>

                        {/* Stock mínimo */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Stock mínimo"
                                type="number"
                                value={values.minStock === 0 ? "" : values.minStock}
                                onChange={(e) => setFieldValue("minStock", parseInt(e.target.value) || 0)}
                                error={!!errors.minStock}
                                helperText={errors.minStock}
                                variant="standard"
                                inputProps={{ min: 0, step: 1 }}
                                sx={(theme: Theme) => ({
                                    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
                                    "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
                                })}
                            />
                        </Grid>

                        {/* Foto del producto */}
                        <Grid item xs={12}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => fileInputRef.current?.click()}
                                sx={(theme: Theme) => ({
                                    borderColor: theme?.custom?.fontColorTransparent,
                                    color: theme?.custom?.fontColorTransparent,
                                    textTransform: "none",
                                })}
                            >
                                ↑ Foto producto
                            </Button>
                            {values.productImage && (
                                <Box mt={1}>
                                    <Typography
                                        variant="caption"
                                        sx={(theme: Theme) => ({ color: theme?.custom?.fontColorTransparent })}
                                    >
                                        {(values.productImage as File).name}
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>

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

export default ProductsFormSecondStep;
