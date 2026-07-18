import SuccessCard from "../../../../shared/components/SuccessCard";
import type { PresentationEditedProps } from "@typings/presentation/presentationComponentTypes";
import type { ReactNode } from "react";


const PresentationEdited = ({ updatedVariant, handleSeeDetail, handleBackToPresentations, handleBackToProducts }: PresentationEditedProps): ReactNode => {
    

    return (
        <SuccessCard
            name={updatedVariant.name}
            title="Presentación actualizada correctamente"
            subtitle="Los cambios fueron guardados. Podés seguir editando o volver al listado."
            actions={[
                {
                    label:   "Ver detalle de Presentación",
                    variant: "contained",
                    onClick: handleSeeDetail,
                },
                {
                    label:   "Ver Presentaciónes",
                    variant: "outlined",
                    onClick: handleBackToPresentations,
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

export default PresentationEdited;