import { useParams } from "react-router-dom";
import type { FormikErrors } from "formik";
import { useFormSteps } from "../../hooks/shared/useFormSteps";
import { useProductsForm } from "../../hooks/products/useProductsForm";
import { useProductData } from "../../hooks/products/useProductData";
import type { ProductVariantFormValues } from "@typings/productVariant/productVariantTypes";
import { API_URL } from "../../config/api";
import { stepFieldsMap } from "../../modules/productVariants/schema/ProductsVariantFormSchema";

const STEPS_LABELS = ["Datos del producto", "Datos de la presentación", "Stock y operación"];

export const useProductVariantForm = () => {
    const { productId } = useParams<{ productId: string }>();

    const { productData, isLoading: loadingProduct, error: productError } = useProductData(productId);

    const {
        createdEntity: createdVariant,
        isSubmitting,
        submitError,
        setCreatedEntity: setCreatedVariant,
        setIsSubmitting,
        setSubmitError,
    } = useProductsForm();

    const stepsConfig = STEPS_LABELS.map((label) => ({ title: label, content: null }));
    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(stepsConfig);

    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<ProductVariantFormValues>>
    ) => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const hasErrors = currentStepFields.some(
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

    const handleSubmit = async (values: ProductVariantFormValues) => {
        if (!productData) {
            setSubmitError("Datos del producto no disponibles");
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const formData = new FormData();
            formData.append("name",           productData.name);
            formData.append("description",    productData.description);
            formData.append("brand",          productData.brand);
            formData.append("image_url",      values.image_url || productData.image_url);
            formData.append("gallery_urls",   JSON.stringify(productData.gallery_urls || []));
            formData.append("product_id",     productId ?? "");
            formData.append("sku",            values.sku);
            formData.append("model_type",     values.model_type);
            formData.append("model_size",     values.model_size);
            formData.append("min_stock",      String(values.min_stock));
            formData.append("stock",          String(values.stock));
            formData.append("price",          String(values.price));
            formData.append("expiration_date", values.expiration_date);

            if (values.image_file) {
                formData.append("image", values.image_file);
            }

            const response = await fetch(`${API_URL}/product-variant/create-product-variant`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

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

    const handleCreateAnother = () => {
        setCreatedVariant(null);
        setSubmitError(null);
    };

    return {
        productId,
        productData,
        loadingProduct,
        productError,
        createdVariant,
        isSubmitting,
        submitError,
        currentStep: stepState.currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
        handleCreateAnother,
    };
};