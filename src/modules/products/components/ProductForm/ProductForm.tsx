import { Grid, Box } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_STEPS_LABELS } from "../../../../config/constants";
import {
    getProductFormInitialValues,
    getProductEditInitialValues,
    productFormSchema,
    productEditFormSchema,
} from "../../schema/ProductFormSchema";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
import FormExplanationComponent from "../../../../modules/shared/components/FormGrid/FormExplanation";
import ProductFormFirstStep from "./ProductFormFirstStep";
import { useProductCreate, useProductEdit } from "../../../../hooks/products/useProductsForm";
import ProductCreated from "../../pages/ProductCreate/components/ProductCreated";
import ProductEdited from "../../pages/ProductEdit/components/ProductEdited";
import type { ProductFormProps } from "@typings/product/productComponentTypes";

const STEP_COMPONENTS = [ProductFormFirstStep];

// ── Modo CREAR ────────────────────────────────────────────────────────────────
const ProductCreateForm = (): React.ReactNode => {
    const form = useProductCreate();

    if (form.createdEntity)
        return <ProductCreated createdProduct={form.createdEntity} />;

    return (
        <Formik
            initialValues={getProductFormInitialValues()}
            validationSchema={productFormSchema}
            onSubmit={form.handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep:  form.currentStep,
                        totalSteps:   form.totalSteps,
                        onNext:       form.handleNextStep,
                        onPrev:       form.handlePrevStep,
                        onSubmit:     formikSubmit,
                        isSubmitting: form.isSubmitting,
                        validateForm,
                        submitError:  form.submitError,
                        stepErrors:   form.stepErrors,
                        actionTitle:  "create",
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <FormExplanationComponent
                            stepsLabels={PRODUCTS_STEPS_LABELS}
                            currentStep={form.currentStep}
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
                        <ApiErrorComponent submitError={form.submitError} />
                        <ActualStepComponent
                            currentStep={form.currentStep}
                            stepComponents={STEP_COMPONENTS}
                        />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Modo EDITAR ───────────────────────────────────────────────────────────────
const ProductEditForm = (): React.ReactNode => {
    const form = useProductEdit();

    if (form.updatedEntity)
        return <ProductEdited updatedProduct={form.updatedEntity} />;

    return (
        <Formik
            initialValues={getProductEditInitialValues(form.editingEntity)}
            validationSchema={productEditFormSchema}
            onSubmit={form.handleEdit}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep:  form.currentStep,
                        totalSteps:   form.totalSteps,
                        onNext:       form.handleNextStep,
                        onPrev:       form.handlePrevStep,
                        onSubmit:     formikSubmit,
                        isSubmitting: form.isSubmitting,
                        validateForm,
                        submitError:  form.submitError,
                        stepErrors:   form.stepErrors,
                        actionTitle:  "edit",
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <ApiErrorComponent submitError={form.submitError} />
                        {!form.isLoadingEntity && (
                            <ActualStepComponent
                                currentStep={form.currentStep}
                                stepComponents={STEP_COMPONENTS}
                            />
                        )}
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Export público ────────────────────────────────────────────────────────────
const ProductForm = ({ mode = "create" }: ProductFormProps): React.ReactNode =>
    mode === "edit" ? <ProductEditForm /> : <ProductCreateForm />;

export default ProductForm;