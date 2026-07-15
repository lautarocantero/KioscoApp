import { Box, Typography } from "@mui/material";
import type { SectionHeaderProps } from "@typings/presentation/presentationComponentTypes";

const PresentationDetailHeaderSection = ({ icon, title, color }: SectionHeaderProps): React.ReactNode => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Box sx={{ color, display: "flex", alignItems: "center" }}>{icon}</Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color }}>
            {title}
        </Typography>
    </Box>
);

export default PresentationDetailHeaderSection;
