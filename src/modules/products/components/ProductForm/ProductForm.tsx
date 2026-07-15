import { Box, Grid } from "@mui/material";
import type { ProductFormProps } from "@typings/product/productComponentTypes";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { useProductData } from "../../../../hooks/products/useProductData";
import { useProductCreate, useProductEdit } from "../../../../hooks/products/useProductsForm";
import ActualStepComponent from "../../../../modules/shared/components/FormCard/ActualStep";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import ProductCreated from "../../pages/ProductCreate/components/ProductCreated";
import ProductEdited from "../../pages/ProductEdit/components/ProductEdited";
import {
    getProductEditInitialValues,
    getProductFormInitialValues,
    productEditFormSchema,
    productFormSchema,
} from "../../schema/ProductFormSchema";
import ProductFormFirstStep from "./ProductFormFirstStep";
import LoadingSpinnerComponent from "modules/shared/components/LoadingSpinner";
import NotEntityLoaded from "modules/shared/components/NotEntityLoaded";

const STEP_COMPONENTS = [ProductFormFirstStep];

// ── Modo CREAR ────────────────────────────────────────────────────────────────
const ProductCreateForm = (): React.ReactNode => {
    const {
        createdProduct, 
        handleSubmit, 
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        isSubmitting,
        submitError,
        stepErrors,
        handleCreateAnother,
    } = useProductCreate();

    if (createdProduct) return (
        <ProductCreated 
            createdProduct={createdProduct} 
            onCreateAnother={handleCreateAnother}
        />
    );
        

    return (
        <Formik
            initialValues={getProductFormInitialValues()}
            validationSchema={productFormSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep:  currentStep,
                        totalSteps:   totalSteps,
                        onNext:       handleNextStep,
                        onPrev:       handlePrevStep,
                        onSubmit:     formikSubmit,
                        isSubmitting: isSubmitting,
                        validateForm,
                        submitError:  submitError,
                        stepErrors:   stepErrors,
                        actionTitle:  FormModeComplexEnum.Create,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <ActualStepComponent
                            currentStep={currentStep}
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
    const {
        updatedProduct,
        editingProduct,
        handleEdit,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        isSubmitting,
        submitError,
        stepErrors,
        isLoadingProduct,
    } = useProductEdit();

    if (isLoadingProduct) return <LoadingSpinnerComponent />;
    if (!editingProduct) return <NotEntityLoaded error={submitError} fallbackText="No se pudo cargar el producto" />;
    if (updatedProduct) return <ProductEdited updatedProduct={updatedProduct} />;

    return (
        <Formik
            initialValues={getProductEditInitialValues(editingProduct)}
            validationSchema={productEditFormSchema}
            onSubmit={handleEdit}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep,
                        totalSteps,
                        onNext:       handleNextStep,
                        onPrev:       handlePrevStep,
                        onSubmit:     formikSubmit,
                        isSubmitting,
                        validateForm,
                        submitError,
                        stepErrors,
                        actionTitle:  FormModeComplexEnum.Edit,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <ActualStepComponent
                            currentStep={currentStep}
                            stepComponents={STEP_COMPONENTS}
                        />
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
                        actionTitle:  FormModeComplexEnum.Detail,
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
const ProductForm = ({ mode = FormModeComplexEnum.Create }: ProductFormProps): React.ReactNode => {
    if (mode === FormModeComplexEnum.Edit) return <ProductEditForm />;
    if (mode === FormModeComplexEnum.Detail) return <ProductDetailForm />;
    return <ProductCreateForm />;
};


export default ProductForm;