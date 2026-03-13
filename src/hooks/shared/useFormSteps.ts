import type { StepConfig, StepState } from "@typings/shared/types/useFormSteps";
import { useState, useCallback } from "react";

export const useFormSteps = (stepsConfig: StepConfig[]) => {
    const [stepState, setStepState] = useState<StepState>({
        currentStep: 0,
        title: stepsConfig[0]?.title ?? "",
        content: stepsConfig[0]?.content ?? null,
    });

    const goToNext = useCallback(() => {
        setStepState((prev) => {
            const next = prev.currentStep + 1;
            if (next >= stepsConfig.length) return prev;
            return {
                currentStep: next,
                title: stepsConfig[next].title,
                content: stepsConfig[next].content,
            };
        });
    }, [stepsConfig]);

    const goToPrev = useCallback(() => {
        setStepState((prev) => {
            const previous = prev.currentStep - 1;
            if (previous < 0) return prev;
            return {
                currentStep: previous,
                title: stepsConfig[previous].title,
                content: stepsConfig[previous].content,
            };
        });
    }, [stepsConfig]);

    const goToStep = useCallback((index: number) => {
        if (index < 0 || index >= stepsConfig.length) return;
        setStepState({
            currentStep: index,
            title: stepsConfig[index].title,
            content: stepsConfig[index].content,
        });
    }, [stepsConfig]);

    const isFirst = stepState.currentStep === 0;
    const isLast = stepState.currentStep === stepsConfig.length - 1;
    const totalSteps = stepsConfig.length;

    return { stepState, goToNext, goToPrev, goToStep, isFirst, isLast, totalSteps };
};