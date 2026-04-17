import { Button, CircularProgress, Grid, type Theme } from "@mui/material";
import FormHeaderComponent from "./FormHeader";
import type { FormGridProps } from "@typings/shared/types/useFormSteps";
import { useNavigate } from "react-router-dom";

const FormGridComponent = ({ formSteps, prevLink, validateStep, isSubmitting = false }: FormGridProps): React.ReactNode => {
    const { stepState, goToNext, goToPrev, isFirst, isLast, totalSteps } = formSteps;
    const handleNavigate = useNavigate();

    const handleGoBack = () => {
        if (isFirst) {
            handleNavigate(`${prevLink}`);
            return;
        }
        goToPrev();
    };

    const handleGoNext = async () => {
        const isValid = await validateStep(stepState.currentStep);
        if (!isValid) return;
        goToNext();
    };

    return (
        <Grid container sx={{ margin: "3em auto 0", width: "90%" }}>
            <FormHeaderComponent
                currentStep={stepState.currentStep}
                totalSteps={totalSteps}
                title={stepState.title}
            />

            <Grid container sx={{ mt: 3 }}>
                {stepState.content}
            </Grid>

            <Grid
                container
                spacing={0}
                justifyContent="space-between"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mt: 6,
                    mb: 3,
                }}
            >
                <Button
                    onClick={handleGoBack}
                    disabled={isSubmitting}
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.fontColor,
                    })}
                >
                    Atrás
                </Button>

                <Button
                    onClick={handleGoNext}
                    type={isLast ? "submit" : "button"}
                    disabled={isSubmitting}
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.fontColor,
                        minWidth: 100,
                    })}
                >
                    {isLast && isSubmitting ? (
                        <CircularProgress size={18} color="inherit" />
                    ) : (
                        isLast ? "Crear" : "Continuar"
                    )}
                </Button>
            </Grid>
        </Grid>
    );
};

export default FormGridComponent;