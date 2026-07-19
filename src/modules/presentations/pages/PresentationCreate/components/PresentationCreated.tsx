import SuccessCard from "../../../../shared/components/SuccessCard";
import type { PresentationCreatedProps } from "@typings/presentation/presentationComponentTypes";
import type { ReactNode } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


const PresentationCreated = ({ 
        createdPresentation, 
        handleSeeDetail, 
        handleBackToPresentations, 
        handleBackToProducts 
    }: PresentationCreatedProps): ReactNode => {
    

    return (
        <SuccessCard
            name={createdPresentation.name}
            title="Presentación actualizada correctamente"
            subtitle="Los cambios fueron guardados. Podés seguir editando o volver al listado."
            actions={[
                {
                    label:   "Ver detalle de Presentación",
                    variant: "contained",
                    onClick: handleSeeDetail,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   "Ver Presentaciónes",
                    variant: "outlined",
                    onClick: handleBackToPresentations,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   "Ver Productos",
                    variant: "outlined",
                    onClick: handleBackToProducts,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
            ]}
        />
    );
};

export default PresentationCreated;