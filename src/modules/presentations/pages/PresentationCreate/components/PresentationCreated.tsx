import { useNavigate } from "react-router-dom";
import SuccessCard from "../../../../shared/components/SuccessCard";
import type { VariantCreatedComponentProps } from "@typings/presentation/presentationTypes";


const PresentationCreated = ({ createdVariant, onCreateAnother }: VariantCreatedComponentProps): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <SuccessCard
            name={createdVariant.name}
            title="Presentación creada correctamente"
            subtitle="¿Querés agregar otra presentación para este producto?"
            actions={[
                {
                    label:   "+ Crear otra presentación",
                    variant: "contained",
                    onClick: onCreateAnother,
                },
                {
                    label:   "Crear otro producto",
                    variant: "outlined",
                    onClick: () => navigate("/products/new"),
                },
                {
                    label:   "Ver listado de productos",
                    variant: "outlined",
                    onClick: () => navigate("/products"),
                },
            ]}
        />
    );
};

export default PresentationCreated;