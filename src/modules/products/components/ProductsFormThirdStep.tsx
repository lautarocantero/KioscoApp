// # Componente: ProductsFormStep3
// ## Descripción 📦
// Step 3 del formulario de productos: Datos técnicos II.
// Campos: tamaño (select), código de barras y fecha de expiración.
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
import type { ProductFormValues } from "./ProductsFormSchema";
import { useFormNavigation } from "./ProductsForm";

const SIZE_OPTIONS = [
    { value: "xs",  label: "XS — Extra pequeño" },
    { value: "s",   label: "S — Pequeño" },
    { value: "m",   label: "M — Mediano" },
    { value: "l",   label: "L — Grande" },
    { value: "xl",  label: "XL — Extra grande" },
    { value: "xxl", label: "XXL — Extra extra grande" },
];

const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
    "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
});

const ProductsFormThirdStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();
    // ─── Agrega navegación — antes el step no tenía botones ni acceso al contexto ──
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
                            background: "rgba(238,163,3,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="3" width="2" height="10" rx="1" fill="#EEA303" opacity="0.9" />
                            <rect x="5.5" y="3" width="1" height="10" rx="0.5" fill="#EEA303" opacity="0.7" />
                            <rect x="7.5" y="3" width="2" height="10" rx="1" fill="#EEA303" opacity="0.9" />
                            <rect x="11" y="3" width="1" height="10" rx="0.5" fill="#EEA303" opacity="0.5" />
                            <rect x="13" y="3" width="1" height="10" rx="0.5" fill="#EEA303" opacity="0.7" />
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
                            Datos técnicos II
                        </Typography>
                        <Typography
                            sx={(theme: Theme) => ({
                                fontSize: "0.75rem",
                                color: theme.custom?.fontColorTransparent,
                                mt: "2px",
                            })}
                        >
                            Tamaño, código de barras y fecha de expiración
                        </Typography>
                    </Box>
                </Box>

                {/* ── Contenido del formulario ── */}
                <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2}>

                        {/* Tamaño */}
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Tamaño"
                                value={values.size}
                                onChange={(e) => setFieldValue("size", e.target.value)}
                                error={!!errors.size}
                                helperText={errors.size}
                                variant="standard"
                                sx={(theme: Theme) => ({
                                    ...sharedSx(theme),
                                    "& .MuiSvgIcon-root": { color: theme?.custom?.fontColorTransparent },
                                })}
                            >
                                {SIZE_OPTIONS.map((opt) => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Código de barras */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Código de barras"
                                value={values.barcode}
                                onChange={(e) => setFieldValue("barcode", e.target.value)}
                                error={!!errors.barcode}
                                helperText={errors.barcode}
                                variant="standard"
                                sx={sharedSx}
                            />
                        </Grid>

                        {/* Fecha de expiración */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Fecha de expiración"
                                type="date"
                                value={
                                    values.expirationDate
                                        ? new Date(values.expirationDate).toISOString().split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    setFieldValue(
                                        "expirationDate",
                                        e.target.value ? new Date(e.target.value) : null
                                    )
                                }
                                error={!!errors.expirationDate}
                                helperText={errors.expirationDate as string}
                                variant="standard"
                                InputLabelProps={{ shrink: true }}
                                sx={sharedSx}
                            />
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

export default ProductsFormThirdStep;
