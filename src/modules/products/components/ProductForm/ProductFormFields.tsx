import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import type { ProductFormValues, ProductEditFormValues } from "@typings/product/productTypes";
import ProductImagePreview from "../../../shared/components/Image/ProductImagePreview";
import { sharedSx } from "../../../../modules/shared/components/sharedSx/sharedSx";
import type { ProductFormFieldsProps } from "@typings/product/productComponentTypes";
import FieldWithIcon from "../../../shared/components/FormCard/FieldWithIcon";


const ProductFormFields = ({ readOnly = false, icons }: ProductFormFieldsProps): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues & ProductEditFormValues>();

    return (
        <Grid
            container
            spacing={2.5}
            direction="column"
        >
            <Grid size={12}>
                <FieldWithIcon iconConfig={icons?.name}>
                    <TextField fullWidth required label="Nombre del producto" variant="outlined"
                        disabled={readOnly}
                        value={values.name} onChange={(e) => setFieldValue("name", e.target.value)}
                        error={!!errors.name} helperText={errors.name} sx={sharedSx}
                    />
                </FieldWithIcon>
            </Grid>

            <Grid size={12}>
                <FieldWithIcon iconConfig={icons?.brand}>
                    <TextField fullWidth required label="Marca" variant="outlined"
                        disabled={readOnly}
                        value={values.brand} onChange={(e) => setFieldValue("brand", e.target.value)}
                        error={!!errors.brand} helperText={errors.brand} sx={sharedSx}
                    />
                </FieldWithIcon>
            </Grid>

            <Grid size={12}>
                <FieldWithIcon iconConfig={icons?.description}>
                    <TextField fullWidth required multiline rows={4} label="Descripción" variant="outlined"
                        disabled={readOnly}
                        value={values.description} onChange={(e) => setFieldValue("description", e.target.value)}
                        error={!!errors.description} helperText={errors.description} sx={sharedSx}
                    />
                </FieldWithIcon>
            </Grid>

            <Grid size={12}>
                <FieldWithIcon iconConfig={icons?.image_url}>
                    <TextField fullWidth label="URL de imagen" variant="outlined"
                        disabled={readOnly}
                        placeholder="/images/productExample/mi-producto.png"
                        value={values.image_url} onChange={(e) => setFieldValue("image_url", e.target.value)}
                        error={!!errors.image_url}
                        helperText={errors.image_url ?? "Opcional — ruta relativa o URL externa"}
                        sx={sharedSx}
                    />
                </FieldWithIcon>
            </Grid>

            {values.image_url && (
                <Grid size={12}>
                    <ProductImagePreview imageUrl={values.image_url} />
                </Grid>
            )}

        </Grid>
    );
};

export default ProductFormFields;