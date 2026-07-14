import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ApiErrorComponentProps } from "@typings/shared/reactComponents";


const ApiErrorComponent = ({ submitError, stepErrors }: ApiErrorComponentProps): React.ReactNode => {
    const allErrors = [
        ...(stepErrors ?? []),
        ...(submitError ? [submitError] : []),
    ];

    if (allErrors.length === 0) return null;

    return (
        <Box sx={(theme: Theme) => ({
            px: 3, py: 1.5,
            borderTop: "0.5px solid",
            borderColor: alpha(theme.custom.white, 0.07),
        })}>
            {allErrors.map((error, i) => (
                <Typography key={i} sx={(theme: Theme) => ({
                    fontSize: "0.72rem",
                    color: theme.palette.error.light,
                    display: "flex", alignItems: "center", gap: 0.5,
                    mb: i < allErrors.length - 1 ? 0.5 : 0,
                })}>
                    <Box component="span">•</Box>
                    {error}
                </Typography>
            ))}
        </Box>
    );
};

export default ApiErrorComponent;