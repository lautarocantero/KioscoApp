import { Grid, Box } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../context/FormNavigationContext";
import { PRODUCTS_STEPS_LABELS } from "../../../../config/constants";
import { getProductFormInitialValues, productFormSchema } from "../../schema/ProductFormSchema";
import ProductCreatedComponent from "../ProductCreated";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
import ProductsFormHeaderComponent from "./ProductsFormHeader";
import ProductsFormFirstStep from "./ProductsFormFirstStep";
import { useProductsForm } from "../../../../hooks/products/useProductsForm";

const STEP_COMPONENTS = [ProductsFormFirstStep];

const ProductsFormComponent = (): React.ReactNode => {
    const {
        createdEntity: createdProduct,
        isSubmitting,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
        submitError,
        stepErrors, 
    } = useProductsForm();

    if (createdProduct) {
        return <ProductCreatedComponent createdProduct={createdProduct} />;
    }

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
                        <ProductsFormHeaderComponent
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

                        <ApiErrorComponent submitError={submitError} />

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

export default ProductsFormComponent;