import { useState } from "react";
import { Grid, Box, Button, Typography, type Theme } from "@mui/material";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useFormSteps } from "../../../hooks/shared/useFormSteps";
import FormGridComponent from "../../shared/components/FormGrid/FormGrid";
import {
    getProductVariantFormInitialValues,
    productVariantFormSchema,
    stepFieldsMap,
    type ProductVariantFormValues,
} from "./ProductVariantFormSchema";
import ProductVariantFormFirstStep from "./ProductVariantFormFirstStep";
import ProductVariantFormThirdStep from "./ProductVariantFormThirdStep";
import ProductVariantFormSecondStep from "./ProductVariantFormSecondStep";

type CreatedVariant = { _id: string; name: string };

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const ProductVariantFormComponent = (): React.ReactNode => {
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();
    console.log("Product ID from URL params:", productId);

    const [createdVariant, setCreatedVariant] = useState<CreatedVariant | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const stepsConfig = [
        { title: "Datos básicos",   content: <ProductVariantFormFirstStep /> },
        { title: "Modelo y envase", content: <ProductVariantFormSecondStep /> },
        { title: "Stock y precio",  content: <ProductVariantFormThirdStep /> },
    ];

    const formSteps = useFormSteps(stepsConfig);

    // ─── Submit → POST /product-variant/create-product-variant ───────────────
    const handleSubmit = async (values: ProductVariantFormValues) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const body = {
                name:            values.name,
                description:     values.description,
                brand:           values.brand,
                image_url:       values.image_url,
                gallery_urls:    [],
                product_id:      productId ?? values.product_id,
                sku:             values.sku,
                model_type:      values.model_type,
                model_size:      values.model_size,
                min_stock:       Number(values.min_stock),
                stock:           Number(values.stock),
                price:           Number(values.price),
                expiration_date: values.expiration_date,
            };

            const response = await fetch(`${API_BASE_URL}/product-variant/create-product-variant`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            const data: { _id: string; message: string } = await response.json();
            setCreatedVariant({ _id: data._id, name: values.name });
        } catch (error) {
            console.error("❌ Error al crear presentación:", error);
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Error inesperado al crear la presentación"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateCurrentStep = async (
        validateForm: () => Promise<Partial<Record<keyof ProductVariantFormValues, string>>>,
        currentStep: number
    ): Promise<boolean> => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[currentStep];
        return !currentStepFields.some((field) => errors[field]);
    };

    // ─── Pantalla post-submit ─────────────────────────────────────────────────
    if (createdVariant) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={3}
                mt={6}
                px={2}
            >
                <Typography variant="h6" textAlign="center">
                    ✅ Presentación <strong>"{createdVariant.name}"</strong> creada correctamente.
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    ¿Querés agregar otra presentación para este producto?
                </Typography>

                <Box display="flex" flexDirection="column" gap={2} width="100%" maxWidth={340}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            setCreatedVariant(null);
                            setSubmitError(null);
                        }}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        Crear otra presentación
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate(`/products/${productId ?? ""}`)}
                        sx={(theme: Theme) => ({
                            textTransform: "none",
                            borderColor: theme?.custom?.fontColorTransparent,
                            color: theme?.custom?.fontColorTransparent,
                        })}
                    >
                        Ver producto
                    </Button>

                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => navigate("/products")}
                        sx={(theme: Theme) => ({
                            textTransform: "none",
                            color: theme?.custom?.fontColorTransparent,
                        })}
                    >
                        Volver a productos
                    </Button>
                </Box>
            </Box>
        );
    }

    // ─── Formulario ───────────────────────────────────────────────────────────
    return (
        <Formik
            initialValues={getProductVariantFormInitialValues(productId ?? "")}
            validationSchema={productVariantFormSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <Grid container component="form" onSubmit={formikSubmit}>
                    {submitError && (
                        <Grid size={12}>
                            <Typography color="error" variant="body2" textAlign="center">
                                ❌ {submitError}
                            </Typography>
                        </Grid>
                    )}

                    <FormGridComponent
                        formSteps={formSteps}
                        prevLink={`/products/${productId ?? ""}`}
                        validateStep={(step) => validateCurrentStep(validateForm, step)}
                        isSubmitting={isSubmitting}
                    />
                </Grid>
            )}
        </Formik>
    );
};

export default ProductVariantFormComponent;
