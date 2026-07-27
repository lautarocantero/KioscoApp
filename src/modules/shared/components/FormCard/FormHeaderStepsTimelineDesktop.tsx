import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { FormHeaderStepsTimelineDesktopProps } from "@typings/shared/reactComponents";
import type { ReactNode } from "react";


const FormHeaderStepsTimelineDesktop = ({ stepsLabels, currentStep }: FormHeaderStepsTimelineDesktopProps): ReactNode => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
        {stepsLabels.map((label, index) => (
            <Box key={label} sx={{ display: "flex", alignItems: "center", flex: index < stepsLabels.length - 1 ? 1 : "0 0 auto" }}>
                <Box sx={(theme: Theme) => ({
                    width: 28, height: 28, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    bgcolor: index <= currentStep ? theme.palette.primary.light : alpha(theme.palette.primary.light, 0.08),
                    outline: `1px solid ${index <= currentStep ? theme.palette.primary.main : alpha(theme.custom.fontColor, 0.15)}`,
                    outlineOffset: "2px",
                })}>
                    <Typography sx={(theme: Theme) => ({
                        fontSize: "0.7rem", fontWeight: 700,
                        color: index <= currentStep ? theme.custom.white : alpha(theme.custom.fontColor, 0.5),
                    })}>
                        {index + 1}
                    </Typography>
                </Box>
                <Typography sx={(theme: Theme) => ({
                    fontSize: "0.72rem", ml: 1, whiteSpace: "nowrap",
                    color: index === currentStep ? theme.palette.primary.main : alpha(theme.custom.fontColor, 0.45),
                    fontWeight: index === currentStep ? 500 : 400,
                })}>
                    {label}
                </Typography>
                {index < stepsLabels.length - 1 && (
                    <Box sx={(theme: Theme) => ({
                        flex: 1, height: "1px", mx: 1,
                        bgcolor: index < currentStep ? theme.palette.primary.main : alpha(theme.custom.fontColor, 0.12),
                    })} />
                )}
            </Box>
        ))}
    </Box>
);

export default FormHeaderStepsTimelineDesktop;