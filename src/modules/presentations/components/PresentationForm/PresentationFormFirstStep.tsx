import FormCard from "../../../shared/components/FormCard/FormCard";
import PresentationFormFields from "./PresentationFormFields";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { useParams } from "react-router-dom";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import { useTheme } from "@mui/material";

const PresentationFormFirstStep = (): React.ReactNode => {
    const theme = useTheme();
    const { currentStep, actionTitle } = useFormNavigation(); 
    const { product_id } = useParams<{ product_id: string }>();

    return (
        <FormCard 
            submitText={actionTitle === FormModeComplexEnum.Create ? "Crear" : "Actualizar"} 
            showButtons 
            header={{ title: actionTitle === FormModeComplexEnum.Create ? "Crear presentación" : "Editar presentación" }}
            multiStepHeader={{ stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS, currentStep }}
            accordion={{
                title: "¿Qué son las presentaciones?",
                content:
                    "Son las distintas formas en las que se vende un mismo producto: cambia el envase, tamaño o variante, pero es el mismo producto. Por ejemplo, Coca-Cola es un solo producto que puede venir en lata, botella, versión light o retornable.",
                bannerImage: {
                    src: "/images/productExample/presentations.jpg",
                    alt: "Producto y presentaciones",
                },
            }}
            backPath={`/products/${product_id}/presentations`}
        >
            <PresentationFormFields
                icons={{
                    sku: { icon: <QrCode2OutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    model_type: { icon: <CategoryOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    model_size: { icon: <StraightenOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                }}
            />
        </FormCard>
    );};

export default PresentationFormFirstStep;