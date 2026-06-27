import FormCard from "../../../shared/components/FormGrid/FormCard";
import PresentationFormFields from "./PresentationFormFields";
import ImageUpload from "../../../shared/components/FormGrid/ImageUpload";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";

const PresentationFormFirstStep = (): React.ReactNode => {
    const { currentStep, actionTitle } = useFormNavigation(); 

    return (
        <FormCard 
            submitText={actionTitle === "create" ? "Crear" : "Actualizar"} 
            showButtons 
            multiStepHeader={{ stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS, currentStep }}
        >
            <PresentationFormFields />
            <ImageUpload />
        </FormCard>
    );};

export default PresentationFormFirstStep;