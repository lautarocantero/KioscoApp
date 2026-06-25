import { Box, Typography } from "@mui/material";
import type { BaseEntitySummaryComponentProps } from "@typings/ui/uiModules";
import { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";


const BaseEntitySummaryComponent = ({ label, name, description }: BaseEntitySummaryComponentProps) => {
    
    const { appTheme } = useContext(ThemeContext);

    return (
    <Box
        sx={theme => ({
            p: 2.5,
            backgroundColor: "rgba(3,134,238,0.08)",
            border: "0.5px solid rgba(3,134,238,0.20)",
            borderRadius: "12px",
            color: theme.custom?.fontColorDark,
        })}
    >
        <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0386EE", mb: 1, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {label}
        </Typography>
        <Typography sx={theme => ({ fontSize: "1rem", fontWeight: 600, color: !appTheme ? theme?.palette?.primary.main : theme?.custom?.whiteTranslucid })}>
            {name}
        </Typography>
        {description && (
            <Typography sx={theme => ({ fontSize: "0.8rem", color: !appTheme ? theme?.palette?.primary.main : theme?.custom?.whiteTranslucid , mt: 0.5 })}>
                {description}
            </Typography>
        )}
    </Box>
)};

export default BaseEntitySummaryComponent;