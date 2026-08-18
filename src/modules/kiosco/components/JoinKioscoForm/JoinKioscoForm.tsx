import { Grid } from "@mui/material";
import { Formik } from "formik";
import { useSearchParams } from "react-router-dom";
import type { ReactNode } from "react";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import ActualStepComponent from "../../../shared/components/FormCard/ActualStep";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import { useJoinKiosco } from "../../../../hooks/kiosco/useJoinKiosco";
import { getJoinKioscoInitialValues, joinKioscoFormSchema } from "../../schema/JoinKioscoFormSchema";
import JoinKioscoFormFirstStep from "./JoinKioscoFormFirstStep";

const STEP_COMPONENTS = [JoinKioscoFormFirstStep];

const JoinKioscoForm = (): ReactNode => {
    const { isSubmitting, submitError, handleSubmit } = useJoinKiosco();
    const [searchParams] = useSearchParams();

    return (
        <Formik
            initialValues={getJoinKioscoInitialValues(searchParams.get("code"))}
            validationSchema={joinKioscoFormSchema}
            onSubmit={handleSubmit}
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
                        actionTitle: FormModeComplexEnum.Create,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%", justifyContent: "center" }}>
                        <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

export default JoinKioscoForm;
