import { Box, Button, type Theme } from "@mui/material";
import type { FormNavButtonsProps } from "@typings/ui/buttons.types";
import { useFormNavButtons } from "../../../../hooks/shared/useFormNavButtons";


const FormNavButtons = ({ SubmitText, defaultBack = "/products", readOnly = false }: FormNavButtonsProps): React.ReactNode => {
    const { isFirstStep, isLastStep, handleNext, handleBack } = useFormNavButtons({ defaultBack, readOnly });

    return (
        <Box sx={(theme: Theme) => ({
            display: "flex", 
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            gap: 2, 
            justifyContent: readOnly ? "flex-start" : "space-between",
            px: 3,
            py: 2.5,
            borderTop: `0.5px solid ${theme?.custom?.darkGray}`,
        })}>
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

export default FormNavButtons;