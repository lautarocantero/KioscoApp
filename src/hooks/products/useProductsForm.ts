import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { FormikErrors } from "formik";
import type {
    CreatedProductInterface,
    UpdatedProductInterface,
    ExistingProductInterface,
    ProductFormValues,
    ProductEditFormValues,
    UseProductsFormReturn,
    UseProductsEditFormReturn,
    UseProductsDetailFormReturn,
} from "@typings/product/productTypes";
import { useFormSteps } from "../../hooks/shared/useFormSteps";
import { API_URL } from "../../config/api";
import { stepFieldsMap } from "../../modules/products/schema/ProductFormSchema";
import { editStepFieldsMap } from "../../modules/products/schema/ProductFormSchema";
import { stepsConfig, editStepsConfig } from "../../config/constants";

// ─── Modo CREAR ──────────────────────────────────────────────────────────────

export function useProductCreate(): UseProductsFormReturn {
    const [createdEntity, setCreatedEntity] = useState<CreatedProductInterface | null>(null);
    const [isSubmitting, setIsSubmitting]   = useState(false);
    const [submitError, setSubmitError]     = useState<string | null>(null);
    const [stepErrors, setStepErrors]       = useState<string[]>([]);

    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(stepsConfig);

    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<ProductFormValues>>,
        onValidSubmit?: () => void,
    ) => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const currentErrors = currentStepFields
            .filter((field) => errors[field])
            .map((field) => errors[field] as string);

        if (currentErrors.length > 0) {
            setStepErrors(currentErrors);
            return;
        }

        setStepErrors([]);

        if (onValidSubmit) {
            onValidSubmit();
            return;
        }

        goToNext();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrevStep = () => {
        setStepErrors([]);
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
                image_url:    values.image_url    ?? "",
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
        stepErrors,
        setCreatedEntity,
        setIsSubmitting,
        setSubmitError,
        currentStep: stepState.currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
    };
}

// ─── Modo EDITAR ─────────────────────────────────────────────────────────────

export function useProductEdit(): UseProductsEditFormReturn {
    const { productId } = useParams<{ productId: string }>();

    const [editingEntity, setEditingEntity]     = useState<ExistingProductInterface | null>(null);
    const [updatedEntity, setUpdatedEntity]     = useState<UpdatedProductInterface | null>(null);
    const [isLoadingEntity, setIsLoadingEntity] = useState(true);
    const [isSubmitting, setIsSubmitting]       = useState(false);
    const [submitError, setSubmitError]         = useState<string | null>(null);
    const [stepErrors, setStepErrors]           = useState<string[]>([]);

    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(editStepsConfig);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            setIsLoadingEntity(true);
            try {
                const response = await fetch(`${API_URL}/product/get-product-by-id/${productId}`);
                if (!response.ok) throw new Error(`Error ${response.status}`);
                const data: ExistingProductInterface = await response.json();
                setEditingEntity(data);
            } catch (error) {
                setSubmitError(
                    error instanceof Error
                        ? error.message
                        : "No se pudo cargar el producto"
                );
            } finally {
                setIsLoadingEntity(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<ProductEditFormValues>>,
        onValidSubmit?: () => void,
    ) => {
        const errors = await validateForm();
        const currentStepFields = editStepFieldsMap[stepState.currentStep];
        const currentErrors = currentStepFields
            .filter((field) => errors[field as keyof ProductEditFormValues])
            .map((field) => errors[field as keyof ProductEditFormValues] as string);

        if (currentErrors.length > 0) {
            setStepErrors(currentErrors);
            return;
        }

        setStepErrors([]);

        if (onValidSubmit) {
            onValidSubmit();
            return;
        }

        goToNext();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrevStep = () => {
        setStepErrors([]);
        goToPrev();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleEdit = async (values: ProductEditFormValues) => {
        if (!productId) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const body = {
                _id:          productId,
                name:         values.name,
                description:  values.description,
                brand:        values.brand,
                image_url:    values.image_url    ?? "",
                gallery_urls: values.gallery_urls ?? [],
                updated_at:   new Date().toISOString(),
            };

            const response = await fetch(`${API_URL}/product/edit-product/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            setUpdatedEntity({ _id: productId, name: values.name });
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Error inesperado al actualizar el producto"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        editingEntity,
        updatedEntity,
        isLoadingEntity,
        isSubmitting,
        submitError,
        stepErrors,
        setEditingEntity,
        setUpdatedEntity,
        setIsSubmitting,
        setSubmitError,
        currentStep: stepState.currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleEdit,
    };
}

// ─── Modo DETALLE ────────────────────────────────────────────────────────────

export function useProductDetail(): UseProductsDetailFormReturn {
    const { productId } = useParams<{ productId: string }>();

    const [viewingEntity, setViewingEntity]     = useState<ExistingProductInterface | null>(null);
    const [isLoadingEntity, setIsLoadingEntity] = useState(true);
    const [loadError, setLoadError]             = useState<string | null>(null);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            setIsLoadingEntity(true);
            try {
                const response = await fetch(`${API_URL}/product/get-product-by-id/${productId}`);
                if (!response.ok) throw new Error(`Error ${response.status}`);
                const data: ExistingProductInterface = await response.json();
                setViewingEntity(data);
            } catch (error) {
                setLoadError(
                    error instanceof Error
                        ? error.message
                        : "No se pudo cargar el producto"
                );
            } finally {
                setIsLoadingEntity(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return {
        viewingEntity,
        isLoadingEntity,
        loadError,
        setViewingEntity,
    };
}