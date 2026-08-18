import { useTheme } from "@mui/material";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import type { ReactNode } from "react";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../shared/components/FormCard/FormCard";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import { JOIN_KIOSCO_FIELD_REGISTRY } from "./JoinKioscoFieldRegistry";
import type { JoinKioscoFormValues } from "@typings/kiosco/kioscoTypes";

const JoinKioscoFormFirstStep = (): ReactNode => {
    const theme = useTheme();
    const { submitError, stepErrors, isSubmitting } = useFormNavigation();

    return (
        <FormCard
            submitText={isSubmitting ? "Uniendo..." : "Unirme"}
            showButtons
            header={{
                title: "Unirme a un kiosco",
                subtitle: "Ingresá el código de invitación que te compartieron.",
            }}
            submitError={submitError}
            stepErrors={stepErrors}
            defaultBack="/select-kiosco"
            maxWidth={480}
        >
            <FormFieldsRenderer<JoinKioscoFormValues>
                idPrefix="join-kiosco"
                sectionLabel="Código de invitación"
                registry={JOIN_KIOSCO_FIELD_REGISTRY}
                fields={["invite_code"]}
                icons={{
                    invite_code: { icon: <ConfirmationNumberOutlinedIcon fontSize="small" />, color: theme.custom.accents.blue },
                }}
            />
        </FormCard>
    );
};

export default JoinKioscoFormFirstStep;
