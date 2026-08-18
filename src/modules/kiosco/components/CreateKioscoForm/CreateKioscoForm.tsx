import { Grid } from "@mui/material";
import { Formik } from "formik";
import type { ReactNode } from "react";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import ActualStepComponent from "../../../shared/components/FormCard/ActualStep";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import { useCreateKiosco } from "../../../../hooks/kiosco/useCreateKiosco";
import { createKioscoFormSchema, getCreateKioscoInitialValues } from "../../schema/KioscoFormSchema";
import CreateKioscoFormFirstStep from "./CreateKioscoFormFirstStep";

const STEP_COMPONENTS = [CreateKioscoFormFirstStep];

const CreateKioscoForm = (): ReactNode => {
    const { isSubmitting, submitError, handleSubmit } = useCreateKiosco();

    return (
        <Formik
            initialValues={getCreateKioscoInitialValues()}
            validationSchema={createKioscoFormSchema}
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
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%", justifyContent: "center" }}>
                        <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

export default CreateKioscoForm;
