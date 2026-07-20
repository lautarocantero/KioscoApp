import type { UseFormNavButtonsParams } from "@typings/ui/buttons.types";
import { FormNavigationContext } from "../../modules/shared/context/FormNavigationContext";
import { useContext } from "react";
import { useBackPath } from "./useBackPath";


export const useFormNavButtons = ({ defaultBack, readOnly }: UseFormNavButtonsParams) => {
    const context = useContext(FormNavigationContext);
    const goBack = useBackPath(defaultBack);

    const currentStep = context?.currentStep ?? 0;
    const totalSteps  = context?.totalSteps  ?? 1;
    const isFirstStep = currentStep === 0;
    const isLastStep  = currentStep === totalSteps - 1;

    const handleNext = () => {
        if (!context?.validateForm) return;
        if (isLastStep) { context.onNext(context.validateForm, context.onSubmit); return; }
        context.onNext(context.validateForm);
    };

    const handleBack = () => {
        if (isFirstStep || readOnly) { goBack(); return; }
        context?.onPrev();
    };

    return { isFirstStep, isLastStep, handleNext, handleBack };
};