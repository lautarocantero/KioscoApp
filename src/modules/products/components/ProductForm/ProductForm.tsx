import { Grid, Box } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../context/FormNavigationContext";
import { PRODUCTS_STEPS_LABELS } from "../../../../config/constants";
import {
    getProductFormInitialValues,
    getProductEditInitialValues,
    productFormSchema,
    productEditFormSchema,
} from "../../schema/ProductFormSchema";
import ProductCreatedComponent from "../../pages/Products/ProductCreate/components/ProductCreated";
import ProductEditSuccessComponent from "../../pages/Products/ProductEdit/components/ProductEdited/ProductEditSuccess";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
import FormExplanationComponent from "../../../../modules/shared/components/FormGrid/FormExplanation";
import ProductFormFirstStep from "./ProductFormFirstStep";
import { useProductsForm } from "../../../../hooks/products/useProductsForm";

export interface ProductFormProps {
    mode?: "create" | "edit";
}

const STEP_COMPONENTS = [ProductFormFirstStep];

const ProductForm = ({ mode = "create" }: ProductFormProps): React.ReactNode => {
    // Ambos modos se llaman incondicionalmente (igual que en el hook)
    const createForm = useProductsForm({ mode: "create" });
    const editForm   = useProductsForm({ mode: "edit" });

    const isEdit = mode === "edit";

    const {
        isSubmitting,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        submitError,
        stepErrors,
    } = isEdit ? editForm : createForm;

    // ── Estados de éxito ──────────────────────────────────────────────────────
    if (!isEdit && createForm.createdEntity)
        return <ProductCreatedComponent createdProduct={createForm.createdEntity} />;

    if (isEdit && editForm.updatedEntity)
        return <ProductEditSuccessComponent updatedProduct={editForm.updatedEntity} />;

    // ── Config según modo ─────────────────────────────────────────────────────
    const initialValues = isEdit
        ? getProductEditInitialValues(editForm.editingEntity)
        : getProductFormInitialValues();

    const validationSchema = isEdit ? productEditFormSchema : productFormSchema;
    const onSubmit         = isEdit ? editForm.handleEdit   : createForm.handleSubmit;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize={isEdit}
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep,
                        totalSteps,
                        onNext:      handleNextStep,
                        onPrev:      handlePrevStep,
                        onSubmit:    formikSubmit,
                        isSubmitting,
                        validateForm,
                        submitError,
                        stepErrors,
                        actionTitle: isEdit ? "edit" : "create",
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        {/* Banner explicativo solo en creación */}
                        {!isEdit && (
                            <FormExplanationComponent
                                stepsLabels={PRODUCTS_STEPS_LABELS}
                                currentStep={currentStep}
                                banner={
                                    <Box
                                        component="img"
                                        src="/images/productExample/ilustration.png"
                                        alt="Producto y presentaciones"
                                        sx={{ width: 420, height: 220, objectFit: "contain", flexShrink: 0 }}
                                    />
                                }
                                banner_text="Primero creás el producto una sola vez — nombre, marca, descripción. Luego agregás sus presentaciones (2L, retornable, lata...) con el stock y precio de cada una"
                            />
                        )}

                        <ApiErrorComponent submitError={submitError} />

                        {/* En edición esperamos a que cargue el producto */}
                        {(!isEdit || !editForm.isLoadingEntity) && (
                            <ActualStepComponent
                                currentStep={currentStep}
                                stepComponents={STEP_COMPONENTS}
                            />
                        )}
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

export default ProductForm;
