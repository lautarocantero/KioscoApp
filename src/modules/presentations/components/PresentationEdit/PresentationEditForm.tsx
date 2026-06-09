// modules/productVariants/components/ProductVariantEdit/ProductVariantEditForm.tsx

import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../../products/context/FormNavigationContext";
import {
    getPresentationEditInitialValues,
    presentationEditFormSchema,
    stepFieldsMap,
} from "../../schema/PresentationFormSchema";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import LoadingProductComponent from "../LoadingProduct";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
import ProductsFormHeaderComponent from "../../../products/components/ProductsForm/ProductsFormHeader";
import BaseEntitySummaryComponent from "../BaseEntitySummary";
import { useProductVariantForm } from "../../../../hooks/productsVariant/useProductVariantForm";
import ProductVariantFormFirstStep from "../PresentationForm/PresentationFormFirstStep";
import ProductVariantFormSecondStep from "../PresentationForm/PresentationFormSecondStep";
import ProductVariantFormThirdStep from "../PresentationForm/PresentationFormThirdStep";
import VariantUpdatedComponent from "./PresentationUpdatedComponent";

const STEP_COMPONENTS = [
    ProductVariantFormFirstStep,
    ProductVariantFormSecondStep,
    ProductVariantFormThirdStep,
];

const ProductVariantEditFormComponent = (): React.ReactNode => {
    const {
        editingVariant,
        updatedVariant,
        isLoadingEntity,
        isSubmitting,
        submitError,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleEdit,
    } = useProductVariantForm({ mode: "edit" });

    if (isLoadingEntity) return <LoadingProductComponent />;
    if (!editingVariant) return null;
    if (updatedVariant)  return <VariantUpdatedComponent updatedVariant={updatedVariant} />;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <BaseEntitySummaryComponent
                label="Presentación"
                name={`${editingVariant.model_type} — ${editingVariant.model_size}`}
                description="• Estás editando los datos de esta presentación"
            />

            <Formik
                initialValues={getPresentationEditInitialValues(editingVariant)}
                validationSchema={presentationEditFormSchema}
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

export default ProductVariantEditFormComponent;