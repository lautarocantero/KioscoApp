import { useNavigate, useParams } from "react-router-dom";
import SuccessCard from "../../../../shared/components/SuccessCard";
import type { UpdatedPresentationInterface } from "@typings/presentation/presentationTypes";

interface Props { updatedVariant: UpdatedPresentationInterface; }

const PresentationUpdated = ({ updatedVariant }: Props): React.ReactNode => {
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();

    return (
        <SuccessCard
            name={updatedVariant.name}
            title="Presentación actualizada correctamente"
            subtitle="Los cambios fueron guardados. Podés seguir editando o volver al listado."
            actions={[
                {
                    label:   "Ver detalle",
                    variant: "contained",
                    onClick: () => navigate(`/products/${productId}/presentations/${updatedVariant._id}`),
                },
                {
                    label:   "Ver presentaciones del producto",
                    variant: "outlined",
                    onClick: () => navigate(`/products/${productId}/presentations`),
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

export default PresentationUpdated;