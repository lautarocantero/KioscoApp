// # Componente: ProductsFormStep3
// ## Descripción 📦
// Step 3 del formulario de productos: Datos técnicos II.
// Campos: tamaño (select), marca, código de barras y fecha de expiración.
// Consume el contexto de Formik mediante useFormikContext.
//-----------------------------------------------------------------------------//

import {
    TextField,
    Grid,
    MenuItem,
    type Theme,
} from "@mui/material";
import { useFormikContext } from "formik";
import type { ProductFormValues } from "./ProductsFormSchema";

// Opciones de tamaño — reemplazar con datos reales de la API
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

    return (
        <Grid container spacing={2}>
            {/* Tamaño */}
            <Grid spacing={12}>
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

            {/* Marca */}
            <Grid spacing={12}>
                <TextField
                    fullWidth
                    label="Marca"
                    value={values.brand}
                    onChange={(e) => setFieldValue("brand", e.target.value)}
                    error={!!errors.brand}
                    helperText={errors.brand}
                    variant="standard"
                    sx={sharedSx}
                />
            </Grid>

            {/* Código de barras */}
            <Grid spacing={12}>
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
            <Grid spacing={12}>
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
    );
};

export default ProductsFormThirdStep;
