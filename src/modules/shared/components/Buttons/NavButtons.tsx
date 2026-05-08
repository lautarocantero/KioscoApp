import { Box, Button, type Theme } from "@mui/material";
import { useFormNavigation } from "../../../../modules/products/context/FormNavigationContext";

const NavButtons = (): React.ReactNode => {
    const { currentStep, onNext, onPrev, validateForm } = useFormNavigation();

    return (
        <Box sx={{
            display: "flex", gap: 2, justifyContent: "space-between",
            px: 3, py: 2.5,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(0,0,0,0.2)",
        }}>
            <Button
                onClick={onPrev}
                disabled={currentStep === 0}
                variant="outlined"
                sx={(theme: Theme) => ({
                    textTransform: "none", fontWeight: 600, minWidth: 120,
                    borderColor: theme?.custom?.fontColorTransparent,
                    color: theme?.custom?.fontColorTransparent,
                    "&:disabled": { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.3)" },
                })}
            >
                ← Atrás
            </Button>

            <Button
                onClick={() => validateForm && onNext(validateForm)}
                variant="contained"
                sx={{
                    textTransform: "none", fontWeight: 600, minWidth: 120,
                    backgroundColor: "#0386EE",
                    "&:hover": { backgroundColor: "#0270c4" },
                }}
            >
                Siguiente →
            </Button>
        </Box>
    );
};

export default NavButtons;