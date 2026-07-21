import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import type { ReactNode } from "react";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import { PRESENTATION_FIELD_REGISTRY } from "./PresentationFieldRegistry";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";


const PresentationFormFirstStep = (): ReactNode => {
    const theme = useTheme();
    const { actionTitle , currentStep, submitError, stepErrors  } = useFormNavigation(); 
    const { product_id } = useParams<{ product_id: string }>();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);

    return (
        <FormCard 
            submitText={isCreate ? "Crear" : "Actualizar"} 
            showButtons 
            header={{ title: headerTitle }}
            submitError={submitError}
            stepErrors={stepErrors}
            multiStepHeader={{ 
                stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS, 
                currentStep 
            }}
            accordion={{
                title: "¿Qué son las presentaciones?",
                content:
                    "Son las distintas formas en las que se vende un mismo producto: cambia el envase, tamaño o variante, pero es el mismo producto. Por ejemplo, Coca-Cola es un solo producto que puede venir en lata, botella, versión light o retornable.",
                bannerImage: {
                    src: "/images/productExample/presentations.jpg",
                    alt: "Producto y presentaciones",
                },
            }}
            defaultBack={`/products/${product_id}/presentations`}
        >
            <FormFieldsRenderer<PresentationFormValues>
                idPrefix="presentation"
                sectionLabel="Identidad de la presentación"
                registry={PRESENTATION_FIELD_REGISTRY}
                fields={["name", "description"]}
                icons={{
                    name: { icon: <BookmarkBorderOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    description: { icon: <DescriptionOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                }}
            />
        </FormCard>
    );};

export default PresentationFormFirstStep;