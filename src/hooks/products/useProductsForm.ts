import { useState } from "react";
import type { FormikErrors } from "formik";
import type { CreatedProductInterface, ProductFormValues, UseProductsFormReturn } from "@typings/product/productTypes";
import { useFormSteps } from "../../hooks/shared/useFormSteps";
import { API_URL } from "../../config/api";
import { stepFieldsMap } from "../../modules/productVariants/schema/ProductsVariantFormSchema";
import { stepsConfig } from "../../config/constants";


export const useProductsForm = (): UseProductsFormReturn => {
    const [createdEntity, setCreatedEntity] = useState<CreatedProductInterface | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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
                name:         values.name,
                description:  values.description,
                created_at:   now,
                updated_at:   now,
                image_url:    values.image_url ?? "",
                gallery_urls: values.gallery_urls ?? [],
                brand:        values.brand,
                variants:     [],
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
            setCreatedEntity({ _id: data._id, name: values.name });
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

    return {
        createdEntity,
        isSubmitting,
        submitError,
        setCreatedEntity,
        setIsSubmitting,
        setSubmitError,
        currentStep: stepState.currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
    };
};