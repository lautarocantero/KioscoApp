import { Button, Grid, type Theme } from "@mui/material";
import type { CancelButtonComponentProps } from "@typings/ui/uiModules";
import { useNavigate } from "react-router-dom";


const CancelButtonComponent = ({ navigateTo, label = "← Cancelar" }: CancelButtonComponentProps) => {
    const navigate = useNavigate();

    return (
        <Grid size={12}>
            <Button
                fullWidth
                variant="text"
                onClick={() => navigate(navigateTo)}
                sx={(theme: Theme) => ({
                    textTransform: "none",
                    color: theme?.custom?.fontColorTransparent,
                    fontSize: "0.9rem",
                })}
            >
                {label}
            </Button>
        </Grid>
    );
};

export default CancelButtonComponent;