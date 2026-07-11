import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { FormikErrors } from "formik";
import type {
    CreatedProductInterface,
    UpdatedProductInterface,
    ProductFormValues,
    ProductEditFormValues,
    UseProductsFormReturn,
    UseProductsEditFormReturn,
} from "@typings/product/productTypes";
import type { AppDispatch } from "../../store/product/productSlice";
import { createProduct, editProduct } from "../../store/product/productThunks";
import { useProductData } from "./useProductData";
import { useFormSteps } from "../../hooks/shared/useFormSteps";
import { useErrorParser } from "../shared/useErrorParser";
import { stepFieldsMap, editStepFieldsMap } from "../../modules/products/schema/ProductFormSchema";
import { stepsConfig, editStepsConfig } from "../../config/constants";

// ─── Modo CREAR ──────────────────────────────────────────────────────────────

export function useProductCreate(): UseProductsFormReturn {
    const dispatch = useDispatch<AppDispatch>();

    const [createdEntity, setCreatedEntity] = useState<CreatedProductInterface | null>(null);
    const [isSubmitting, setIsSubmitting]   = useState(false);
    const [submitError, setSubmitError]     = useState<string | null>(null);
    const [stepErrors, setStepErrors]       = useState<string[]>([]);

    const { parseError } = useErrorParser();

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
                brand:        values.brand,
                presentations:     [],
            };

            const created = await dispatch(createProduct(body));

            if (!created) {
                throw new Error("Error al crear el producto");
            }

            setCreatedEntity({ _id: created._id, name: created.name });
        } catch (error) {
            const message = await parseError(error, "Error inesperado al crear el producto");
            setSubmitError(message);
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
    const dispatch = useDispatch<AppDispatch>();

    const {
        productData: editingEntity,
        isLoading: isLoadingEntity,
        error: loadError,
    } = useProductData(productId);

    const [updatedEntity, setUpdatedEntity]     = useState<UpdatedProductInterface | null>(null);
    const [isSubmitting, setIsSubmitting]       = useState(false);
    const [submitError, setSubmitError]         = useState<string | null>(loadError);
    const [stepErrors, setStepErrors]           = useState<string[]>([]);

    const { parseError } = useErrorParser();

    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(editStepsConfig);

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

    // ─── Ahora despacha el thunk editProduct en vez de fetch manual ─────────
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
            };

            const updated = await dispatch(editProduct(body));

            if (!updated) {
                throw new Error("Error al actualizar el producto");
            }

            setUpdatedEntity({ _id: updated._id, name: updated.name });
        } catch (error) {
            const message = await parseError(error, "Error inesperado al actualizar el producto");
            setSubmitError(message);
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
        setEditingEntity: () => {  },
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