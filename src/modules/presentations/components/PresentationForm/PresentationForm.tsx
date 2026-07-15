import { Grid } from "@mui/material";
import type { PresentationFormProps } from "@typings/presentation/presentationComponentTypes";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import { Formik } from "formik";
import { usePresentationCreate, usePresentationEdit } from "../../../../hooks/presentations/usePresentationForm";
import ActualStepComponent from "../../../shared/components/FormCard/ActualStep";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner";
import NotEntityLoaded from "../../../shared/components/NotEntityLoaded";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import PresentationCreated from "../../pages/PresentationCreate/components/PresentationCreated";
import PresentationEdited from "../../pages/PresentationEdit/components/PresentationEdited";
import {
    getPresentationEditInitialValues,
    getPresentationFormInitialValues,
    presentationEditFormSchema,
    presentationFormSchema,
} from "../../schema/PresentationFormSchema";
import PresentationFormFirstStep from "./PresentationFormFirstStep";
import PresentationFormSecondStep from "./PresentationFormSecondStep";
import PresentationFormThirdStep from "./PresentationFormThirdStep";
import PresentationDetailFormComponent from "./PresentationDetailForm";

const STEP_COMPONENTS = [
    PresentationFormFirstStep,
    PresentationFormSecondStep,
    PresentationFormThirdStep,
];

const DETAIL_COMPONENTS = [PresentationDetailFormComponent];


// ── Modo CREAR ────────────────────────────────────────────────────────────────
const PresentationCreateForm = (): React.ReactNode => {
    const {
        createdPresentation, 
        handleCreateAnother, 
        handleSubmit, 
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        isSubmitting,
        submitError,
        stepErrors,
    } = usePresentationCreate();

    if (createdPresentation) return (
        <PresentationCreated
            createdPresentation={createdPresentation}
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
    const {
        isLoadingEntity,
        editingVariant,
        updatedVariant,
        submitError,
        stepErrors,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        handleEdit,
        isSubmitting,
    } = usePresentationEdit();

    if (isLoadingEntity) return <LoadingSpinnerComponent />;
    if (!editingVariant) return <NotEntityLoaded error={submitError} fallbackText="No se pudo cargar la presentación" />;
    if (updatedVariant)  return <PresentationEdited updatedVariant={updatedVariant} />;

    return (
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
                        onNext:       handleNextStep,
                        onPrev:       handlePrevStep,
                        onSubmit:     formikSubmit,
                        isSubmitting,
                        validateForm,
                        submitError,
                        stepErrors,
                        actionTitle:  FormModeComplexEnum.Edit,
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

// ── Modo DETALLE ─────────────────────────────────────────────────────────────
const PresentationDetailForm = (): React.ReactNode => {
    const {
        editingVariant: variant,
        isLoadingEntity,
        submitError,
    } = usePresentationEdit();

    if (isLoadingEntity) return <LoadingSpinnerComponent />;
    if (!variant) return <NotEntityLoaded error={submitError} fallbackText="No se pudo cargar la presentación" />;

    return (
        <Formik
            initialValues={getPresentationEditInitialValues(variant)}
            onSubmit={() => {}}
            enableReinitialize
        >
            {() => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep:  0,
                        totalSteps:   1,
                        onNext:       async () => {},
                        onPrev:       () => {},
                        onSubmit:     () => {},
                        isSubmitting: false,
                        validateForm: async () => ({}),
                        submitError:  submitError,
                        stepErrors:   [],
                        actionTitle:  FormModeComplexEnum.Detail,
                    }}
                >
                    <Grid container sx={{ width: "100%" }}>
                        <ActualStepComponent
                            currentStep={0}
                            stepComponents={DETAIL_COMPONENTS}
                        />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Export público ────────────────────────────────────────────────────────────
const PresentationForm = ({ mode = FormModeComplexEnum.Create }: PresentationFormProps): React.ReactNode => {
    if (mode === FormModeComplexEnum.Edit)   return <PresentationEditForm />;
    if (mode === FormModeComplexEnum.Detail) return <PresentationDetailForm />;
    return <PresentationCreateForm />;
};

export default PresentationForm;