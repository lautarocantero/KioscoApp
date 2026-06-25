import { Box, Grid, TextField, InputAdornment } from "@mui/material";
import { Formik } from "formik";
import LoadingProductComponent from "../LoadingProduct";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import BaseEntitySummaryComponent from "../BaseEntitySummary";
import { useProductVariantForm } from "../../../../hooks/productsVariant/useProductVariantForm";
import { getPresentationDetailInitialValues } from "../../schema/PresentationFormSchema";
import ProductFormCard from "../../../products/components/ProductsForm/ProductFormCard";

const ProductVariantDetailFormComponent = (): React.ReactNode => {
    const {
        editingVariant: variant,
        isLoadingEntity,
        submitError,
    } = useProductVariantForm({ mode: "edit" });

    if (isLoadingEntity) return <LoadingProductComponent />;

    // Guardar hasta tener el variant para que initialValues no sea vacío
    if (!variant) return (
    <Box sx={{ color: "white", p: 4 }}>
        <pre>isLoadingEntity: {String(isLoadingEntity)}</pre>
        <pre>variant: {JSON.stringify(variant, null, 2)}</pre>
    </Box>
);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "auto", p: 2, pt: 0 }}>
            <ProductFormCard submitText="" showButtons={false}>
                <Formik
                    initialValues={getPresentationDetailInitialValues(variant)}
                    onSubmit={() => {}}
                    validateOnBlur={false}
                    validateOnChange={false}
                    enableReinitialize
                >
                    {({ values }) => (
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                        >
                            {variant && (
                                <BaseEntitySummaryComponent
                                    label="Presentación"
                                    name={`${variant.model_type} — ${variant.model_size}`}
                                    description="• Estás viendo los datos de esta presentación"
                                />
                            )}

                            <ApiErrorComponent submitError={submitError} />

                            {/* ── Identificación ──────────────────────────────── */}
                            <Grid component={"div"} container spacing={2}>
                                <Grid component={"div"} size={{ xs: 12, sm: 4 }}>
                                    <TextField
                                        label="SKU"
                                        value={values.sku}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid component={"div"} size={{ xs: 12, sm: 4 }}>
                                    <TextField
                                        label="Tipo de modelo"
                                        value={values.model_type}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid component={"div"} size={{ xs: 12, sm: 4 }}>
                                    <TextField
                                        label="Tamaño / Presentación"
                                        value={values.model_size}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            {/* ── Imagen ──────────────────────────────────────── */}
                            {values.image_url && (
                                <Box>
                                    <Box
                                        component="img"
                                        src={values.image_url}
                                        alt="Imagen de envase"
                                        sx={{
                                            width: 160,
                                            height: 160,
                                            objectFit: "contain",
                                            borderRadius: 2,
                                            border: "1px solid",
                                            borderColor: "divider",
                                            p: 1,
                                        }}
                                    />
                                </Box>
                            )}

                            {/* ── Stock ───────────────────────────────────────── */}
                            <Grid component={"div"} container spacing={2}>
                                <Grid component={"div"} size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Stock mínimo"
                                        value={values.min_stock}
                                        disabled
                                        fullWidth
                                        type="number"
                                    />
                                </Grid>
                                <Grid component={"div"} size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Stock actual"
                                        value={values.stock}
                                        disabled
                                        fullWidth
                                        type="number"
                                    />
                                </Grid>
                            </Grid>

                            {/* ── Precio y vencimiento ────────────────────────── */}
                            <Grid component={"div"} container spacing={2}>
                                <Grid component={"div"} size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Precio"
                                        value={values.price}
                                        disabled
                                        fullWidth
                                        type="number"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">$</InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid component={"div"} size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Fecha de vencimiento"
                                        value={values.expiration_date}
                                        disabled
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Formik>
            </ProductFormCard>
        </Box>
    );
};

export default ProductVariantDetailFormComponent;