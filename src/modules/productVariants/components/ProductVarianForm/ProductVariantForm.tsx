import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../../products/context/FormNavigationContext";
import { getProductVariantFormInitialValues, productVariantFormSchema } from "./ProductVariantFormSchema";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import LoadingProductComponent from "../LoadingProduct";
import NoProductLoadedComponent from "../NotProductLoaded";
import VariantCreatedComponent from "../ProductVariantCreated/VariantCreatedComponent";
import ApiErrorComponent from "../../../products/components/ProductsForm/ApiError";
import ActualStepComponent from "../../../products/components/ProductsForm/ActualStep";
import ProductsFormHeaderComponent from "../../../products/components/ProductsForm/ProductsFormHeader";
import BaseEntitySummaryComponent from "../BaseEntitySummary";
import CancelButtonComponent from "../../../../modules/shared/components/Buttons/CancelButton";
import { useProductVariantForm } from "../../../../hooks/productsVariant/useProductVariantForm";
import ProductVariantFormFirstStep from "./ProductVariantFormFirstStep";
import ProductVariantFormSecondStep from "./ProductVariantFormSecondStep/ProductVariantFormSecondStep";
import ProductVariantFormThirdStep from "./ProductVariantFormThirdStep/ProductVariantFormThirdStep";

const STEP_COMPONENTS = [
    ProductVariantFormFirstStep,
    ProductVariantFormSecondStep,
    ProductVariantFormThirdStep,
];

const ProductVariantFormComponent = (): React.ReactNode => {
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
                                stepsLabels={PRODUCTS_VARIANT_STEPS_LABELS}
                                currentStep={currentStep}
                            />
                            <ApiErrorComponent submitError={submitError} />
                            <ActualStepComponent
                                currentStep={currentStep}
                                stepComponents={STEP_COMPONENTS}
                            />
                            <CancelButtonComponent
                                navigateTo="/products"
                                label="← Cancelar y volver a productos"
                            />
                        </Grid>
                    </FormNavigationContext.Provider>
                )}
            </Formik>
        </Box>
    );
};

export default ProductVariantFormComponent;