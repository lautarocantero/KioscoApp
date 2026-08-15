import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import { useTheme } from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import { PROVIDER_FIELD_REGISTRY } from "./ProviderFieldRegistry";
import type { ProviderFormValues } from "@typings/provider/providerTypes";
import type { ReactNode } from "react";

const ProviderFormFirstStep = (): ReactNode => {
    const theme = useTheme();
    const { actionTitle, submitError, stepErrors } = useFormNavigation();
    const isDetail = actionTitle === FormModeComplexEnum.Detail;

    return (
        <FormCard
            submitText={actionTitle === FormModeComplexEnum.Create ? "Crear" : "Guardar"}
            showButtons={!isDetail}
            header={{
                title:
                    actionTitle === FormModeComplexEnum.Create ? "Crear proveedor" :
                    actionTitle === FormModeComplexEnum.Edit ? "Editar proveedor" :
                    "Detalle del proveedor",
            }}
            submitError={submitError}
            stepErrors={stepErrors}
            readOnly={isDetail}
            defaultBack="/providers"
        >
            <FormFieldsRenderer<ProviderFormValues>
                idPrefix="provider"
                sectionLabel="Datos del proveedor"
                registry={PROVIDER_FIELD_REGISTRY}
                fields={["name", "valoration", "contact_phone", "contact_email"]}
                readOnly={isDetail}
                icons={{
                    name: { icon: <BusinessOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    valoration: { icon: <StarOutlineOutlinedIcon fontSize="small" />, color: theme.custom.accents.gold },
                    contact_phone: { icon: <PhoneOutlinedIcon fontSize="small" />, color: theme.custom.accents.blue },
                    contact_email: { icon: <EmailOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                }}
            />
        </FormCard>
    );
};

export default ProviderFormFirstStep;
