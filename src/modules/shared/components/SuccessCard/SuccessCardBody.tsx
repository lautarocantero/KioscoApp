import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import SuccessCardName from "./SuccessCardName";
import type { SuccessCardBodyProps } from "@typings/ui/successCard.types";


const SuccessCardBody = ({ name, title, subtitle, timeline, showSuccessIcon = true }: SuccessCardBodyProps): React.ReactNode => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4, px: 3 }}>

        {timeline}

        {showSuccessIcon && (
            <Box
                sx={(theme: Theme) => ({
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 3,
                    backgroundColor: alpha(theme.custom.accents.green, 0.12),
                    border: `1.5px solid ${theme.custom.accents.green}`,
                    boxShadow: `0 0 24px 6px ${alpha(theme.custom.accents.green, 0.35)}`,
                })}
            >
                <CheckIcon sx={(theme: Theme) => ({ color: theme.custom.accents.green, fontSize: "1.8rem" })} />
            </Box>
        )}

        <Typography sx={(theme: Theme) => ({
            fontSize: theme.typography.h6?.fontSize,
            fontWeight: 700,
            color: theme.custom.fontColor,
            textAlign: "center",
            mb: 2,
        })}>
            {title}
        </Typography>

        <SuccessCardName name={name} />

        <Typography sx={(theme: Theme) => ({
            maxWidth: 420,
            textAlign: "center",
            color: theme.custom.translucidFontColor,
            fontSize: "1rem",
            lineHeight: 1.6,
        })}>
            {subtitle}
        </Typography>
    </Box>
);

export default SuccessCardBody;