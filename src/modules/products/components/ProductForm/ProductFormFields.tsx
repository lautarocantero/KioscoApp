import { Grid, TextField, IconButton, Box, Typography, Button } from "@mui/material";
import { useFormikContext, FieldArray } from "formik";
import type { ProductFormValues, ProductEditFormValues } from "@typings/product/productTypes";
import ProductImagePreview from "../../../shared/components/Image/ProductImagePreview";
import { sharedSx } from "../../../../modules/shared/components/sharedSx/sharedSx";
import type { ProductFormFieldsProps } from "@typings/product/productComponentTypes";


const ProductFormFields = ({ mode = "create",  disabled = false }: ProductFormFieldsProps): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues & ProductEditFormValues>();

    return (
        <Grid 
            container 
            spacing={2.5} 
            direction="column"
        >
            <Grid size={12}>
                <TextField fullWidth required label="Nombre del producto" variant="outlined"
                    disabled={disabled}
                    value={values.name} onChange={(e) => setFieldValue("name", e.target.value)}
                    error={!!errors.name} helperText={errors.name} sx={sharedSx}
                />
            </Grid>

            <Grid size={12}>
                <TextField fullWidth required label="Marca" variant="outlined"
                    disabled={disabled}
                    value={values.brand} onChange={(e) => setFieldValue("brand", e.target.value)}
                    error={!!errors.brand} helperText={errors.brand} sx={sharedSx}
                />
            </Grid>

            <Grid size={12}>
                <TextField fullWidth required multiline rows={4} label="Descripción" variant="outlined"
                    disabled={disabled}
                    value={values.description} onChange={(e) => setFieldValue("description", e.target.value)}
                    error={!!errors.description} helperText={errors.description} sx={sharedSx}
                />
            </Grid>

            <Grid size={12}>
                <TextField fullWidth label="URL de imagen" variant="outlined"
                    disabled={disabled}
                    placeholder="/images/productExample/mi-producto.png"
                    value={values.image_url} onChange={(e) => setFieldValue("image_url", e.target.value)}
                    error={!!errors.image_url}
                    helperText={errors.image_url ?? "Opcional — ruta relativa o URL externa"}
                    sx={sharedSx}
                />
            </Grid>

            {values.image_url && (
                <Grid size={12}>
                    <ProductImagePreview imageUrl={values.image_url} />
                </Grid>
            )}

            {mode === "edit" && (
                <Grid size={12}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        Galería de imágenes
                    </Typography>

                    <FieldArray name="gallery_urls">
                        {({ push, remove }) => (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                {values.gallery_urls?.map((_, index) => (
                                    <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                                        <TextField
                                            name={`gallery_urls[${index}]`}
                                            label={`Imagen ${index + 1}`}
                                            fullWidth
                                            disabled={disabled}

                                            placeholder="https://example.com/foto.jpg"
                                            size="small"
                                            sx={sharedSx}
                                        />
                                        <IconButton
                                            onClick={() => remove(index)}
                                            size="small"
                                            color="error"
                                            aria-label={`Eliminar imagen ${index + 1}`}
                                            sx={{ mt: 0.5 }}
                                        >
                                            ✕
                                        </IconButton>
                                    </Box>
                                ))}

                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => push("")}
                                    sx={{ alignSelf: "flex-start", mt: 0.5 }}
                                >
                                    + Agregar imagen a galería
                                </Button>
                            </Box>
                        )}
                    </FieldArray>
                </Grid>
            )}
        </Grid>
    );
};

export default ProductFormFields;