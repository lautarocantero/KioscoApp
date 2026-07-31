// hooks/presentations/usePresentationForm.ts
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../config/constants";
import { WEIGHT_SALE_TYPE } from "@typings/presentation/presentationEnum";


//─── 🔎 Deriva el stock (en gramos) a partir de model_size ("1200g" -> 1200) 🔎 ───
const getStockValue = (values: Pick<PresentationFormValues, "sale_type" | "model_size" | "stock">): number =>
    values.sale_type === WEIGHT_SALE_TYPE
        ? Number(values.model_size.replace(/g$/, ""))
        : values.stock;

const getMinStockValue = (values: Pick<PresentationFormValues, "sale_type" | "min_stock">): number =>
    values.sale_type === WEIGHT_SALE_TYPE
        ? Number(values.min_stock.replace(/g$/, ""))
        : Number(values.min_stock);

const buildStepsConfig = () => PRODUCTS_VARIANT_STEPS_LABELS.map((label) => ({ title: label, content: null }));

/*══════════════════════════════════════════════╗
║ 🪝 usePresentationCreate                       ║
╚══════════════════════════════════════════════*/

export function usePresentationCreate(): UsePresentationFormReturn {
    const navigate = useNavigate();
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
        const stockValue = getStockValue(values);
        const minStockValue = getMinStockValue(values); 

        try {
            const now = new Date().toISOString();
            const body = {
                name:            values.name,
                description:     values.description,
                brand:           productData.brand,
                image_url:       values.image_url || productData.image_url,
                product_id:      productId ?? "",
                sku:             values.sku,
                barcode:             values.barcode,
                model_type:      values.model_type,
                model_size:      values.model_size,
                sale_type:       values.sale_type,
                min_stock:       minStockValue,
                stock:           stockValue,
                price:           values.price,
                expiration_date: values.expiration_date,
                category:        values.category,
                created_at:      now,
                updated_at:      now,
            };

            const created = await dispatch(createPresentation(body));

            if (!created) {
                throw new Error("Error al crear la presentación");
            }

            setCreatedPresentation({ _id: created._id, name: values.name});
        } catch (error) {
            const message = await parseError(error, "Error inesperado al crear la presentación");
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleCreateAnotherPresentation = () => {
        setCreatedPresentation(null);
        goToStep(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSeeDetail= () => {
        if(!createdPresentation) return null;
        const { _id } = createdPresentation;
        setCreatedPresentation(null);
        navigate(`/products/${productId}/presentation/${_id}`)

    };

            
    const handleBackToPresentations= () => {
        if(!createdPresentation) return null;
        setCreatedPresentation(null);
        navigate(`/products/${productId}/presentations`);
    };


    const handleCreateAnotherProduct = () => {
        setCreatedPresentation(null);
        navigate(`/product-create`);
    };


    const handleBackToProducts= () => {
        setCreatedPresentation(null);
        navigate(`/products`);
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
        handleCreateAnotherPresentation,
        handleSeeDetail,
        handleBackToPresentations,
        handleCreateAnotherProduct,
        handleBackToProducts,
    };
}

/*══════════════════════════════════════════════╗
║ 🪝 usePresentationEdit                         ║
╚══════════════════════════════════════════════*/

export function usePresentationEdit(): UsePresentationEditFormReturn {
    const navigate = useNavigate();
    const { presentation_id: variantId } = useParams<{ presentation_id: string }>();
    const { product_id: productId } = useParams<{ product_id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const {
        presentationData: editingVariant,
        isLoading: isLoadingEntity,
        error: loadError,
    } = usePresentationData(variantId);

    const [updatedPresentation, setUpdatedVariant] = useState<UpdatedPresentationInterface | null>(null);
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

        const stockValue = getStockValue(values);
        const minStockValue = getMinStockValue(values);

        try {
            const body = {
                _id: variantId,
                ...values,
                stock: stockValue,
                min_stock: minStockValue,
            };

            const updated = await dispatch(editPresentation(body));

            if (!updated) {
                throw new Error("Error al actualizar la presentación");
            }

            setUpdatedVariant({ _id: variantId, name: values.name });
        } catch (error) {
            const message = await parseError(error, "Error inesperado al actualizar la presentación");
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSeeDetail = () => {
        if(!updatedPresentation) return null;
        setUpdatedVariant(null);
        navigate(`/products/${productId}/presentation/${variantId}`);
    };

    const handleBackToPresentations = () => {
        setUpdatedVariant(null);
        navigate(`/products/${productId}/presentations`)
    }  

    const handleBackToProducts = () => {
        setUpdatedVariant(null);
        navigate("/products")
    }  

    return {
        variantId,
        editingVariant,
        updatedPresentation,
        isLoadingEntity,
        isSubmitting,
        submitError,
        stepErrors,
        currentStep: stepState.currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleEdit,
        handleSeeDetail,
        handleBackToPresentations,
        handleBackToProducts,
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