// SellForm.tsx
import { Grid } from "@mui/material";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import { Formik, type FormikErrors } from "formik";
import { useSellDetail, useSellEdit } from "../../../../hooks/sells/useSellsForm";
import ActualStepComponent from "../../../../modules/shared/components/FormCard/ActualStep";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import { getSellEditInitialValues, sellEditFormSchema } from "../../schema/SellFormSchema";
import SellFormFirstStep from "./SellFormFirstStep";
import LoadingSpinnerComponent from "modules/shared/components/LoadingSpinner";
import NotEntityLoaded from "modules/shared/components/NotEntityLoaded";
import { useParams } from "react-router-dom";
import type { SellFormProps } from "@typings/sells/SellComponentTypes";
import SellEdited from "modules/sells/pages/SellEdit/components/SellEdited";
import SellDetailFormComponent from "./SellDetailForm";

const STEP_COMPONENTS = [SellFormFirstStep];

const DETAIL_COMPONENTS = [SellDetailFormComponent];

// ── Modo EDITAR ───────────────────────────────────────────────────────────────
const SellEditForm = (): React.ReactNode => {
    const {
        editingSell,
        isLoadingSell,
        updatedSellId,
        handleEdit,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        isSubmitting,
        submitError,
        stepErrors,
        handleSeeDetail,
        handleBackToSells,
    } = useSellEdit();

    if (isLoadingSell) return <LoadingSpinnerComponent />;
    if (!editingSell) return <NotEntityLoaded error={submitError} fallbackText="No se pudo cargar la venta" />;
    if (updatedSellId) return (
        <SellEdited handleSeeDetail={handleSeeDetail} handleBackToSells={handleBackToSells} />
    );

    return (
        <Formik
            initialValues={getSellEditInitialValues(editingSell)}
            validationSchema={sellEditFormSchema}
            onSubmit={handleEdit}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
        >
            {({ handleSubmit: formikSubmit }) => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep,
                        totalSteps,
                        onNext:       handleNextStep,
                        onPrev:       handlePrevStep,
                        onSubmit:     formikSubmit,
                        isSubmitting,
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
const SellDetailForm = (): React.ReactNode => {
    const { sell_id: sellId } = useParams<{ sell_id: string }>();
    const { viewingSell, isLoadingSell, error, handleSubmit } = useSellDetail(sellId);

    if (isLoadingSell) return <LoadingSpinnerComponent />;
    if (!viewingSell) return <NotEntityLoaded error={error} fallbackText="No se pudo cargar la venta" />;

    return (
        <Formik
            initialValues={getSellEditInitialValues(viewingSell)}
            onSubmit={() => {}}
            enableReinitialize
        >
            {() => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep:  0,
                        totalSteps:   1,
                        onNext: async (_validateForm, onValidSubmit) => {
                            if (onValidSubmit) onValidSubmit();
                        },
                        onPrev:       () => {},
                        onSubmit:     handleSubmit,
                        isSubmitting: false,
                        validateForm: async () => ({}),
                        submitError:  error,
                        stepErrors:   [],
                        actionTitle:  FormModeComplexEnum.Detail,
                    }}
                >
                    <Grid
                        container
                        sx={{
                            width: { xs: "100%", sm: "80%", md: "100%" },
                            m: { xs: "3em auto", sm: "3em 1em" },
                        }}
                    >
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
const SellForm = ({ mode = FormModeComplexEnum.Detail }: SellFormProps): React.ReactNode => {
    if (mode === FormModeComplexEnum.Edit) return <SellEditForm />;
    return <SellDetailForm />;
};

export default SellForm;