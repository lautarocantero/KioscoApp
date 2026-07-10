{/*─────────────────── 🔎 UseFormSteps 🔎 ───────────────────*/}

export interface FormStepsInterface {
  steps: number;
  currentStep: number;
};

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
    isSubmitting: boolean;
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

export interface ActualStepComponentProps {
    currentStep: number;
    stepComponents: React.ComponentType[];
}

export interface FormHeaderProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    isMultiStep?: boolean;
    stepsLabels?: string[];
    currentStep?: number;
}

export interface FormHeaderComponentProps {
    stepsLabels: string[];
    currentStep: number;
}


export interface FormFooterProps {
    stepErrors?: string[];
    submitError?: string | null;
}