import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../../products/context/FormNavigationContext";
import { getProductVariantFormInitialValues, productVariantFormSchema } from "./PresentationFormSchema";
import LoadingProductComponent from "../LoadingProduct";
import NoProductLoadedComponent from "../NotProductLoaded";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
import BaseEntitySummaryComponent from "../BaseEntitySummary";
import { useProductVariantForm } from "../../../../hooks/productsVariant/useProductVariantForm";
import ProductVariantFormFirstStep from "./PresentationFormFirstStep";
import ProductVariantFormSecondStep from "./PresentationFormSecondStep/PresentationFormSecondStep";
import ProductVariantFormThirdStep from "./PresentationFormThirdStep/PresentationFormThirdStep";
import PresentationCreated from "../../pages/PresentationCreate/components/PresentationCreated/PresentationCreatedComponent"

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
        <PresentationCreated
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
                            submitError,
                            stepErrors: [],
                            actionTitle: "create",
                        }}
                    >
                        <Grid container component="form" onSubmit={formikSubmit}>
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