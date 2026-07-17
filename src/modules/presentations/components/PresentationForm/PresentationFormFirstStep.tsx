import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import type { ReactNode } from "react";
import { useFormikContext } from "formik";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import FormFieldsRenderer from "modules/shared/components/FormCard/FormFieldsRenderer";
import { PRESENTATION_FIELD_REGISTRY } from "./PresentationFieldRegistry";
import ProductImagePreview from "modules/shared/components/Image/ProductImagePreview";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";


const PresentationFormFirstStep = (): ReactNode => {
    const theme = useTheme();
    const { actionTitle , currentStep, submitError, stepErrors  } = useFormNavigation(); 
    const { product_id } = useParams<{ product_id: string }>();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);
    const { values } = useFormikContext<PresentationFormValues>();

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
            backPath={`/products/${product_id}/presentations`}
        >
            <FormFieldsRenderer<PresentationFormValues>
                idPrefix="presentation"
                sectionLabel="Datos generales de la presentación"
                registry={PRESENTATION_FIELD_REGISTRY}
                fields={["name", "description", "sku", "model_type", "model_size", "image_url"]}
                icons={{
                    name: { icon: <BookmarkBorderOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    description: { icon: <DescriptionOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    sku: { icon: <QrCode2OutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    model_type: { icon: <CategoryOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    model_size: { icon: <StraightenOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                    image_url: { icon: <LinkOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                }}
                renderAfterField={
                    values.image_url ? { image_url: <ProductImagePreview imageUrl={values.image_url} /> } : undefined
                }
            />
        </FormCard>
    );};

export default PresentationFormFirstStep;