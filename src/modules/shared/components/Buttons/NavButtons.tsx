import { Box, Button, type Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FormNavigationContext } from "../../context/FormNavigationContext";

export interface NavButtonsProps {
    SubmitText?:  string;
    backPath?:    string;
    readOnly?:    boolean;
}

const NavButtons = ({ SubmitText, backPath = "/products", readOnly = false }: NavButtonsProps): React.ReactNode => {
    const context     = useContext(FormNavigationContext);
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
            backgroundColor: "rgba(0,0,0,0.2)",
        }}>
            <Button onClick={handleBack} variant="outlined"
                sx={(theme: Theme) => ({
                    textTransform: "none", fontWeight: 600, minWidth: 120,
                    borderColor: theme?.custom?.fontColorTransparent,
                    color: theme?.custom?.fontColorTransparent,
                })}
            >
                {isFirstStep && !readOnly ? "Cancelar" : "Atrás"}
            </Button>

            {!readOnly && (
                <Button onClick={handleNext} variant="contained"
                    sx={{
                        textTransform: "none", fontWeight: 600, minWidth: 120,
                        backgroundColor: "#0386EE",
                        "&:hover": { backgroundColor: "#0270c4" },
                    }}
                >
                    {isLastStep ? SubmitText : "Siguiente"}
                </Button>
            )}
        </Box>
    );
};

export default NavButtons;