// # Componente: ProductsFormStep1
// ## Descripción 📦
// Step 1 del formulario de productos: Datos principales.
// Campos: nombre, descripción, SKU y precio.
// Consume el contexto de Formik mediante useFormikContext.
//-----------------------------------------------------------------------------//

import { TextField, Grid, type Theme } from "@mui/material";
import { useFormikContext } from "formik";
import type { ProductFormValues } from "./ProductsFormSchema";

const ProductsFormFirstStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();

    return (
        <Grid container spacing={2}>
            <Grid spacing={12}>
                <TextField
                    fullWidth
                    label="Nombre"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    variant="standard"
                    sx={(theme: Theme) => ({
                        "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
                        "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
                    })}
                />
            </Grid>

            <Grid spacing={12}>
                <TextField
                    fullWidth
                    label="Descripción"
                    value={values.description}
                    onChange={(e) => setFieldValue("description", e.target.value)}
                    error={!!errors.description}
                    helperText={errors.description}
                    variant="standard"
                    multiline
                    maxRows={3}
                    sx={(theme: Theme) => ({
                        "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
                        "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
                    })}
                />
            </Grid>

            <Grid spacing={12}>
                <TextField
                    fullWidth
                    label="SKU"
                    value={values.sku}
                    onChange={(e) => setFieldValue("sku", e.target.value)}
                    error={!!errors.sku}
                    helperText={errors.sku}
                    variant="standard"
                    sx={(theme: Theme) => ({
                        "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
                        "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
                    })}
                />
            </Grid>

            <Grid spacing={12}>
                <TextField
                    fullWidth
                    label="Precio"
                    type="number"
                    value={values.price === 0 ? "" : values.price}
                    onChange={(e) => setFieldValue("price", parseFloat(e.target.value) || 0)}
                    error={!!errors.price}
                    helperText={errors.price}
                    variant="standard"
                    inputProps={{ min: 0, step: "0.01" }}
                    sx={(theme: Theme) => ({
                        "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
                        "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
                    })}
                />
            </Grid>
        </Grid>
    );
};

export default ProductsFormFirstStep;
