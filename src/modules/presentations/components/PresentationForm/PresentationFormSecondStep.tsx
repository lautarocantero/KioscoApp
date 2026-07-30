import { useTheme } from "@mui/material";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import type { ReactNode } from "react";
import { useFormikContext } from "formik";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import ProductImagePreview from "../../../shared/components/Image/ProductImagePreview";
import { getCatalogStepConfig } from "./presentationFormStepConfig";


const PresentationFormSecondStep = (): ReactNode => {
    const theme = useTheme();
    const { actionTitle, currentStep, submitError, stepErrors } = useFormNavigation();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);
    const { values } = useFormikContext<PresentationFormValues>();
    const { fields: catalogFields, registryOverride } = getCatalogStepConfig(values);

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
        >
            <FormFieldsRenderer<PresentationFormValues>
                idPrefix="presentation"
                sectionLabel="Datos de catálogo de la presentación"
                registry={registryOverride}
                fields={catalogFields}
                icons={{
                    sku: { icon: <QrCode2OutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    barcode: { icon: <QrCodeScannerOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    model_type: { icon: <CategoryOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    model_size: { icon: <StraightenOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                    image_url: { icon: <LinkOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                }}
                renderAfterField={
                    values.image_url ? { image_url: <ProductImagePreview imageUrl={values.image_url} /> } : undefined
                }
            />
        </FormCard>
    );
};

export default PresentationFormSecondStep;