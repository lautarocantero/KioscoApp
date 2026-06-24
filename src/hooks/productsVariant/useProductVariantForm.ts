// hooks/productsVariant/useProductVariantForm.ts

/*══════════════════════════════════════════════════════════════════════╗
║  📖 GLOSARIO                                                         ║
║                                                                      ║
║  useProductVariantForm(options)                                      ║
║    Hook público. Recibe { mode: "create" | "edit" } y retorna        ║
║    el sub-hook correspondiente.                                      ║
║                                                                      ║
║  useProductVariantFormCreate()                                       ║
║    Maneja el flujo de CREACIÓN de una variante de producto.          ║
║    · Obtiene el producto padre via useProductData(productId)         ║
║    · Envía un FormData multipart al endpoint de creación             ║
║    · Expone handleCreateAnother para resetear el formulario          ║
║                                                                      ║
║  useProductVariantFormEdit()                                         ║
║    Maneja el flujo de EDICIÓN de una variante existente.             ║
║    · Carga la variante desde la API al montar (useEffect)            ║
║    · Envía un PUT JSON al endpoint de edición                        ║
║    · Expone stepErrors para mostrar errores por paso                 ║
║                                                                      ║
║  CONSTANTES COMPARTIDAS                                              ║
║    STEPS_LABELS  – Títulos de los 3 pasos del formulario             ║
║    buildStepsConfig() – Genera la config de pasos a partir de labels ║
╚══════════════════════════════════════════════════════════════════════╝*/

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { FormikErrors } from "formik";
import { useFormSteps } from "../../hooks/shared/useFormSteps";
import { useProductData } from "../../hooks/products/useProductData";
import { useProductsForm } from "../../hooks/products/useProductsForm";
import type {
    PresentationFormValues,
    Presentation,
    CreatedVariantInterface,
} from "@typings/presentation/presentationTypes";
import { API_URL } from "../../config/api";
import { stepFieldsMap } from "../../modules/presentations/schema/PresentationFormSchema";


/*══════════════════════════════════════════════════════════════════════╗
║ 📌 Constantes compartidas  📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌  ║
╚══════════════════════════════════════════════════════════════════════╝*/

const STEPS_LABELS = ["Datos del producto", "Datos de la presentación", "Stock y operación"];

const buildStepsConfig = () => STEPS_LABELS.map((label) => ({ title: label, content: null }));


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 Hook: useProductVariantFormCreate  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝 ║
╚══════════════════════════════════════════════════════════════════════╝*/

