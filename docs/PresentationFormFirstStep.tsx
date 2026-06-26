import FormCard from "../../../../shared/components/FormGrid/FormCard";
import PresentationFormFields from "./PresentationFormFields";
import PresentationImageUpload from "./PresentationImageUpload";
import { useFormNavigation } from "../../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "config/constants";

const PresentationFormFirstStep = (): React.ReactNode => {
    const { currentStep, actionTitle } = useFormNavigation(); 

    return (
        <FormCard 
            submitText={actionTitle === "create" ? "Crear" : "Actualizar"} 
            showButtons 
            multiStepHeader={{ stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS, currentStep }}
        >
            <PresentationFormFields />
            <PresentationImageUpload />
        </FormCard>
    );};

export default PresentationFormFirstStep;