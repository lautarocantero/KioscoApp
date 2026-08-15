import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import { useTheme } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import { SELLER_FIELD_REGISTRY } from "./SellerFieldRegistry";
import RoleAdminOnlyBadge from "./RoleAdminOnlyBadge";
import { useSellerFormPermissions } from "../../../../hooks/sellers/useSellerFormPermissions";
import type { SellerFormValues } from "@typings/seller/sellerTypes";
import type { ReactNode } from "react";

const SellerFormFirstStep = (): ReactNode => {
    const theme = useTheme();
    const { actionTitle, submitError, stepErrors } = useFormNavigation();
    const isDetail = actionTitle === FormModeComplexEnum.Detail;
    const { disabledFields, showRoleBadge } = useSellerFormPermissions(isDetail);

    return (
        <FormCard
            submitText="Guardar"
            showButtons={!isDetail}
            header={{
                title:
                    actionTitle === FormModeComplexEnum.Edit ? "Editar vendedor" :
                    "Detalle del vendedor",
            }}
            submitError={submitError}
            stepErrors={stepErrors}
            readOnly={isDetail}
            defaultBack={`/sellers`}
        >
            <FormFieldsRenderer<SellerFormValues>
                idPrefix="seller"
                sectionLabel="Datos del vendedor"
                registry={SELLER_FIELD_REGISTRY}
                fields={["name", "email", "rol"]}
                readOnly={isDetail}
                disabledFields={disabledFields}
                renderBeforeField={showRoleBadge ? { rol: <RoleAdminOnlyBadge /> } : undefined}
                icons={{
                    name: { icon: <PersonOutlineOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    email: { icon: <EmailOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    rol: { icon: <BadgeOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                }}
            />
        </FormCard>
    );
};

export default SellerFormFirstStep;