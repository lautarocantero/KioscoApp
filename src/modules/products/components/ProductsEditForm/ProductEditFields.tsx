import { Grid, TextField, IconButton, Box, Typography, Button } from "@mui/material";
import { useField, useFormikContext, FieldArray } from "formik";
import type { ProductEditFormValues } from "@typings/product/productTypes";


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 CAMPOS — Formulario de edición de producto                       ║
// ║                                                                      ║
// ║  ProductNameFieldComponent          → nombre                         ║
// ║  ProductDescriptionFieldComponent   → descripción                    ║
// ║  ProductBrandFieldComponent         → marca                          ║
// ║  ProductImageUrlFieldComponent      → URL de imagen principal        ║
// ║  ProductGalleryUrlsFieldComponent   → lista dinámica de URLs         ║
// ║                                                                      ║
// ║  Cada campo se conecta a Formik vía useField / FieldArray.           ║
// ║  No reciben props externas — leen el contexto del formulario.        ║
// ╚══════════════════════════════════════════════════════════════════════╝*/


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🏷️ Nombre                                                            ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const ProductNameFieldComponent = (): React.ReactNode => {
    const [field, meta] = useField("name");

    return (
        <Grid size={12}>
            <TextField
                {...field}
                label="Nombre del producto"
                fullWidth
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                placeholder="Ej: Coca Cola"
            />
        </Grid>
    );
};


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📝 Descripción                                                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const ProductDescriptionFieldComponent = (): React.ReactNode => {
    const [field, meta] = useField("description");

    return (
        <Grid size={12}>
            <TextField
                {...field}
                label="Descripción"
                fullWidth
                multiline
                minRows={3}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                placeholder="Breve descripción del producto"
            />
        </Grid>
    );
};


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🏭 Marca                                                             ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const ProductBrandFieldComponent = (): React.ReactNode => {
    const [field, meta] = useField("brand");

    return (
        <Grid size={12}>
            <TextField
                {...field}
                label="Marca"
                fullWidth
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                placeholder="Ej: Coca Cola Company"
            />
        </Grid>
    );
};


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🖼️ URL de imagen principal                                           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const ProductImageUrlFieldComponent = (): React.ReactNode => {
    const [field, meta] = useField("image_url");

    return (
        <Grid size={12}>
            <TextField
                {...field}
                label="URL de imagen principal"
                fullWidth
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                placeholder="https://example.com/imagen.jpg"
            />
        </Grid>
    );
};


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🖼️🖼️ Galería de imágenes                                             ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export const ProductGalleryUrlsFieldComponent = (): React.ReactNode => {
    const { values } = useFormikContext<ProductEditFormValues>();

    return (
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
                                    placeholder="https://example.com/foto.jpg"
                                    size="small"
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
    );
};


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🗂️ Agrupador — exporta todos los campos como un único componente     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

const ProductEditFieldsComponent = (): React.ReactNode => (
    <>
        <ProductNameFieldComponent />
        <ProductDescriptionFieldComponent />
        <ProductBrandFieldComponent />
        <ProductImageUrlFieldComponent />
        <ProductGalleryUrlsFieldComponent />
    </>
);

export default ProductEditFieldsComponent;
