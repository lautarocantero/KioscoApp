import SuccessCard from "../../../../shared/components/SuccessCard";
import type { PresentationCreatedComponentProps } from "@typings/presentation/presentationTypes";


const PresentationCreated = ({ 
    createdPresentation, 
    handleCreateAnotherPresentation,
    handleSeeDetail,
    handleBackToPresentations,
    handleCreateAnotherProduct,
    handleBackToProducts,
}: PresentationCreatedComponentProps): React.ReactNode => {

    return (
        <SuccessCard
            name={createdPresentation.name}
            title="Presentación creada correctamente"
            subtitle="¿Querés agregar otra presentación para este producto?"
            actions={[
                {
                    label:   "Crear otra Presentación",
                    variant: "contained",
                    onClick: handleCreateAnotherPresentation,
                },
                {
                    label:   "Ver detalle de Presentación",
                    variant: "outlined",
                    onClick: handleSeeDetail,
                },
                {
                    label:   "Ver Presentaciónes",
                    variant: "outlined",
                    onClick: handleBackToPresentations,
                },
                {
                    label:   "Crear otro Producto",
                    variant: "outlined",
                    onClick: handleCreateAnotherProduct,
                },
                {
                    label:   "Ver Productos",
                    variant: "outlined",
                    onClick: handleBackToProducts,
                },
            ]}
        />
    );
};

export default PresentationCreated;