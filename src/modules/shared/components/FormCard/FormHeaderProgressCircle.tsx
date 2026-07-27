import { Box, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { FormHeaderProgressCircleProps } from "@typings/shared/reactComponents";
import type { ReactNode } from "react";


const FormHeaderProgressCircle = ({ currentStep, stepsLabels }: FormHeaderProgressCircleProps): ReactNode => {
    const theme = useTheme();

    if (stepsLabels.length === 0) return null;

    const progress = Math.round(((currentStep + 1) / stepsLabels.length) * 100);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <Box sx={{ position: "relative", width: 36, height: 36 }}>
                <svg width="36" height="36" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="18" cy="18" r="15" fill="none" stroke={alpha(theme.custom.darkGray, 0.1)} strokeWidth="2" />
                    <circle
                        cx="18" cy="18" r="15"
                        fill="none"
                        stroke={theme.palette.primary.main}
                        strokeWidth="2"
                        strokeDasharray={2 * Math.PI * 15}
                        strokeDashoffset={2 * Math.PI * 15 * (1 - (currentStep + 1) / stepsLabels.length)}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.5s ease" }}
                    />
                </svg>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: theme.palette.primary.main }}>
                        {progress}%
                    </Typography>
                </Box>
            </Box>
            <Typography sx={(theme) => ({
                fontSize: "0.6rem", color: theme.custom.translucidFontColor, mt: "2px",
            })}>
                Completado
            </Typography>
        </Box>
    );
};

export default FormHeaderProgressCircle;