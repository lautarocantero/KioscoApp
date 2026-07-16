import { Box, Typography } from "@mui/material";
import type { SectionHeaderProps } from "@typings/presentation/presentationComponentTypes";
import type { ReactNode } from "react";


const PresentationDetailHeaderSection = ({ icon, title, color }: SectionHeaderProps): ReactNode => (

    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Box aria-hidden="true" sx={{ color, display: "flex", alignItems: "center" }}>{icon}</Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color }}>
            {title}
        </Typography>
    </Box>
);

export default PresentationDetailHeaderSection;
