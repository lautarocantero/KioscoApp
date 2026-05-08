import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import type { ProductFormValues } from "@typings/product/productTypes";
import ProductImagePreview from "./ProductImagePreview";
import { sharedSx } from "../../../../modules/shared/components/sharedSx/sharedSx";

const ProductFormFields = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();

    return (
        <Grid container spacing={2.5}>
            <Grid spacing={{ xs: "12", sm: "6" }}>
                <TextField fullWidth required label="Nombre del producto" variant="outlined"
                    value={values.name} onChange={(e) => setFieldValue("name", e.target.value)}
                    error={!!errors.name} helperText={errors.name} sx={sharedSx}
                />
            </Grid>

            <Grid spacing={{ xs: "12", sm: "6" }}>
                <TextField fullWidth required label="Marca" variant="outlined"
                    value={values.brand} onChange={(e) => setFieldValue("brand", e.target.value)}
                    error={!!errors.brand} helperText={errors.brand} sx={sharedSx}
                />
            </Grid>

            <Grid spacing={{ xs: "12" }}>
                <TextField fullWidth required multiline rows={4} label="Descripción" variant="outlined"
                    value={values.description} onChange={(e) => setFieldValue("description", e.target.value)}
                    error={!!errors.description} helperText={errors.description} sx={sharedSx}
                />
            </Grid>

            <Grid spacing={{ xs: "12" }}>
                <TextField fullWidth label="URL de imagen" variant="outlined"
                    placeholder="/images/productExample/mi-producto.png"
                    value={values.image_url} onChange={(e) => setFieldValue("image_url", e.target.value)}
                    error={!!errors.image_url}
                    helperText={errors.image_url ?? "Opcional — ruta relativa o URL externa"}
                    sx={sharedSx}
                />
            </Grid>

            {values.image_url && (
                <Grid spacing={{ xs: "12" }}>
                    <ProductImagePreview imageUrl={values.image_url} />
                </Grid>
            )}
        </Grid>
    );
};

export default ProductFormFields;