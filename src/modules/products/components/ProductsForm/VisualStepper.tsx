import { Step, StepLabel, Stepper, type Theme } from "@mui/material";
import type { FormHeaderComponentProps } from "@typings/shared/types/useFormSteps";

const VisualStepperComponent = ({ stepsLabels, currentStep }: FormHeaderComponentProps) => {

    return (
        <Stepper
            activeStep={currentStep}
            sx={{
                backgroundColor: "transparent",
                "& .MuiStepLabel-root": { cursor: "default" },
                "& .MuiStepConnector-root": { marginLeft: 0, marginRight: 0 },
            }}
        >
            {stepsLabels.map((label) => (
                <Step key={label}>
                    <StepLabel
                        sx={(theme: Theme) => ({
                            "& .MuiStepLabel-label": {
                                fontSize: "0.75rem",
                                color: theme.custom?.fontColorTransparent,
                                mt: 1,
                            },
                            "& .MuiStepLabel-label.Mui-active": {
                                color: "#0386EE",
                                fontWeight: 600,
                            },
                            "& .MuiStepLabel-label.Mui-completed": {
                                color: theme.custom?.fontColorTransparent,
                            },
                        })}
                    >
                        {label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default VisualStepperComponent;