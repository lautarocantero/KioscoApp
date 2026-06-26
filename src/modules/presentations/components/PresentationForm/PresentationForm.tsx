import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../../products/context/FormNavigationContext";
import { getPresentationFormInitialValues, PresentationFormSchema } from "./PresentationFormSchema";
import LoadingProductComponent from "../LoadingProduct";
import NoProductLoadedComponent from "../NotProductLoaded";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
import BaseEntitySummaryComponent from "../BaseEntitySummary";
import { usePresentationForm } from "../../../../hooks/presentation/usePresentationForm";
import PresentationFormFirstStep from "./PresentationFormFirstStep";
import PresentationFormSecondStep from "./PresentationFormSecondStep/PresentationFormSecondStep";
import PresentationFormThirdStep from "./PresentationFormThirdStep/PresentationFormThirdStep";
import PresentationCreated from "../../pages/PresentationCreate/components/PresentationCreated/PresentationCreatedComponent"

const STEP_COMPONENTS = [
    PresentationFormFirstStep,
    PresentationFormSecondStep,
    PresentationFormThirdStep,
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
    } = usePresentationForm();

    if (loadingProduct)  return <LoadingProductComponent />;
    if (!productData)    return <NoProductLoadedComponent productError={productError} />;
    if (createdVariant)  return (
        <PresentationCreated
            createdVariant={createdVariant}
            onCreateAnother={handleCreateAnother}
        />
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: `100%` }}>
            <BaseEntitySummaryComponent
                label="Producto base"
                name={productData.name}
                description="• Estás creando una presentación para este producto"
            />

            <Formik
                initialValues={getPresentationFormInitialValues()}
                validationSchema={PresentationFormSchema}
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
                        <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
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