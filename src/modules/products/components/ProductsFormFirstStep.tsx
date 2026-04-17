import { TextField, Grid, type Theme } from "@mui/material";
import { useFormikContext } from "formik";
import type { ProductFormValues } from "./ProductsFormSchema";

const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
    "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
});

const ProductsFormFirstStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();

    return (
        <Grid container spacing={2} display={"flex"} flexDirection={"column"}>
            <Grid spacing={12}>
                <TextField
                    fullWidth
                    label="Nombre del producto"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    variant="standard"
                    sx={sharedSx}
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
                    sx={sharedSx}
                />
            </Grid>

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

            <Grid spacing={12}>
                <TextField
                    fullWidth
                    label="URL de imagen"
                    placeholder="/images/productExample/mi-producto.png"
                    value={values.image_url}
                    onChange={(e) => setFieldValue("image_url", e.target.value)}
                    error={!!errors.image_url}
                    helperText={errors.image_url}
                    variant="standard"
                    sx={sharedSx}
                />
            </Grid>
        </Grid>
    );
};

export default ProductsFormFirstStep;