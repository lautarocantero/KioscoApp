import { Grid } from "@mui/material";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import ActualStepComponent from "../../../shared/components/FormCard/ActualStep";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import EmptyProvider from "./EmptyProvider";
import { useProviderCreate, useProviderEdit } from "../../../../hooks/providers/useProvidersForm";
import { useProviderData } from "../../../../hooks/providers/useProviderData";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import LoadingScreen from "../../../shared/components/LoadingScreen/LoadingScreen";
import {
    getProviderEditInitialValues,
    getProviderFormInitialValues,
    providerEditFormSchema,
    providerFormSchema,
} from "../../schema/ProviderFormSchema";
import ProviderFormFirstStep from "./ProviderFormFirstStep";
import type { ProviderFormProps } from "@typings/provider/providerComponentTypes";

const STEP_COMPONENTS = [ProviderFormFirstStep];

// ── Modo CREAR ───────────────────────────────────────────────────────────────
const ProviderCreateForm = (): React.ReactNode => {
    const { isSubmitting, submitError, handleSubmit } = useProviderCreate();

    return (
        <Formik
            initialValues={getProviderFormInitialValues()}
            validationSchema={providerFormSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep: 0,
                        totalSteps: 1,
                        onNext: async (_validateForm, onValidSubmit) => { if (onValidSubmit) onValidSubmit(); },
                        onPrev: () => {},
                        onSubmit: formikSubmit,
                        isSubmitting,
                        validateForm,
                        submitError,
                        stepErrors: [],
                        actionTitle: FormModeComplexEnum.Create,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Modo EDITAR ───────────────────────────────────────────────────────────────
const ProviderEditForm = (): React.ReactNode => {
    const { providerId, editingProvider, isLoadingProvider, isSubmitting, submitError, handleEdit } = useProviderEdit();
    const isPageLoading = useInitialPageLoading(isLoadingProvider, providerId);

    if (isPageLoading) return <LoadingScreen label="Cargando proveedor..." fullViewport={false} />;
    if (!editingProvider) return <EmptyProvider />;

    return (
        <Formik
            initialValues={getProviderEditInitialValues(editingProvider)}
            validationSchema={providerEditFormSchema}
            onSubmit={handleEdit}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep: 0,
                        totalSteps: 1,
                        onNext: async (_validateForm, onValidSubmit) => { if (onValidSubmit) onValidSubmit(); },
                        onPrev: () => {},
                        onSubmit: formikSubmit,
                        isSubmitting,
                        validateForm,
                        submitError,
                        stepErrors: [],
                        actionTitle: FormModeComplexEnum.Edit,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Modo DETALLE ─────────────────────────────────────────────────────────────
const ProviderDetailForm = (): React.ReactNode => {
    const { provider_id: providerId } = useParams<{ provider_id: string }>();
    const { providerData: viewingEntity, isLoading: isLoadingEntity } = useProviderData(providerId);
    const isPageLoading = useInitialPageLoading(isLoadingEntity, providerId);

    if (isPageLoading) return <LoadingScreen label="Cargando proveedor..." fullViewport={false} />;
    if (!viewingEntity) return <EmptyProvider />;

    return (
        <Formik
            initialValues={getProviderEditInitialValues(viewingEntity)}
            onSubmit={() => {}}
            enableReinitialize
        >
            {() => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep: 0,
                        totalSteps: 1,
                        onNext: async (_validateForm, onValidSubmit) => { if (onValidSubmit) onValidSubmit(); },
                        onPrev: () => {},
                        onSubmit: () => {},
                        isSubmitting: false,
                        validateForm: async () => ({}),
                        submitError: null,
                        stepErrors: [],
                        actionTitle: FormModeComplexEnum.Detail,
                    }}
                >
                    <Grid
                        container
                        sx={{
                            width: { xs: "100%", sm: "80%", md: "100%" },
                            m: { xs: "3em auto", sm: "3em 1em" },
                        }}
                    >
                        {!isLoadingEntity && (
                            <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                        )}
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Export público ────────────────────────────────────────────────────────────
const ProviderForm = ({ mode = FormModeComplexEnum.Create }: ProviderFormProps): React.ReactNode => {
    if (mode === FormModeComplexEnum.Edit) return <ProviderEditForm />;
    if (mode === FormModeComplexEnum.Detail) return <ProviderDetailForm />;
    return <ProviderCreateForm />;
};

export default ProviderForm;
