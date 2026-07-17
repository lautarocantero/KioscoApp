import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { FormikErrors } from "formik";
import type {
    CreatedPresentationInterface,
    UpdatedPresentationInterface,
    PresentationFormValues,
    PresentationEditFormValues,
    UsePresentationFormReturn,
    UsePresentationEditFormReturn,
} from "@typings/presentation/presentationTypes";
import type { AppDispatch } from "../../store/presentation/presentationSlice";
import { createPresentation, editPresentation } from "../../store/presentation/presentationThunks";
import { useProductData } from "../products/useProductData";
import { usePresentationData } from "./usePresentationData";
import { useFormSteps } from "../shared/useFormSteps";
import { useErrorParser } from "../shared/useErrorParser";
import { stepFieldsMap } from "../../modules/presentations/schema/PresentationFormSchema";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const STEPS_LABELS = ["Datos del producto", "Datos de la presentación", "Stock y operación"];
const buildStepsConfig = () => STEPS_LABELS.map((label) => ({ title: label, content: null }));

/*══════════════════════════════════════════════╗
║ 🪝 usePresentationCreate                       ║
╚══════════════════════════════════════════════*/

export function usePresentationCreate(): UsePresentationFormReturn {
    const { product_id: productId } = useParams<{ product_id: string }>();
    const { productData, isLoading: loadingProduct, error: productError } = useProductData(productId);
    const dispatch = useDispatch<AppDispatch>();

    const [createdPresentation, setCreatedPresentation] = useState<CreatedPresentationInterface | null>(null);
    const [isSubmitting, setIsSubmitting]     = useState(false);
    const [submitError, setSubmitError]       = useState<string | null>(null);
    const [stepErrors, setStepErrors]         = useState<string[]>([]);

    const { parseError } = useErrorParser();

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
        if (!productData) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const now = new Date().toISOString();
            const body = {
                name:            productData.name,
                description:     productData.description,
                brand:           productData.brand,
                image_url:       values.image_url || productData.image_url,
                product_id:      productId ?? "",
                sku:             values.sku,
                model_type:      values.model_type,
                model_size:      values.model_size,
                min_stock:       values.min_stock,
                stock:           values.stock,
                price:           values.price,
                expiration_date: values.expiration_date,
                created_at:      now,
                updated_at:      now,
            };

            const created = await dispatch(createPresentation(body));

            if (!created) {
                throw new Error("Error al crear la presentación");
            }

            setCreatedPresentation({ _id: created._id, name: `${productData.name} - ${values.model_size}` });
        } catch (error) {
            const message = await parseError(error, "Error inesperado al crear la presentación");
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreateAnother = () => {
        setCreatedPresentation(null);
        goToStep(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        productId,
        productData,
        loadingProduct,
        productError,
        createdPresentation,
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

    const {
        presentationData: editingVariant,
        isLoading: isLoadingEntity,
        error: loadError,
    } = usePresentationData(variantId);

    const [updatedVariant, setUpdatedVariant] = useState<UpdatedPresentationInterface | null>(null);
    const [isSubmitting, setIsSubmitting]     = useState(false);
    const [submitError, setSubmitError]       = useState<string | null>(loadError);
    const [stepErrors, setStepErrors]         = useState<string[]>([]);

    const { parseError } = useErrorParser();

    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(buildStepsConfig());

    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<PresentationEditFormValues>>,
        onValidSubmit?: () => void,
    ) => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const currentErrors = currentStepFields
            .filter((field) => errors[field as keyof PresentationEditFormValues])
            .map((field) => errors[field as keyof PresentationEditFormValues] as string);

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

    const handleEdit = async (values: PresentationEditFormValues) => {
        if (!variantId) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const body = {
                _id: variantId,
                ...values,
            };

            const updated = await dispatch(editPresentation(body));

            if (!updated) {
                throw new Error("Error al actualizar la presentación");
            }

            setUpdatedVariant({ _id: variantId, name: `${values.model_type} - ${values.model_size}` });
        } catch (error) {
            const message = await parseError(error, "Error inesperado al actualizar la presentación");
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
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

/*══════════════════════════════════════════════╗
║ 🪝 usePresentationFormHeader                         ║
╚══════════════════════════════════════════════*/

export const usePresentationFormHeader = (actionTitle: FormModeComplexEnum | undefined) => {
    const { product_id } = useParams<{ product_id: string }>();
    const { productData } = useProductData(product_id);

    const isCreate = actionTitle === FormModeComplexEnum.Create;
    const truncatedName = productData?.name
    ? productData.name.length > 20
        ? `${productData.name.slice(0, 20)}…`
        : productData.name
    : null;

    const headerTitle = isCreate
        ? `Crear presentación${truncatedName ? ` de ${truncatedName}` : ""}`
        : "Editar presentación";

    return { isCreate, headerTitle, productId: product_id };
};