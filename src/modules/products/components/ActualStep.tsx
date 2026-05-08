import { Grid } from "@mui/material";
import type { ActualStepComponentProps } from "@typings/shared/types/useFormSteps";


const ActualStepComponent = ({ currentStep, stepComponents }: ActualStepComponentProps) => {
    const StepContent = stepComponents[currentStep] ?? stepComponents[0];

    return (
        <Grid size={12} sx={{ mb: 4 }}>
            <StepContent />
        </Grid>
    );
};

export default ActualStepComponent;