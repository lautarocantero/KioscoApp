import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { FormikErrors } from "formik";
import { useFormSteps } from "../shared/useFormSteps";
import { useProductData } from "../products/useProductData";
import { usePresentationData } from "./usePresentationData";
import type {
    PresentationFormValues,
    CreatedVariantInterface,
    UsePresentationFormReturn,
    UsePresentationEditFormReturn,
} from "@typings/presentation/presentationTypes";
import type { AppDispatch, RootState } from "../../store/presentation/presentationSlice";
import { createPresentation, editPresentation } from "../../store/presentation/presentationThunks";
import { stepFieldsMap } from "../../modules/presentations/schema/PresentationFormSchema";

const STEPS_LABELS = ["Datos del producto", "Datos de la presentación", "Stock y operación"];
const buildStepsConfig = () => STEPS_LABELS.map((label) => ({ title: label, content: null }));

/*══════════════════════════════════════════════╗
║ 🪝 usePresentationCreate                       ║
╚══════════════════════════════════════════════*/

export function usePresentationCreate(): UsePresentationFormReturn {
    const { product_id: productId } = useParams<{ product_id: string }>();
    const { productData, isLoading: loadingProduct, error: productError } = useProductData(productId);
    const dispatch = useDispatch<AppDispatch>();
    const [stepErrors, setStepErrors]       = useState<string[]>([]);

    const isSubmitting = useSelector((state: RootState) => state.presentation.isLoading);
    const submitError = useSelector((state: RootState) => state.presentation.errorMessage);

    const [createdVariant, setCreatedVariant] = useState<CreatedVariantInterface | null>(null);
    const { stepState, goToNext, goToPrev, goToStep, totalSteps } = useFormSteps(buildStepsConfig());

    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<PresentationFormValues>>,
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

    const handleSubmit = async (values: PresentationFormValues) => {
        console.log(values)
        if (!productData) return;

        const result = await dispatch(createPresentation({
            name: productData.name,
            description: productData.description,
            brand: productData.brand,
            image_url: values.image_url || productData.image_url,
            product_id: productId ?? "",
            sku: values.sku,
            model_type: values.model_type,
            model_size: values.model_size,
            min_stock: values.min_stock,
            stock: values.stock,
            price: values.price,
            expiration_date: values.expiration_date,
        }));

        if (result) {
            setCreatedVariant({ _id: result._id, name: `${productData.name} - ${values.model_size}` });
        }
    };

    const handleCreateAnother = () => {
        setCreatedVariant(null);
        goToStep(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        productId,
        productData,
        loadingProduct,
        productError,
        createdVariant,
        isSubmitting,
        submitError,
        stepErrors,
        currentStep: stepState.currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
        handleCreateAnother,
    };
}

/*══════════════════════════════════════════════╗
║ 🪝 usePresentationEdit                         ║
╚══════════════════════════════════════════════*/

export function usePresentationEdit(): UsePresentationEditFormReturn {
    const { presentation_id: variantId } = useParams<{ presentation_id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    // ── data fetching delegado, igual que useProductEdit → useProductData ──
    const {
        presentationData: editingVariant,
        isLoading: isLoadingEntity,
        error: loadError,
    } = usePresentationData(variantId);

    const [updatedVariant, setUpdatedVariant] = useState<CreatedVariantInterface | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(loadError);
    const [stepErrors, setStepErrors] = useState<string[]>([]);

    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(buildStepsConfig());

    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<PresentationFormValues>>,
        onValidSubmit?: () => void,
    ) => {
        const errors = await validateForm();
        console.log("TODOS los errores del form:", errors);
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const hasErrors = currentStepFields.some((field) => errors[field as keyof PresentationFormValues]);

        if (hasErrors) { setStepErrors(Object.values(errors) as string[]); return; }

        setStepErrors([]);
        if (onValidSubmit) { onValidSubmit(); return; }
        goToNext();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrevStep = () => {
        setStepErrors([]);
        goToPrev();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleEdit = async (values: PresentationFormValues) => {
        console.log(values)
        if (!variantId) return;
        setIsSubmitting(true);
        setSubmitError(null);

        const result = await dispatch(editPresentation(variantId, values));
        setIsSubmitting(false);

        if (result) {
            setUpdatedVariant({ _id: variantId, name: `${values.model_type} - ${values.model_size}` });
        } else {
            setSubmitError("Error inesperado al actualizar la presentación");
        }
    };

    return {
        variantId,
        editingVariant,
        updatedVariant,
        isLoadingEntity,
        isSubmitting,
        submitError,
        stepErrors,
        currentStep: stepState.currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleEdit,
    };
}