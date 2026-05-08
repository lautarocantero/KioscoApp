import { Grid, Box } from "@mui/material";
import { Formik } from "formik";
import type { FormikErrors } from "formik";
import { useFormSteps } from "../../../hooks/shared/useFormSteps";
import {
    FormNavigationContext,
} from "../context/FormNavigationContext";
import { API_URL } from "../../.././config/api";
import { useProductsForm } from "../../../hooks/products/useProductsForm";
import ProductCreatedComponent from "./ProductCreated";
import { PRODUCTS_STEPS_LABELS, stepsConfig } from "../../.././config/constants";
import ApiErrorComponent from "./ApiError";
import ActualStepComponent from "./ActualStep";
import ProductsFormHeaderComponent from "./ProductsFormHeader";
import type { CreatedProductInterface, ProductFormValues } from "@typings/product/productTypes";
import ProductsFormFirstStep from "../components/ProductsFormFirstStep";
import CancelButtonComponent from "../../../modules/shared/components/Buttons/CancelButton";
import { getProductFormInitialValues, productFormSchema, stepFieldsMap } from "../../../modules/productVariants/schema/ProductsVariantFormSchema";

const STEP_COMPONENTS = [
    ProductsFormFirstStep,
];

const ProductsFormComponent = (): React.ReactNode => {

    const {
        createdEntity:createdProduct,
        isSubmitting,
        submitError,
        setCreatedEntity: setCreatedProduct,
        setIsSubmitting,
        setSubmitError,
    } = useProductsForm<CreatedProductInterface>();

    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(stepsConfig);


    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<ProductFormValues>>
    ) => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const hasErrors = currentStepFields.some((field) => errors[field]);

        if (!hasErrors) {
            goToNext();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrevStep = () => {
        goToPrev();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (values: ProductFormValues) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const now = new Date().toISOString();
            const body = {
                // Producto base
                name:        values.name,
                description: values.description,
                created_at: now,
                updated_at: now,
                image_url:   values.image_url ?? "",
                gallery_urls:    values.gallery_urls ?? [],
                brand:       values.brand,
                variants: [],             
            };

            const response = await fetch(`${API_URL}/product/create-product`, {
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

    if (createdProduct) {
        return <ProductCreatedComponent createdProduct={createdProduct} />;
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
                <FormNavigationContext.Provider
                    value={{
                        currentStep: stepState.currentStep,
                        totalSteps,
                        onNext: handleNextStep,
                        onPrev: handlePrevStep,
                        onSubmit: formikSubmit,
                        isSubmitting,
                        validateForm,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit}>

                        <ProductsFormHeaderComponent
                            stepsLabels={PRODUCTS_STEPS_LABELS}
                            currentStep={stepState.currentStep}
                            banner={
                                <Box
                                    component="img"
                                    src="/images/productExample/ilustration.png"
                                    alt="Producto y presentaciones"
                                    sx={{ width: 420, height: 220, objectFit: "contain", flexShrink: 0 }}
                                />
                            }
                            banner_text="Primero creás el producto una sola vez — nombre, marca, descripción. Luego agregás sus presentaciones (2L, retornable, lata...) con el stock y precio de cada una"
                        />
                        
                        <ApiErrorComponent submitError={submitError} />

                        <ActualStepComponent 
                            currentStep={stepState.currentStep} 
                            stepComponents={STEP_COMPONENTS} 
                        />
                        
                        <CancelButtonComponent
                            navigateTo="/products"
                            label="← Cancelar y volver a productos"
                        />

                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

export default ProductsFormComponent;
