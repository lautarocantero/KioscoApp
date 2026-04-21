import { TextField, Grid, Card, CardContent, Typography, Box, type Theme } from "@mui/material";
import { useFormikContext } from "formik";
import type { ProductFormValues } from "./ProductsFormSchema";

const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&:hover fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&.Mui-focused fieldset": { borderColor: theme?.custom?.fontColorTransparent },
    },
});

const ProductsFormFirstStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', p: 2 }}>
            <Card 
                sx={(theme: Theme) => ({
                    width: '100%',
                    maxWidth: 800,
                    boxShadow: 3,
                    bgcolor: theme.custom?.backgroundDark,
                })}
            >
                <CardContent sx={{ p: 4 }}>
                    <Box component="form" noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre del producto"
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
                                    placeholder="/images/productExample/mi-producto.png"
                                    value={values.image_url}
                                    onChange={(e) => setFieldValue("image_url", e.target.value)}
                                    error={!!errors.image_url}
                                    helperText={errors.image_url}
                                    variant="outlined"
                                    sx={sharedSx}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProductsFormFirstStep;