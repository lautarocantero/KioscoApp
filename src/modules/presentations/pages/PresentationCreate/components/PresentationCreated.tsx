import { useNavigate } from "react-router-dom";
import SuccessCard from "../../../../shared/components/SuccessCard";
import type { VariantCreatedComponentProps } from "@typings/presentation/presentationTypes";

const PresentationCreated = ({ createdVariant, onCreateAnother }: VariantCreatedComponentProps): React.ReactNode => {
    const navigate = useNavigate();

    // to do hacer un componente generico + light mode

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
                // to do, poner opcion para volver al listado de presentaciones
            ]}
        />
    );
};

export default PresentationCreated;