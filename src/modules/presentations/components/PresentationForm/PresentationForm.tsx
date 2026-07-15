import { Grid } from "@mui/material";
import type { PresentationFormProps } from "@typings/presentation/presentationComponentTypes";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePresentationData } from "../../../../hooks/presentations/usePresentationData";
import { usePresentationCreate, usePresentationEdit } from "../../../../hooks/presentations/usePresentationForm";
import ActualStepComponent from "../../../shared/components/FormCard/ActualStep";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner";
import NotEntityLoaded from "../../../shared/components/NotEntityLoaded";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import PresentationCreated from "../../pages/PresentationCreate/components/PresentationCreated";
import PresentationUpdated from "../../pages/PresentationEdit/components/PresentationUpdated";
import {
    getPresentationEditInitialValues,
    getPresentationFormInitialValues,
    presentationEditFormSchema,
    presentationFormSchema,
} from "../../schema/PresentationFormSchema";
import PresentationFormFirstStep from "./PresentationFormFirstStep";
import PresentationFormSecondStep from "./PresentationFormSecondStep";
import PresentationFormThirdStep from "./PresentationFormThirdStep";

const STEP_COMPONENTS = [
    PresentationFormFirstStep,
    PresentationFormSecondStep,
    PresentationFormThirdStep,
];


// ── Modo CREAR ────────────────────────────────────────────────────────────────
const PresentationCreateForm = (): React.ReactNode => {
    const form = usePresentationCreate();
    const {
        loadingProduct, 
        productData, 
        productError, 
        createdVariant, 
        handleCreateAnother, 
        handleSubmit, 
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        isSubmitting,
        submitError,
        stepErrors,
    } = form;

    if (loadingProduct) return <LoadingSpinnerComponent />;
    if (!productData)   return <NotEntityLoaded error={productError} />;
    if (createdVariant) return (
        <PresentationCreated
            createdVariant={createdVariant}
            onCreateAnother={handleCreateAnother}
        />
    );

    return (
            <Formik
                initialValues={getPresentationFormInitialValues()}
                validationSchema={presentationFormSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({ handleSubmit: formikSubmit, validateForm }) => (
                    <FormNavigationContext.Provider
                        value={{
                            currentStep:  currentStep,
                            totalSteps:   totalSteps,
                            onNext:       handleNextStep,
                            onPrev:       handlePrevStep,
                            onSubmit:     formikSubmit,
                            isSubmitting: isSubmitting,
                            validateForm,
                            submitError:  submitError,
                            stepErrors:   stepErrors,
                            actionTitle:  FormModeComplexEnum.Create,
                        }}
                    >
                        <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
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

// ── Modo EDITAR ───────────────────────────────────────────────────────────────
const PresentationEditForm = (): React.ReactNode => {
    const form = usePresentationEdit();

    if (form.isLoadingEntity) return <LoadingSpinnerComponent />;
    if (!form.editingVariant) return <NotEntityLoaded error={form.submitError} fallbackText="No se pudo cargar la presentación" />;
    if (form.updatedVariant)  return <PresentationUpdated updatedVariant={form.updatedVariant} />;

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

// ── Modo DETALLE ─────────────────────────────────────────────────────────────
const PresentationDetailForm = (): React.ReactNode => {
    const { presentation_id: presentationId } = useParams<{ presentation_id: string }>();
    const {
        presentationData: viewingEntity,
        isLoading: isLoadingEntity,
        error: loadError,
    } = usePresentationData(presentationId);

    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = STEP_COMPONENTS.length;

    const handleNextStep = async () => {
        setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrevStep = () => {
        setCurrentStep((step) => Math.max(step - 1, 0));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Formik
            initialValues={getPresentationEditInitialValues(viewingEntity)}
            onSubmit={() => {}}
            enableReinitialize
        >
            {() => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep,
                        totalSteps,
                        onNext:       handleNextStep,
                        onPrev:       handlePrevStep,
                        onSubmit:     () => {},
                        isSubmitting: false,
                        validateForm: async () => ({}),
                        submitError:  loadError,
                        stepErrors:   [],
                        actionTitle:  FormModeComplexEnum.Detail,
                    }}
                >
                    <Grid container sx={{ width: "100%" }}>
                        {!isLoadingEntity && (
                            <ActualStepComponent
                                currentStep={currentStep}
                                stepComponents={STEP_COMPONENTS}
                            />
                        )}
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Export público ────────────────────────────────────────────────────────────
const PresentationForm = ({ mode = FormModeComplexEnum.Create }: PresentationFormProps): React.ReactNode => {
    if (mode === "edit")   return <PresentationEditForm />;
    if (mode === "detail") return <PresentationDetailForm />;
    return <PresentationCreateForm />;
};

export default PresentationForm;