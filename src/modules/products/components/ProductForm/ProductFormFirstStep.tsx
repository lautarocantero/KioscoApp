import ProductFormFields from "./ProductFormFields";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../../modules/shared/components/FormGrid/FormCard";

const ProductFormFirstStep = (): React.ReactNode => {
    const { actionTitle } = useFormNavigation();
    const isEdit = actionTitle === "edit";

    return (
        <FormCard
            submitText={isEdit ? "Guardar" : "Crear"}
            showButtons
        >
            <ProductFormFields mode={isEdit ? "edit" : "create"} />
        </FormCard>
    );
};

export default ProductFormFirstStep;
