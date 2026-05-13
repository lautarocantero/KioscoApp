import { Grid, Box } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../context/FormNavigationContext";
import { getProductEditInitialValues, productEditFormSchema } from "../../schema/ProductsEditFormSchema";
import ProductsFormHeaderComponent from "../ProductsForm/ProductsFormHeader";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
import { useProductsForm } from "../../../../hooks/products/useProductsForm";
import ProductDetailFirstStep from "./ProductDetailFirstStep";

const VIEW_STEPS_LABELS = ["Detalle del producto"];
const VIEW_STEP_COMPONENTS = [ProductDetailFirstStep];

const ProductDetailFormComponent = (): React.ReactNode => {
    const {
        editingEntity: product,
        isLoadingEntity,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleEdit,
        submitError,
        stepErrors,
    } = useProductsForm({ mode: "edit" }); // reutiliza el mismo hook para cargar el producto

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
                        isSubmitting: false,
                        validateForm,
                        submitError,
                        stepErrors,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit}>
                        <ProductsFormHeaderComponent
                            stepsLabels={VIEW_STEPS_LABELS}
                            currentStep={currentStep}
                            banner={
                                <Box
                                    component="img"
                                    src="/images/productExample/ilustration.png"
                                    alt="Detalle del producto"
                                    sx={{ width: 420, height: 220, objectFit: "contain", flexShrink: 0 }}
                                />
                            }
                            banner_text="Información del producto. Para modificar los datos, usá la opción de editar."
                        />

                        {!isLoadingEntity && (
                            <ActualStepComponent
                                currentStep={currentStep}
                                stepComponents={VIEW_STEP_COMPONENTS}
                            />
                        )}
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

export default ProductDetailFormComponent;