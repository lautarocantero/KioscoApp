import { useState } from "react";
import { Grid, Box, Button, Typography, type Theme } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useFormSteps } from "../../../hooks/shared/useFormSteps";
import FormGridComponent from "../../shared/components/FormGrid/FormGrid";
import {
    getProductFormInitialValues,
    productFormSchema,
    stepFieldsMap,
    type ProductFormValues,
} from "./ProductsFormSchema";
import ProductsFormFirstStep from "./ProductsFormFirstStep";

type CreatedProduct = { _id: string; name: string };

// ─── URL base de la API — mover a una variable de entorno ─────────────────────
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const ProductsFormComponent = (): React.ReactNode => {
    const navigate = useNavigate();
    const [createdProduct, setCreatedProduct] = useState<CreatedProduct | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const stepsConfig = [
        { title: "Datos del producto", content: <ProductsFormFirstStep /> },
    ];

    const formSteps = useFormSteps(stepsConfig);

    // ─── Submit → llama a POST /product/create-product ───────────────────────
    const handleSubmit = async (values: ProductFormValues) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const now = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

            const body = {
                name:        values.name,
                description: values.description,
                brand:       values.brand,
                image_url:   values.image_url ?? "",
                gallery_urls: [],   // sin galería en la creación inicial
                variants:    [],    // las variantes se crean en el siguiente paso
                created_at:  now,
                updated_at:  now,
            };

            const response = await fetch(`${API_BASE_URL}/product/create-product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            const data: { _id: string; message: string } = await response.json();

            setCreatedProduct({ _id: data._id, name: values.name });
        } catch (error) {
            console.error("❌ Error al crear producto:", error);
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Error inesperado al crear el producto"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateCurrentStep = async (
        validateForm: () => Promise<Partial<Record<keyof ProductFormValues, string>>>,
        currentStep: number
    ): Promise<boolean> => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[currentStep];
        return !currentStepFields.some((field) => errors[field]);
    };

    // ─── Pantalla post-submit ─────────────────────────────────────────────────
    if (createdProduct) {
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
                    ✅ Producto <strong>"{createdProduct.name}"</strong> creado correctamente.
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    ¿Querés agregar una presentación para este producto?
                </Typography>

                <Box display="flex" flexDirection="column" gap={2} width="100%" maxWidth={340}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate(`/products/${createdProduct._id}/variants/new`)}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        Crear presentación
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate("/products")}
                        sx={(theme: Theme) => ({
                            textTransform: "none",
                            borderColor: theme?.custom?.fontColorTransparent,
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
            initialValues={getProductFormInitialValues()}
            validationSchema={productFormSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <Grid container component="form" onSubmit={formikSubmit}>
                    {/* Error de API */}
                    {submitError && (
                        <Grid size={12}>
                            <Typography color="error" variant="body2" textAlign="center">
                                ❌ {submitError}
                            </Typography>
                        </Grid>
                    )}

                    <FormGridComponent
                        formSteps={formSteps}
                        prevLink="/products"
                        validateStep={(step) => validateCurrentStep(validateForm, step)}
                        isSubmitting={isSubmitting}
                    />
                </Grid>
            )}
        </Formik>
    );
};

export default ProductsFormComponent;