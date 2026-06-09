import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../../products/context/FormNavigationContext";
import { getProductVariantFormInitialValues, productVariantFormSchema } from "./PresentationFormSchema";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import LoadingProductComponent from "../LoadingProduct";
import NoProductLoadedComponent from "../NotProductLoaded";
import VariantCreatedComponent from "../PresentationCreated/PresentationCreatedComponent";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
import ProductsFormHeaderComponent from "../../../products/components/ProductsForm/ProductsFormHeader";
import BaseEntitySummaryComponent from "../BaseEntitySummary";
import { useProductVariantForm } from "../../../../hooks/productsVariant/useProductVariantForm";
import ProductVariantFormFirstStep from "./PresentationFormFirstStep";
import ProductVariantFormSecondStep from "./PresentationFormSecondStep/PresentationFormSecondStep";
import ProductVariantFormThirdStep from "./PresentationFormThirdStep/PresentationFormThirdStep";

const STEP_COMPONENTS = [
    ProductVariantFormFirstStep,
    ProductVariantFormSecondStep,
    ProductVariantFormThirdStep,
];

const PresentationFormComponent = (): React.ReactNode => {
    const {
        productData,
        loadingProduct,
        productError,
        createdVariant,
        isSubmitting,
        submitError,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
        handleCreateAnother,
    } = useProductVariantForm();

    if (loadingProduct)  return <LoadingProductComponent />;
    if (!productData)    return <NoProductLoadedComponent productError={productError} />;
    if (createdVariant)  return (
        <VariantCreatedComponent
            createdVariant={createdVariant}
            onCreateAnother={handleCreateAnother}
        />
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <BaseEntitySummaryComponent
                label="Producto base"
                name={productData.name}
                description="• Estás creando una presentación para este producto"
            />

            <Formik
                initialValues={getProductVariantFormInitialValues()}
                validationSchema={productVariantFormSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
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
                        }}
                    >
                        <Grid container component="form" onSubmit={formikSubmit}>
                            <ProductsFormHeaderComponent
                                showProgressIndicator
                                stepsLabels={PRODUCTS_VARIANT_STEPS_LABELS}
                                currentStep={currentStep}
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
        </Box>
    );
};

export default PresentationFormComponent;