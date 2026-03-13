import { Grid } from "@mui/material";
import type { FormGridHeaderInterface } from "@typings/ui/uiModules";
import FormStepsTitleComponent from "./FormStepsTitle";
import FormStepsComponent from "./FormSteps";

const FormGridHeaderComponent = ({ currentStep, totalSteps, title }: FormGridHeaderInterface): React.ReactNode => {
    return (
        <Grid
            container
            spacing={0}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
            }}
        >
            <FormStepsComponent steps={totalSteps} currentStep={currentStep} />
            <FormStepsTitleComponent title={title} />
        </Grid>
    )
};

export default FormGridHeaderComponent;