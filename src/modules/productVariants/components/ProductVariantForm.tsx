import {
    Grid, Box
} from "@mui/material";
import { Formik } from "formik";
import type { FormikErrors } from "formik";
import { useParams } from "react-router-dom";
import { useFormSteps } from "../../../hooks/shared/useFormSteps";
import {
    getProductVariantFormInitialValues,
    productVariantFormSchema,
    stepFieldsMap,
    type ProductVariantFormValues,
} from "./ProductVariantFormSchema";
import { FormNavigationContext } from "../../products/context/FormNavigationContext";
import ProductVariantFormFirstStep from "./ProductVariantFormFirstStep";
import ProductVariantFormSecondStep from "./ProductVariantFormSecondStep";
import ProductVariantFormThirdStep from "./ProductVariantFormThirdStep";
import { useProductData } from "../../../hooks/products/useProductData";
import type { CreatedVariantInterface } from "@typings/productVariant/productVariant";
import { API_URL } from "../../../config/api";
import { useProductsForm } from "../../../hooks/products/useProductsForm";
import LoadingProductComponent from "./LoadingProduct";
import NoProductLoadedComponent from "./NotProductLoaded";
import VariantCreatedComponent from "./VariantCreatedComponent";
import ApiErrorComponent from "../../products/components/ProductsForm/ApiError";
import ActualStepComponent from "../../products/components/ProductsForm/ActualStep";
import ProductsFormHeaderComponent from "../../products/components/ProductsForm/ProductsFormHeader";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../config/constants";
import BaseEntitySummaryComponent from "./BaseEntitySummary";
import CancelButtonComponent from "../../../modules/shared/components/Buttons/CancelButton";


const STEPS_LABELS   = ["Datos del producto", "Datos de la presentación", "Stock y operación"];
const STEP_COMPONENTS = [
    ProductVariantFormFirstStep,
    ProductVariantFormSecondStep,
    ProductVariantFormThirdStep,
];

// ─────────────────────────────────────────────────────────────────────────────
const ProductVariantFormComponent = (): React.ReactNode => {
    const { productId } = useParams<{ productId: string }>();

    // ─── Datos del producto: store primero, fetch como fallback ──────────
    const { productData, isLoading: loadingProduct, error: productError } = useProductData(productId);

    const {
        createdEntity: createdVariant,
        isSubmitting,
        submitError,
        setCreatedEntity: setCreatedVariant,
        setIsSubmitting,
        setSubmitError,
    } = useProductsForm<CreatedVariantInterface>();

    const stepsConfig = STEPS_LABELS.map((label) => ({ title: label, content: null }));
    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(stepsConfig);

    // ─── Validar paso actual antes de avanzar ────────────────────────────
    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<ProductVariantFormValues>>
    ) => {
        const errors           = await validateForm();
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const hasErrors        = currentStepFields.some(
            (field) => errors[field as keyof ProductVariantFormValues]
        );
        if (!hasErrors) {
            goToNext();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrevStep = () => {
        goToPrev();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ─── Submit ───────────────────────────────────────────────────────────
    const handleSubmit = async (values: ProductVariantFormValues) => {
        if (!productData) {
            setSubmitError("Datos del producto no disponibles");
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Usar FormData para enviar datos + imagen
            const formData = new FormData();
            formData.append("name", productData.name);
            formData.append("description", productData.description);
            formData.append("brand", productData.brand);
            formData.append("image_url", values.image_url || productData.image_url);
            if (values.image_file) {
                formData.append("image", values.image_file); // File object real
            }
            formData.append("gallery_urls", JSON.stringify(productData.gallery_urls || []));
            formData.append("product_id", productId ?? "");
            formData.append("sku", values.sku);
            formData.append("model_type", values.model_type);
            formData.append("model_size", values.model_size);
            formData.append("min_stock", String(values.min_stock));
            formData.append("stock", String(values.stock));
            formData.append("price", String(values.price));
            formData.append("expiration_date", values.expiration_date);

            const response = await fetch(
                `${API_URL}/product-variant/create-product-variant`,
                {
                    method:      "POST",
                    // No establecer Content-Type: se asignará automáticamente con boundary
                    credentials: "include",
                    body:        formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            const data: { _id: string; message: string } = await response.json();
            setCreatedVariant({
                _id:  data._id,
                name: `${productData.name} - ${values.model_size}`,
            });

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

    if (loadingProduct) return <LoadingProductComponent />;

    if (!productData) return <NoProductLoadedComponent productError={productError} />;

    if (createdVariant) return (
        <VariantCreatedComponent
            createdVariant={createdVariant}
            onCreateAnother={() => { setCreatedVariant(null); setSubmitError(null); }}
        />
    );


    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

            <BaseEntitySummaryComponent
                label="Producto base"
                name={productData.name}
                description="• Estás creando una presentación para este producto"
            />

            {/* ─── Formulario ────────────────────────────────────────────────── */}
            <Formik
                initialValues={getProductVariantFormInitialValues()}
                validationSchema={productVariantFormSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({ handleSubmit: formikSubmit, validateForm }) => (
                    <FormNavigationContext.Provider
                        value={{
                            currentStep: stepState.currentStep,
                            totalSteps,
                            onNext:      handleNextStep,
                            onPrev:      handlePrevStep,
                            onSubmit:    formikSubmit,
                            isSubmitting,
                            validateForm,
                        }}
                    >
                        <Grid container component="form" onSubmit={formikSubmit}>

                            <ProductsFormHeaderComponent 
                                stepsLabels={PRODUCTS_VARIANT_STEPS_LABELS} 
                                currentStep={stepState.currentStep} 
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
        </Box>
    );
};

export default ProductVariantFormComponent;
