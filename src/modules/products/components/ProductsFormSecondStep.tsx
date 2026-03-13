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
} from "@mui/material";
import { useFormikContext } from "formik";
import { useRef } from "react";
import type { ProductFormValues } from "./ProductsFormSchema";

// Opciones de tipo de producto — reemplazar con datos reales de la API
const PRODUCT_TYPES = [
    { value: "food", label: "Alimento" },
    { value: "drink", label: "Bebida" },
    { value: "cleaning", label: "Limpieza" },
    { value: "personal_care", label: "Cuidado personal" },
    { value: "other", label: "Otro" },
];

const ProductsFormSecondStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFieldValue("productImage", file);
    };

    return (
        <Grid container spacing={2}>
            {/* Tipo de producto */}
            <Grid spacing={12}>
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
            <Grid spacing={12}>
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
            <Grid spacing={12}>
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
            <Grid spacing={12}>
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
    );
};

export default ProductsFormSecondStep;
