import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import {
    getPresentationFormInitialValues,
    getPresentationEditInitialValues,
    presentationFormSchema,
    presentationEditFormSchema,
} from "../../schema/PresentationFormSchema";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner";
import NotEntityLoaded from "../../../shared/components/NotEntityLoaded";
import ActualStepComponent from "../../../shared/components/FormCard/ActualStep";
import PresentationFormFirstStep from "./PresentationFormFirstStep";
import PresentationFormSecondStep from "./PresentationFormSecondStep";
import PresentationFormThirdStep from "./PresentationFormThirdStep";
import PresentationCreated from "../../pages/PresentationCreate/components/PresentationCreated";
import PresentationUpdated from "../../pages/PresentationEdit/components/PresentationUpdated";
import { usePresentationCreate, usePresentationEdit } from "../../../../hooks/presentations/usePresentationForm";
import type { PresentationFormProps } from "@typings/presentation/presentationComponentTypes";
import { FormModeComplexEnum, FormModeSimpleEnum } from "@typings/shared/sharedEnums";

const STEP_COMPONENTS = [
    PresentationFormFirstStep,
    PresentationFormSecondStep,
    PresentationFormThirdStep,
];


// ── Modo CREAR ────────────────────────────────────────────────────────────────
const PresentationCreateForm = (): React.ReactNode => {
    const form = usePresentationCreate();

    if (form.loadingProduct) return <LoadingSpinnerComponent />;
    if (!form.productData)   return <NotEntityLoaded error={form.productError} />;
    if (form.createdVariant) return (
        <PresentationCreated
            createdVariant={form.createdVariant}
            onCreateAnother={form.handleCreateAnother}
        />
    );

    return (
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
                            stepErrors:   form.stepErrors,
                            actionTitle:  FormModeComplexEnum.Create,
                        }}
                    >
                        <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                            <ActualStepComponent
                                currentStep={form.currentStep}
                                stepComponents={STEP_COMPONENTS}
                            />
                        </Grid>
                    </FormNavigationContext.Provider>
                )}
            </Formik>
    );
};

// ── Modo EDITAR ───────────────────────────────────────────────────────────────
const PresentationEditForm = (): React.ReactNode => {
    const form = usePresentationEdit();

    if (form.isLoadingEntity) return <LoadingSpinnerComponent />;
    if (!form.editingVariant) return <NotEntityLoaded error={form.submitError} fallbackText="No se pudo cargar la presentación" />;
    if (form.updatedVariant)  return <PresentationUpdated updatedVariant={form.updatedVariant} />;

    console.log(form.stepErrors)
    console.log(form.stepErrors)

    return (
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
                        actionTitle:  FormModeComplexEnum.Edit,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <ActualStepComponent
                            currentStep={form.currentStep}
                            stepComponents={STEP_COMPONENTS}
                        />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Export público ────────────────────────────────────────────────────────────
const PresentationForm = ({ mode = FormModeSimpleEnum.Create }: PresentationFormProps): React.ReactNode =>
    mode === "edit" ? <PresentationEditForm /> : <PresentationCreateForm />;

export default PresentationForm;