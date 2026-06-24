import { Grid, Box } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../context/FormNavigationContext";
import { getProductEditInitialValues, productEditFormSchema } from "../../schema/ProductFormSchema";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
// import FormExplanationComponent from "../ProductsForm/ProductsFormHeader";
import ProductsEditFirstStep from "./ProductsEditFirstStep";
import ProductEditSuccessComponent from "../ProductEdited/ProductEditSuccess";
import { useProductsForm } from "../../../../hooks/products/useProductsForm";

const EDIT_STEPS_LABELS = ["Editar producto"];
const EDIT_STEP_COMPONENTS = [ProductsEditFirstStep];

const ProductsEditFormComponent = (): React.ReactNode => {
    const {
        editingEntity: product,
        updatedEntity,
        isSubmitting,
        isLoadingEntity,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleEdit,
        submitError,
        stepErrors,
    } = useProductsForm({ mode: "edit" });

    if (updatedEntity) {
        return <ProductEditSuccessComponent updatedProduct={updatedEntity} />;
    }

    return (
        <Formik
            initialValues={getProductEditInitialValues(product)}
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
                        onNext: handleNextStep,
                        onPrev: handlePrevStep,
                        onSubmit: formikSubmit,
                        isSubmitting,
                        validateForm,
                        submitError,
                        stepErrors,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit}>
                        {/* <FormExplanationComponent
                            stepsLabels={EDIT_STEPS_LABELS}
                            currentStep={currentStep}
                            banner={
                                <Box
                                    component="img"
                                    src="/images/productExample/ilustration.png"
                                    alt="Editar producto"
                                    sx={{ width: 420, height: 220, objectFit: "contain", flexShrink: 0 }}
                                />
                            }
                            banner_text="Modificá los datos del producto. Los cambios actualizarán la fecha de última modificación automáticamente."
                        /> */}

                        <ApiErrorComponent submitError={submitError} />

                        {!isLoadingEntity && (
                            <ActualStepComponent
                                currentStep={currentStep}
                                stepComponents={EDIT_STEP_COMPONENTS}
                            />
                        )}
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

export default ProductsEditFormComponent;