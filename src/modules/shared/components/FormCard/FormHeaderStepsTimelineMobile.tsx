import { Box, Typography, type Theme } from "@mui/material";
import type { FormHeaderStepsTimelineMobileProps } from "@typings/shared/reactComponents";
import type { ReactNode } from "react";


const FormHeaderStepsTimelineMobile = ({ stepsLabels, currentStep }: FormHeaderStepsTimelineMobileProps): ReactNode => (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
            <Box sx={(theme: Theme) => ({
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                bgcolor: theme.palette.primary.light,
                outline: `1px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
            })}>
                <Typography sx={(theme: Theme) => ({
                    fontSize: "0.7rem", fontWeight: 700,
                    color: theme.custom.white,
                })}>
                    {currentStep + 1}
                </Typography>
            </Box>
            <Typography sx={(theme: Theme) => ({
                fontSize: "0.78rem", fontWeight: 500,
                color: theme.palette.primary.main,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            })}>
                {stepsLabels[currentStep]}
            </Typography>
        </Box>
        <Typography sx={(theme: Theme) => ({
            fontSize: "0.7rem", color: theme.custom.translucidFontColor, flexShrink: 0, ml: 1,
        })}>
            {currentStep + 1} de {stepsLabels.length}
        </Typography>
    </Box>
);

export default FormHeaderStepsTimelineMobile;