import { Box, Typography } from "@mui/material";
import SuccessCardName from "./SuccessCardName";

interface SuccessCardBodyProps {
    name:      string;
    title:     string;
    subtitle:  string;
    timeline?: React.ReactNode;
}

const SuccessCardBody = ({ name, title, subtitle, timeline }: SuccessCardBodyProps): React.ReactNode => (
    <Box sx={theme => ({ display: "flex", flexDirection: "column", alignItems: "center", py: 4, px: 3, backgroundColor: theme.custom.white, borderRadius: "16px" })}>

        {timeline}

        <Typography sx={theme => ({ fontSize: theme.typography.h6?.fontSize, fontWeight: 700, color: theme.custom.backgroundDark, textAlign: "center", mb: 2 })}>
            {title}
        </Typography>

        <SuccessCardName name={name} />

        <Typography sx={theme => ({ maxWidth: 420, textAlign: "center", color: theme.custom.fontColorDark, opacity: 0.8, fontSize: "1rem", lineHeight: 1.6 })}>
            {subtitle}
        </Typography>
    </Box>
);

export default SuccessCardBody;
