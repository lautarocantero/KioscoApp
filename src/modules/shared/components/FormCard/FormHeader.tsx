import { Box } from "@mui/material";
import type { FormCardHeaderProps } from "@typings/shared/reactComponents";
import { useBreakpoint } from "../../../../hooks/ui/useBreakpoint";
import FormHeaderIconBox from "./FormHeaderIconBox";
import FormHeaderTitleBlock from "./FormHeaderTitleBlock";
import FormHeaderProgressCircle from "./FormHeaderProgressCircle";
import FormHeaderStatusChip from "./FormHeaderStatusChip";
import FormHeaderStepsTimeline from "./FormHeaderStepsTimeline";
import type { ReactNode } from "react";


const FormHeader = ({
    title,
    subtitle,
    icon,
    isMultiStep = false,
    stepsLabels = [],
    currentStep = 0,
    status
}: FormCardHeaderProps): ReactNode => {
    const bp = useBreakpoint();
    const isMobile = bp === "xs";

    return (
        <Box sx={{
            display: "flex", flexDirection: "column",
            px: 3, py: 2,
        }}>
            {isMobile ? (
                <>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <FormHeaderIconBox icon={icon} />
                        {isMultiStep && <FormHeaderProgressCircle currentStep={currentStep} stepsLabels={stepsLabels} />}
                        <FormHeaderStatusChip status={status} />
                    </Box>
                    <Box sx={{ mt: 1.5 }}>
                        <FormHeaderTitleBlock title={title} subtitle={subtitle} />
                    </Box>
                </>
            ) : (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <FormHeaderIconBox icon={icon} />
                        <FormHeaderTitleBlock title={title} subtitle={subtitle} />
                    </Box>
                    {isMultiStep && <FormHeaderProgressCircle currentStep={currentStep} stepsLabels={stepsLabels} />}
                    <FormHeaderStatusChip status={status} />
                </Box>
            )}

            {isMultiStep && (
                <FormHeaderStepsTimeline stepsLabels={stepsLabels} currentStep={currentStep} isMobile={isMobile} />
            )}
        </Box>
    );
};

export default FormHeader;