import { TextField, Grid, Card, CardContent, Box, type Theme, InputAdornment } from "@mui/material";
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

const ProductVariantFormThirdStep = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductVariantFormValues>();
    console.log("Form values in third step:", values);
    console.log("Form errors in third step:", errors);

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
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Stock actual"
                                    type="number"
                                    value={values.stock}
                                    onChange={(e) => setFieldValue("stock", e.target.value === "" ? "" : Number(e.target.value))}
                                    error={!!errors.stock}
                                    helperText={errors.stock}
                                    variant="outlined"
                                    inputProps={{ min: 0 }}
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Stock mínimo"
                                    type="number"
                                    value={values.min_stock}
                                    onChange={(e) => setFieldValue("min_stock", e.target.value === "" ? "" : Number(e.target.value))}
                                    error={!!errors.min_stock}
                                    helperText={errors.min_stock ?? "Alerta cuando el stock baje de este valor"}
                                    variant="outlined"
                                    inputProps={{ min: 1 }}
                                    sx={sharedSx}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Precio"
                                    type="number"
                                    value={values.price}
                                    onChange={(e) => setFieldValue("price", e.target.value === "" ? "" : Number(e.target.value))}
                                    error={!!errors.price}
                                    helperText={errors.price}
                                    variant="outlined"
                                    inputProps={{ min: 1 }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
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

export default ProductVariantFormThirdStep;
