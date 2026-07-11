import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import {
    getProductFormInitialValues,
    getProductEditInitialValues,
    productFormSchema,
    productEditFormSchema,
} from "../../schema/ProductFormSchema";
import ProductFormFirstStep from "./ProductFormFirstStep";
import { useProductCreate, useProductEdit } from "../../../../hooks/products/useProductsForm";
import { useProductData } from "../../../../hooks/products/useProductData";
import ProductCreated from "../../pages/ProductCreate/components/ProductCreated";
import ProductEdited from "../../pages/ProductEdit/components/ProductEdited";
import type { ProductFormProps } from "@typings/product/productComponentTypes";
import ActualStepComponent from "../../../../modules/shared/components/FormCard/ActualStep";

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

// ── Modo DETALLE ─────────────────────────────────────────────────────────────
const ProductDetailForm = (): React.ReactNode => {
    const { productId } = useParams<{ productId: string }>();
    const {
        productData: viewingEntity,
        isLoading: isLoadingEntity,
        error: loadError,
    } = useProductData(productId);

    return (
        <Formik
            initialValues={getProductEditInitialValues(viewingEntity)}
            onSubmit={() => {}}
            enableReinitialize
        >
            {() => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep:  0,
                        totalSteps:   1,
                        onNext:       async () => {},
                        onPrev:       () => {},
                        onSubmit:     () => {},
                        isSubmitting: false,
                        validateForm: async () => ({}),
                        submitError:  loadError,
                        stepErrors:   [],
                        actionTitle:  "detail",
                    }}
                >
                    <Grid container sx={{ width: "100%" }}>
                        {!isLoadingEntity && (
                            <ActualStepComponent
                                currentStep={0}
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
const ProductForm = ({ mode = "create" }: ProductFormProps): React.ReactNode => {
    if (mode === "edit") return <ProductEditForm />;
    if (mode === "detail") return <ProductDetailForm />;
    return <ProductCreateForm />;
};


export default ProductForm;