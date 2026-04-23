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

const ProductVariantFormSecondStep = (): React.ReactNode => {
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
                    <Box component="div">
                        <Grid container spacing={3}>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="SKU"
                                    placeholder="Ej: CC500CLASPET"
                                    value={values.sku}
                                    onChange={(e) => setFieldValue("sku", e.target.value.toUpperCase())}
                                    error={!!errors.sku}
                                    helperText={errors.sku ?? "Solo letras, números, guiones y guiones bajos"}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tipo de envase / modelo"
                                    placeholder="Ej: Descartable PET, Lata, Vidrio retornable"
                                    value={values.model_type}
                                    onChange={(e) => setFieldValue("model_type", e.target.value)}
                                    error={!!errors.model_type}
                                    helperText={errors.model_type}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tamaño / Contenido"
                                    placeholder="Ej: 500ml, 1kg, 12 unidades"
                                    value={values.model_size}
                                    onChange={(e) => setFieldValue("model_size", e.target.value)}
                                    error={!!errors.model_size}
                                    helperText={errors.model_size}
                                    variant="outlined"
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Fecha de vencimiento"
                                    type="date"
                                    value={values.expiration_date}
                                    onChange={(e) => setFieldValue("expiration_date", e.target.value)}
                                    error={!!errors.expiration_date}
                                    helperText={errors.expiration_date}
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
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

export default ProductVariantFormSecondStep;
