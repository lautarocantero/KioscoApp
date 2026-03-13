import { Box, Grid } from "@mui/material";
import type { FormGridStepsType } from "@typings/ui/uiModules";

const FormStepsComponent = ({ steps, currentStep }: FormGridStepsType): React.ReactNode => {

    const getFilter = (index: number) => {
        if (index < currentStep) return "brightness(0) invert(1)"; // completado → filtro blanco
        if (index === currentStep) return "none";                   // activo → sin filtro
        return "none";                                              // pendiente → sin filtro
    };

    const renderSteps = Array.from({ length: steps }).map((_, index) => (
        <Box
            key={index}
            component="img"
            src="/images/icons/dot-circle.svg"
            sx={{
                width: { xs: "10%", sm: "8%", md: "5%", lg: "3%" },
                transition: "opacity 0.2s ease, filter 0.2s ease",
                opacity: index > currentStep ? 0.4 : 1,
                filter: getFilter(index),
            }}
        />
    ));

    return (
        <Grid sx={{ flex: 1, display: "flex", gap: 1 }}>
            {renderSteps}
        </Grid>
    );
};

export default FormStepsComponent;