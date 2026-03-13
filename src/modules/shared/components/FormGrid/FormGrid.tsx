import { Button, Grid } from "@mui/material";
import FormHeaderComponent from "./FormHeader";
import type { FormGridProps } from "@typings/shared/types/useFormSteps";


const FormGridComponent = ({ formSteps }: FormGridProps): React.ReactNode => {
    const { stepState, goToNext, goToPrev, isFirst, isLast, totalSteps } = formSteps;

    return (
        <Grid
            container
            sx={{ margin: "3em auto 0", width: "90%" }}
        >
            <FormHeaderComponent
                currentStep={stepState.currentStep}
                totalSteps={totalSteps}
                title={stepState.title}
            />

            {/* Contenido dinámico del step actual */}
            <Grid container sx={{ mt: 3 }}>
                {stepState.content}
            </Grid>

            {/* Navegación */}
            <Grid container justifyContent="space-between" sx={{ mt: 6 }}>
                {!isFirst && (
                    <Button onClick={goToPrev}>Atrás</Button>
                )}
                <Button onClick={goToNext} disabled={isLast}>
                    {isLast ? "Finalizar" : "Continuar"}
                </Button>
            </Grid>
        </Grid>
    );
};

export default FormGridComponent;