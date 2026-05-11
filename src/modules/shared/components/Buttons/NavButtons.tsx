import { Box, Button, type Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormNavigation } from "../../../../modules/products/context/FormNavigationContext";

const NavButtons = (): React.ReactNode => {
    const { currentStep, onNext, onPrev, onSubmit, validateForm, totalSteps } = useFormNavigation();
    const navigate = useNavigate();

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;

    const handleNext = () => {
        if (!validateForm) return;
        if (isLastStep) {
            onNext(validateForm, onSubmit);
            return;
        }
        onNext(validateForm);
    };

    const handleBack = () => {
        if (isFirstStep) {
            navigate("/products");
            return;
        }
        onPrev();
    };

    return (
        <Box sx={{
            display: "flex", gap: 2, justifyContent: "space-between",
            px: 3, py: 2.5,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(0,0,0,0.2)",
        }}>
            <Button
                onClick={handleBack}
                variant="outlined"
                sx={(theme: Theme) => ({
                    textTransform: "none", fontWeight: 600, minWidth: 120,
                    borderColor: theme?.custom?.fontColorTransparent,
                    color: theme?.custom?.fontColorTransparent,
                })}
            >
                {isFirstStep ? "← Cancelar" : "← Atrás"}
            </Button>

            <Button
                onClick={handleNext}
                variant="contained"
                sx={{
                    textTransform: "none", fontWeight: 600, minWidth: 120,
                    backgroundColor: "#0386EE",
                    "&:hover": { backgroundColor: "#0270c4" },
                }}
            >
                {isLastStep ? "Crear producto" : "Siguiente"}
            </Button>
        </Box>
    );
};

export default NavButtons;