import type { FormHeaderStepsTimelineProps } from "@typings/shared/reactComponents";
import FormHeaderStepsTimelineDesktop from "./FormHeaderStepsTimelineDesktop";
import FormHeaderStepsTimelineMobile from "./FormHeaderStepsTimelineMobile";
import type { ReactNode } from "react";


const FormHeaderStepsTimeline = ({ stepsLabels, currentStep, isMobile }: FormHeaderStepsTimelineProps): ReactNode => {
    if (stepsLabels.length === 0) return null;

    return isMobile
        ? <FormHeaderStepsTimelineMobile stepsLabels={stepsLabels} currentStep={currentStep} />
        : <FormHeaderStepsTimelineDesktop stepsLabels={stepsLabels} currentStep={currentStep} />;
};

export default FormHeaderStepsTimeline;