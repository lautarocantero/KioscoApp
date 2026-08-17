import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import type { ReactNode } from "react";
import { useFormikContext } from "formik";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import ProductImagePreview from "../../../shared/components/Image/ProductImagePreview";
import { getIdentificationStepConfig, getPresentationStepsLabels } from "./presentationFormStepConfig";


const PresentationFormSecondStep = (): ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { actionTitle, currentStep, submitError, stepErrors } = useFormNavigation();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);
    const { values } = useFormikContext<PresentationFormValues>();
    const { fields: identificationFields, registryOverride } = getIdentificationStepConfig(t);

    return (
        <FormCard
            submitText={isCreate ? t("presentations.form.submit.create") : t("presentations.form.submit.update")}
            showButtons
            header={{ title: headerTitle }}
            submitError={submitError}
            stepErrors={stepErrors}
            multiStepHeader={{
                stepsLabels: getPresentationStepsLabels(t),
                currentStep
            }}
        >
            <FormFieldsRenderer<PresentationFormValues>
                idPrefix="presentation"
                sectionLabel={t("presentations.form.sections.identification")}
                registry={registryOverride}
                fields={identificationFields}
                icons={{
                    sku: { icon: <QrCode2OutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                    barcode: { icon: <QrCodeScannerOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
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