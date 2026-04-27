// # Componente: ProductsFormStep4
// ## Descripción 📦
// Step 4 del formulario de productos: Datos finales.
// Campos: proveedor (select) con botón para agregar uno nuevo.
// Consume el contexto de Formik mediante useFormikContext.
//-----------------------------------------------------------------------------//

import {
    TextField,
    Grid,
    MenuItem,
    Button,
    Box,
    Typography,
    CircularProgress,
    type Theme,
    CardContent,
    Card,
} from "@mui/material";
import { useFormikContext } from "formik";
import type { ProductFormValues } from "./ProductsFormSchema";
import { useFormNavigation } from "./ProductsForm";

interface Supplier {
    id: string;
    name: string;
}

interface ProductsFormForthStepProps {
    suppliers?: Supplier[];
    onAddSupplier?: () => void;
    loadingSuppliers?: boolean;
}

const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
    "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
    "& .MuiSvgIcon-root": { color: theme?.custom?.fontColorTransparent },
});

const ProductsFormForthStep = ({
    suppliers = [],
    onAddSupplier,
    loadingSuppliers = false,
}: ProductsFormForthStepProps): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();
    // ─── Agrega navegación y acceso a isSubmitting para el botón submit ──────
    const { currentStep, onPrev, isSubmitting } = useFormNavigation();

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
                            background: "rgba(168,85,247,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="5" r="3" fill="#A855F7" opacity="0.9" />
                            <path
                                d="M2 13c0-2.761 2.686-5 6-5s6 2.239 6 5"
                                stroke="#A855F7"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                opacity="0.7"
                            />
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
                            Datos finales
                        </Typography>
                        <Typography
                            sx={(theme: Theme) => ({
                                fontSize: "0.75rem",
                                color: theme.custom?.fontColorTransparent,
                                mt: "2px",
                            })}
                        >
                            Asignación de proveedor
                        </Typography>
                    </Box>
                </Box>

                {/* ── Contenido del formulario ── */}
                <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2}>

                        {/* Proveedor */}
                        <Grid item xs={12}>
                            <Box sx={{ position: "relative" }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Proveedor"
                                    value={values.supplierId}
                                    onChange={(e) => setFieldValue("supplierId", e.target.value)}
                                    error={!!errors.supplierId}
                                    helperText={errors.supplierId}
                                    variant="standard"
                                    disabled={loadingSuppliers}
                                    sx={sharedSx}
                                >
                                    {suppliers.length === 0 && !loadingSuppliers ? (
                                        <MenuItem disabled value="">
                                            Sin proveedores disponibles
                                        </MenuItem>
                                    ) : (
                                        suppliers.map((supplier) => (
                                            <MenuItem key={supplier.id} value={supplier.id}>
                                                {supplier.name}
                                            </MenuItem>
                                        ))
                                    )}
                                </TextField>
                                {loadingSuppliers && (
                                    <CircularProgress
                                        size={20}
                                        sx={{
                                            position: "absolute",
                                            right: 8,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                        }}
                                    />
                                )}
                            </Box>
                        </Grid>

                        {/* Agregar proveedor */}
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={onAddSupplier}
                                disabled={loadingSuppliers}
                                sx={(theme: Theme) => ({
                                    borderColor: theme?.custom?.fontColorTransparent,
                                    color: theme?.custom?.fontColorTransparent,
                                    textTransform: "none",
                                    "&:disabled": {
                                        borderColor: theme?.custom?.fontColorTransparent,
                                        color: theme?.custom?.fontColorTransparent,
                                        opacity: 0.5,
                                    },
                                })}
                            >
                                + Agregar proveedor
                            </Button>
                        </Grid>

                    </Grid>
                </CardContent>

                {/* ── Botones de navegación — último paso muestra submit ── */}
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

                    {/* Es el último paso → type="submit" dispara el onSubmit de Formik */}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            minWidth: 120,
                            backgroundColor: "#0386EE",
                            "&:hover": {
                                backgroundColor: "#0270c4",
                            },
                            "&:disabled": {
                                backgroundColor: "rgba(3, 134, 238, 0.5)",
                            },
                        }}
                    >
                        {isSubmitting ? "Creando..." : "Crear producto"}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default ProductsFormForthStep;
