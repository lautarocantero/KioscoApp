import { Box, Typography } from "@mui/material";
import type { BaseEntitySummaryComponentProps } from "@typings/ui/uiModules";


const BaseEntitySummaryComponent = ({ label, name, description }: BaseEntitySummaryComponentProps) => (
    <Box
        sx={{
            p: 2.5,
            backgroundColor: "rgba(3,134,238,0.08)",
            border: "0.5px solid rgba(3,134,238,0.20)",
            borderRadius: "12px",
        }}
    >
        <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0386EE", mb: 1, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {label}
        </Typography>
        <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.95)" }}>
            {name}
        </Typography>
        {description && (
            <Typography sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.60)", mt: 0.5 }}>
                {description}
            </Typography>
        )}
    </Box>
);

export default BaseEntitySummaryComponent;