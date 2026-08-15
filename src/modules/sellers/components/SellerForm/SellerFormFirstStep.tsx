import { useSelector } from "react-redux";
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
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { RootState } from "../../../../store/auth/authSlice";
import type { SellerFormValues } from "@typings/seller/sellerTypes";
import type { ReactNode } from "react";

const SellerFormFirstStep = (): ReactNode => {
    const theme = useTheme();
    const { actionTitle, submitError, stepErrors } = useFormNavigation();
    const isDetail = actionTitle === FormModeComplexEnum.Detail;
    const currentUserRole = useSelector((state: RootState) => state.auth.role);
    const isAdmin = currentUserRole === AuthRoleEnum.Admin;

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
                // El email nunca se edita desde acá (vive en Auth, no hay
                // flujo de self-service todavía). El rol es exclusivo de admin.
                disabledFields={isAdmin ? ["email"] : ["email", "rol"]}
                // El badge explica por qué el select puede estar disabled:
                // en Detalle ya está todo readOnly, no aporta nada ahí.
                renderBeforeField={isDetail ? undefined : { rol: <RoleAdminOnlyBadge /> }}
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