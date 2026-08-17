import { FormHelperText, Grid, Skeleton, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import type { ReactNode } from "react";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FieldWithIcon from "../../../shared/components/FormCard/FieldWithIcon";
import FormSelector from "../../../shared/components/FormSelector/FormSelector";
import { useFormikFormSelectorMulti } from "../../../shared/components/FormSelector/useFormikFormSelector";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import { usePresentationProvidersField } from "../../../../hooks/presentations/usePresentationProvidersField";
import { getPresentationStepsLabels } from "./presentationFormStepConfig";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";


const PresentationFormProvidersStep = (): ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { actionTitle, currentStep, submitError, stepErrors } = useFormNavigation();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);
    const { value: selectedProviders, onChange } = useFormikFormSelectorMulti<PresentationFormValues, string>("providers");
    const { providerOptions, loading, getProviderLabel } = usePresentationProvidersField();

    return (
        <FormCard
            submitText={isCreate ? t("presentations.form.submit.create") : t("presentations.form.submit.update")}
            showButtons
            header={{ title: headerTitle }}
            submitError={submitError}
            stepErrors={stepErrors}
            multiStepHeader={{
                stepsLabels: getPresentationStepsLabels(t),
                currentStep,
            }}
        >
            <Grid component="section" aria-label={t("presentations.form.sections.providers")} container spacing={2.5} display="flex" flexDirection="column">
                <Grid spacing={{ xs: 12, sm: 12 }}>
                    <FieldWithIcon
                        iconConfig={{
                            icon: <LocalShippingOutlinedIcon fontSize="small" />,
                            color: theme.custom.accents.gold,
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="rounded" height={56} />
                        ) : (
                            <FormSelector<string>
                                mode="multi"
                                id="presentation-providers"
                                label={t("presentations.form.fields.providers.label")}
                                categories={providerOptions}
                                getLabel={getProviderLabel}
                                value={selectedProviders}
                                onChange={onChange}
                                emptyOptionsLabel={t("presentations.form.fields.providers.emptyOptions")}
                            />
                        )}
                        <FormHelperText>{t("presentations.form.fields.providers.helperTextWhenEmpty")}</FormHelperText>
                    </FieldWithIcon>
                </Grid>
            </Grid>
        </FormCard>
    );
};

export default PresentationFormProvidersStep;
