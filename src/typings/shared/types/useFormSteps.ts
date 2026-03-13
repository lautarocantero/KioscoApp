
{/*─────────────────── 🔎 UseFormSteps 🔎 ───────────────────*/}

export interface StepConfig {
    title: string;
    content: React.ReactNode;
}


export interface StepState {
    currentStep: number;
    title: string;
    content: React.ReactNode;
}

export interface FormGridProps {
    formSteps: UseFormStepsReturn;
    prevLink?: string;
    validateStep: (step: number) => Promise<boolean>;
}

export interface UseFormStepsReturn {
    stepState: StepState;
    goToNext: () => void;
    goToPrev: () => void;
    goToStep: (index: number) => void;
    isFirst: boolean;
    isLast: boolean;
    totalSteps: number;
}
