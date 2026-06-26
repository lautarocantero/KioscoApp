import ProductFormCard from "./ProductFormCard";
import ProductFormFields from "./ProductFormFields";
import { useFormNavigation } from "../../../../modules/products/context/FormNavigationContext";

const ProductFormFirstStep = (): React.ReactNode => {
    const { actionTitle } = useFormNavigation();
    const isEdit = actionTitle === "edit";

    return (
        <ProductFormCard
            submitText={isEdit ? "Guardar" : "Crear"}
            showButtons
        >
            <ProductFormFields mode={isEdit ? "edit" : "create"} />
        </ProductFormCard>
    );
};

export default ProductFormFirstStep;
