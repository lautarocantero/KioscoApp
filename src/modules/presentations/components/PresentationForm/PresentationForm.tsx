import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import {
    getPresentationFormInitialValues,
    getPresentationEditInitialValues,
    presentationFormSchema,
    presentationEditFormSchema,
} from "../../schema/PresentationFormSchema";
import LoadingProductComponent from "../LoadingProduct";
import NoProductLoadedComponent from "../NotProductLoaded";
import ApiErrorComponent from "../../../shared/components/FormGrid/ApiError";
import ActualStepComponent from "../../../shared/components/FormGrid/ActualStep";
import BaseEntitySummaryComponent from "../BaseEntitySummary";
import { usePresentationCreate, usePresentationEdit } from "../../../../hooks/presentation/usePresentationForm";
import PresentationFormFirstStep from "./PresentationFormFirstStep";
import PresentationFormSecondStep from "./PresentationFormSecondStep";
import PresentationFormThirdStep from "./PresentationFormThirdStep";
import PresentationCreated from "../../pages/PresentationCreate/components/PresentationCreated";
import PresentationUpdated from "../../pages/PresentationEdit/components/PresentationUpdated";

const STEP_COMPONENTS = [
    PresentationFormFirstStep,
    PresentationFormSecondStep,
    PresentationFormThirdStep,
];

interface PresentationFormProps {
    mode: "create" | "edit",
}

// ── Modo CREAR ────────────────────────────────────────────────────────────────
const PresentationCreateForm = (): React.ReactNode => {
    const form = usePresentationCreate();

    if (form.loadingProduct) return <LoadingProductComponent />;
    if (!form.productData)   return <NoProductLoadedComponent productError={form.productError} />;
    if (form.createdVariant) return (
        <PresentationCreated
            createdVariant={form.createdVariant}
            onCreateAnother={form.handleCreateAnother}
        />
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
            <BaseEntitySummaryComponent
                label="Producto base"
                name={form.productData.name}
                description="• Estás creando una presentación para este producto"
            />
            <Formik
                initialValues={getPresentationFormInitialValues()}
                validationSchema={presentationFormSchema}
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
                            stepErrors:   [],
                            actionTitle:  "create",
                        }}
                    >
                        <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                            <ApiErrorComponent submitError={form.submitError} />
                            <ActualStepComponent
                                currentStep={form.currentStep}
                                stepComponents={STEP_COMPONENTS}
                            />
                        </Grid>
                    </FormNavigationContext.Provider>
                )}
            </Formik>
        </Box>
    );
};

// ── Modo EDITAR ───────────────────────────────────────────────────────────────
const PresentationEditForm = (): React.ReactNode => {
    const form = usePresentationEdit();

    if (form.isLoadingEntity) return <LoadingProductComponent />;
    if (!form.editingVariant) return <NoProductLoadedComponent productError={form.submitError} />;
    if (form.updatedVariant)  return <PresentationUpdated updatedVariant={form.updatedVariant} />;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
            <BaseEntitySummaryComponent
                label="Presentación"
                name={`${form.editingVariant.model_type} - ${form.editingVariant.model_size}`}
                description="• Estás editando esta presentación"
            />
            <Formik
                initialValues={getPresentationEditInitialValues(form.editingVariant)}
                validationSchema={presentationEditFormSchema}
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
                            <ApiErrorComponent submitError={form.submitError} />
                            <ActualStepComponent
                                currentStep={form.currentStep}
                                stepComponents={STEP_COMPONENTS}
                            />
                        </Grid>
                    </FormNavigationContext.Provider>
                )}
            </Formik>
        </Box>
    );
};

// ── Export público ────────────────────────────────────────────────────────────
const PresentationForm = ({ mode = "create" }: PresentationFormProps): React.ReactNode =>
    mode === "edit" ? <PresentationEditForm /> : <PresentationCreateForm />;

export default PresentationForm;