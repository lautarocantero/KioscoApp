import PresentationFormCard from "../PresentationFormCard";
import PresentationFormFields from "./PresentationFormFields";
import PresentationImageUpload from "./PresentationImageUpload";
import { useFormNavigation } from "../../../../shared/context/FormNavigationContext";

const PresentationFormFirstStep = (): React.ReactNode => {
    const { currentStep, actionTitle } = useFormNavigation(); 

    return (
        <PresentationFormCard 
            submitText={actionTitle === "create" ? "Crear" : "Actualizar"} 
            showButtons 
            currentStep={currentStep}
        >
            <PresentationFormFields />
            <PresentationImageUpload />
        </PresentationFormCard>
    );};

export default PresentationFormFirstStep;