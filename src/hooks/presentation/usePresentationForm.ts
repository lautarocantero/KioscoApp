import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { FormikErrors } from "formik";
import { useFormSteps } from "../shared/useFormSteps";
import { useProductData } from "../products/useProductData";
import type {
    PresentationFormValues,
    Presentation,
    CreatedVariantInterface,
} from "@typings/presentation/presentationTypes";
import { API_URL } from "../../config/api";
import { stepFieldsMap } from "../../modules/presentations/schema/PresentationFormSchema";

/*══════════════════════════════════════════════════════════════════════╗
║ 📌 Constantes compartidas                                            ║
╚══════════════════════════════════════════════════════════════════════╝*/

const STEPS_LABELS = ["Datos del producto", "Datos de la presentación", "Stock y operación"];
const buildStepsConfig = () => STEPS_LABELS.map((label) => ({ title: label, content: null }));

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 Hook: usePresentationCreate                                       ║
╚══════════════════════════════════════════════════════════════════════╝*/

export function usePresentationCreate() {

    const { product_id: productId } = useParams<{ product_id: string }>();
    const { productData, isLoading: loadingProduct, error: productError } = useProductData(productId);

    const [createdVariant, setCreatedVariant] = useState<CreatedVariantInterface | null>(null);
    const [isSubmitting, setIsSubmitting]     = useState(false);
    const [submitError, setSubmitError]       = useState<string | null>(null);

    const { stepState, goToNext, goToPrev, goToStep, totalSteps } = useFormSteps(buildStepsConfig());

    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<PresentationFormValues>>,
        onValidSubmit?: () => void,
    ) => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const hasErrors = currentStepFields.some(
            (field) => errors[field as keyof PresentationFormValues]
        );
        if (hasErrors) return;

        if (onValidSubmit) { onValidSubmit(); return; }

        goToNext();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrevStep = () => {
        goToPrev();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (values: PresentationFormValues) => {
        if (!productData) { setSubmitError("Datos del producto no disponibles"); return; }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const formData = new FormData();
            formData.append("name",            productData.name);
            formData.append("description",     productData.description);
            formData.append("brand",           productData.brand);
            formData.append("image_url",       values.image_url || productData.image_url);
            formData.append("product_id",      productId ?? "");
            formData.append("sku",             values.sku);
            formData.append("model_type",      values.model_type);
            formData.append("model_size",      values.model_size);
            formData.append("min_stock",       String(values.min_stock));
            formData.append("stock",           String(values.stock));
            formData.append("price",           String(values.price));
            formData.append("expiration_date", values.expiration_date);
            if (values.image_file) formData.append("image", values.image_file);

            const response = await fetch(`${API_URL}/presentation/create-presentation`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            const data: { _id: string; message: string } = await response.json();
            setCreatedVariant({ _id: data._id, name: `${productData.name} - ${values.model_size}` });

        } catch (error) {
            setSubmitError(
                error instanceof Error ? error.message : "Error inesperado al crear la presentación"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreateAnother = () => {
        setCreatedVariant(null);
        setSubmitError(null);
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
        currentStep: stepState.currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
        handleCreateAnother,
    };
}

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 Hook: usePresentationEdit                                         ║
╚══════════════════════════════════════════════════════════════════════╝*/

export function usePresentationEdit() {

    const { presentation_id: variantId } = useParams<{ presentation_id: string }>();

    const [editingVariant, setEditingVariant]   = useState<Presentation | null>(null);
    const [updatedVariant, setUpdatedVariant]   = useState<CreatedVariantInterface | null>(null);
    const [isLoadingEntity, setIsLoadingEntity] = useState(true);
    const [isSubmitting, setIsSubmitting]       = useState(false);
    const [submitError, setSubmitError]         = useState<string | null>(null);
    const [stepErrors, setStepErrors]           = useState<string[]>([]);

    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(buildStepsConfig());

    useEffect(() => {
        if (!variantId) { setIsLoadingEntity(false); return; }

        const fetchVariant = async () => {
            setIsLoadingEntity(true);
            try {
                const response = await fetch(
                    `${API_URL}/presentation/get-presentation-by-id/${variantId}`,
                    { credentials: "include" },
                );
                if (!response.ok) throw new Error(`Error ${response.status}`);

                const raw: Presentation | Presentation[] = await response.json();
                const data = Array.isArray(raw) ? raw[0] : raw;
                if (!data) throw new Error("Presentación no encontrada");
                setEditingVariant(data);

            } catch (error) {
                setSubmitError(
                    error instanceof Error ? error.message : "No se pudo cargar la presentación"
                );
            } finally {
                setIsLoadingEntity(false);
            }
        };

        fetchVariant();
    }, [variantId]);

    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<PresentationFormValues>>,
        onValidSubmit?: () => void,
    ) => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const hasErrors = currentStepFields.some(
            (field) => errors[field as keyof PresentationFormValues]
        );

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
        if (!variantId) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const body = {
                sku:             values.sku,
                model_type:      values.model_type,
                model_size:      values.model_size,
                min_stock:       Number(values.min_stock),
                stock:           Number(values.stock),
                price:           Number(values.price),
                expiration_date: values.expiration_date,
                image_url:       values.image_url ?? "",
                updated_at:      new Date().toISOString(),
            };

            const response = await fetch(
                `${API_URL}/presentation/edit-presentation/${variantId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            setUpdatedVariant({ _id: variantId, name: `${values.model_type} - ${values.model_size}` });

        } catch (error) {
            setSubmitError(
                error instanceof Error ? error.message : "Error inesperado al actualizar la presentación"
            );
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
        setEditingVariant,
        setUpdatedVariant,
        setIsSubmitting,
        setSubmitError,
        currentStep: stepState.currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleEdit,
    };
}