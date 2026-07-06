import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SuccessCardName from "./SuccessCardName";

interface SuccessCardBodyProps {
    name:      string;
    title:     string;
    subtitle:  string;
    timeline?: React.ReactNode;
    showSuccessIcon?: boolean;
}

const SUCCESS_COLOR = "#4ADE80";

const SuccessCardBody = ({ name, title, subtitle, timeline, showSuccessIcon = true }: SuccessCardBodyProps): React.ReactNode => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4, px: 3 }}>

        {timeline}

        {showSuccessIcon && (
            <Box
                sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 3,
                    backgroundColor: "rgba(74,222,128,0.12)",
                    border: `1.5px solid ${SUCCESS_COLOR}`,
                    boxShadow: `0 0 24px 6px rgba(74,222,128,0.35)`,
                }}
            >
                <CheckIcon sx={{ color: SUCCESS_COLOR, fontSize: "1.8rem" }} />
            </Box>
        )}

        <Typography sx={(theme) => ({
            fontSize: theme.typography.h6?.fontSize,
            fontWeight: 700,
            color: theme.custom?.white,
            textAlign: "center",
            mb: 2,
        })}>
            {title}
        </Typography>

        <SuccessCardName name={name} />

        <Typography sx={(theme) => ({
            maxWidth: 420,
            textAlign: "center",
            color: theme.custom?.translucidWhite ?? "rgba(255,255,255,0.6)",
            fontSize: "1rem",
            lineHeight: 1.6,
        })}>
            {subtitle}
        </Typography>
    </Box>
);

export default SuccessCardBody;