import { TextField, Grid, Card, CardContent, Box, type Theme } from "@mui/material";
import { useFormikContext } from "formik";
import type { ProductVariantFormValues } from "./ProductVariantFormSchema";

const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&:hover fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&.Mui-focused fieldset": { borderColor: theme?.custom?.fontColorTransparent },
    },
});

const ProductVariantFormFirstStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductVariantFormValues>();

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh", p: 2 }}>
            <Card
                sx={(theme: Theme) => ({
                    width: "100%",
                    maxWidth: 800,
                    boxShadow: 3,
                    bgcolor: theme.custom?.backgroundDark,
                })}
            >
                <CardContent sx={{ p: 4 }}>
                    <Box component="div" noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre de la presentación"
                                    placeholder="Ej: Coca Cola 500ml"
                                    value={values.name}
                                    onChange={(e) => setFieldValue("name", e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Marca"
                                    placeholder="Ej: Coca Cola"
                                    value={values.brand}
                                    onChange={(e) => setFieldValue("brand", e.target.value)}
                                    error={!!errors.brand}
                                    helperText={errors.brand}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Descripción"
                                    value={values.description}
                                    onChange={(e) => setFieldValue("description", e.target.value)}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="URL de imagen"
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    value={values.image_url}
                                    onChange={(e) => setFieldValue("image_url", e.target.value)}
                                    error={!!errors.image_url}
                                    helperText={errors.image_url}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProductVariantFormFirstStep;