function useProductVariantFormCreate() {

    /*─── Parámetros de ruta ───────────────────────────────────────────*/
    const { product_id: productId } = useParams<{ product_id: string }>();

    /*─── Datos del producto padre ─────────────────────────────────────*/
    const { productData, isLoading: loadingProduct, error: productError } = useProductData(productId);

    /*─── Estado del formulario ────────────────────────────────────────*/
    const {
        createdEntity: createdVariant,
        isSubmitting,
        submitError,
        setCreatedEntity: setCreatedVariant,
        setIsSubmitting,
        setSubmitError,
    } = useProductsForm();

    /*─── Pasos del formulario ─────────────────────────────────────────*/
    const { stepState, goToNext, goToPrev, goToStep, totalSteps } = useFormSteps(buildStepsConfig());

    /*─── Navegación entre pasos ───────────────────────────────────────*/
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

        if (onValidSubmit) {
            onValidSubmit();
            return;
        }

        goToNext();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrevStep = () => {
        goToPrev();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /*─── Envío del formulario ─────────────────────────────────────────*/
    const handleSubmit = async (values: PresentationFormValues) => {
        if (!productData) {
            setSubmitError("Datos del producto no disponibles");
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const formData = new FormData();
            formData.append("name",            productData.name);
            formData.append("description",     productData.description);
            formData.append("brand",           productData.brand);
            formData.append("image_url",       values.image_url || productData.image_url);
            formData.append("gallery_urls",    JSON.stringify(productData.gallery_urls || []));
            formData.append("product_id",      productId ?? "");
            formData.append("sku",             values.sku);
            formData.append("model_type",      values.model_type);
            formData.append("model_size",      values.model_size);
            formData.append("min_stock",       String(values.min_stock));
            formData.append("stock",           String(values.stock));
            formData.append("price",           String(values.price));
            formData.append("expiration_date", values.expiration_date);
            if (values.image_file) formData.append("image", values.image_file);

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
            setCreatedVariant({ _id: data._id, name: `${productData.name} - ${values.model_size}` });

        } catch (error) {
            setSubmitError(
                error instanceof Error ? error.message : "Error inesperado al crear la presentación"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    /*─── Reseteo para crear otra variante ────────────────────────────*/
    const handleCreateAnother = () => {
        setCreatedVariant(null);
        setSubmitError(null);
        goToStep(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /*─── Return ───────────────────────────────────────────────────────*/
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
║ 🪝 Hook: useProductVariantFormEdit  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝 ║
╚══════════════════════════════════════════════════════════════════════╝*/

function useProductVariantFormEdit() {

    /*─── Parámetros de ruta ───────────────────────────────────────────*/
    const { presentation_id: variantId } = useParams<{ presentation_id: string }>();

    /*─── Estado local ─────────────────────────────────────────────────*/
    const [editingVariant, setEditingVariant]   = useState<Presentation | null>(null);
    const [updatedVariant, setUpdatedVariant]   = useState<CreatedVariantInterface | null>(null);
    const [isLoadingEntity, setIsLoadingEntity] = useState(true);
    const [isSubmitting, setIsSubmitting]       = useState(false);
    const [submitError, setSubmitError]         = useState<string | null>(null);
    const [stepErrors, setStepErrors]           = useState<string[]>([]);

    /*─── Pasos del formulario ─────────────────────────────────────────*/
    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(buildStepsConfig());

    /*─── Carga inicial de la variante ─────────────────────────────────*/
    useEffect(() => {
        if (!variantId) {
            setIsLoadingEntity(false);
            return;
        }

        const fetchVariant = async () => {
            setIsLoadingEntity(true);
            try {
                const response = await fetch(
                    `${API_URL}/product-variant/get-product-variant-by-id/${variantId}`,
                    { credentials: "include" },
                );
                if (!response.ok) throw new Error(`Error ${response.status}`);

                const raw: Presentation | Presentation[] =
                    await response.json();

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


    /*══════════════════════════════════════════════════════════════════════╗
    ║ 🪝 Navegacion entre pasos  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝 ║
    ╚══════════════════════════════════════════════════════════════════════╝*/
    const handleNextStep = async (
        validateForm: () => Promise<FormikErrors<PresentationFormValues>>,
        onValidSubmit?: () => void,
    ) => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const hasErrors = currentStepFields.some(
            (field) => errors[field as keyof PresentationFormValues]
        );

        if (hasErrors) {
            setStepErrors(Object.values(errors) as string[]);
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

    /*─── Envío del formulario ─────────────────────────────────────────*/
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
                `${API_URL}/product-variant/edit-product-variant/${variantId}`,
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

    /*─── Return ───────────────────────────────────────────────────────*/
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

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 Hook público: useProductVariantForm  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝  ║
╚══════════════════════════════════════════════════════════════════════╝*/

export function useProductVariantForm(options?: { mode?: "create" }): ReturnType<typeof useProductVariantFormCreate>;
export function useProductVariantForm(options: { mode: "edit" }): ReturnType<typeof useProductVariantFormEdit>;
export function useProductVariantForm(options: { mode?: "create" | "edit" } = {}) {
    const { mode = "create" } = options;

    // ⚠️  Los hooks se invocan por separado en cada componente consumidor.
    //     Este hook público es solo un selector de tipos; los hooks internos
    //     deben usarse directamente en los componentes para cumplir con las
    //     Rules of Hooks y evitar ejecutar ambos en simultáneo.
    if (mode === "edit") return useProductVariantFormEdit();
    return useProductVariantFormCreate();
}