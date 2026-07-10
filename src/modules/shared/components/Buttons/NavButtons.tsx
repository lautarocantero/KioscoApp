import { Box, Button, type Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FormNavigationContext } from "../../context/FormNavigationContext";
import type { NavButtonsProps } from "@typings/ui/buttons.types";


const NavButtons = ({ SubmitText, backPath = "/products", readOnly = false }: NavButtonsProps): React.ReactNode => {
    const context     = useContext(FormNavigationContext); //pasar esto a un hook
    const navigate    = useNavigate();

    const currentStep = context?.currentStep ?? 0;
    const totalSteps  = context?.totalSteps  ?? 1;
    const isFirstStep = currentStep === 0;
    const isLastStep  = currentStep === totalSteps - 1;

    const handleNext = () => {
        if (!context?.validateForm) return;
        if (isLastStep) { context.onNext(context.validateForm, context.onSubmit); return; }
        context.onNext(context.validateForm);
    };

    const handleBack = () => {
        if (isFirstStep || readOnly) { navigate(backPath); return; }
        context?.onPrev();
    };

    return (
        <Box sx={{
            display: "flex", gap: 2, justifyContent: readOnly ? "flex-start" : "space-between",
            px: 3, py: 2.5,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
        }}>
            <Button onClick={handleBack} variant="outlined"
                sx={(theme: Theme) => ({
                    textTransform: "none", fontWeight: 600, minWidth: 120,
                    borderColor: theme?.custom?.translucidFontColor,
                    color: theme?.custom?.translucidFontColor,
                })}
            >
                {readOnly ? "Volver" : isFirstStep ? "Cancelar" : "Atrás"}
            </Button>

            {!readOnly && (
                <Button onClick={handleNext} variant="contained"
                    sx={(theme: Theme) => ({
                        textTransform: "none", fontWeight: 600, minWidth: 120,
                        backgroundColor: theme?.palette?.primary?.main,
                        "&:hover": { backgroundColor: theme?.custom?.darkSecondary },
                    })}
                >
                    {isLastStep ? SubmitText : "Siguiente"}
                </Button>
            )}
        </Box>
    );
};

export default NavButtons;