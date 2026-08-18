import { useTheme } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import type { ReactNode } from "react";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../shared/components/FormCard/FormCard";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import { KIOSCO_FIELD_REGISTRY } from "./KioscoFieldRegistry";
import type { CreateKioscoFormValues } from "@typings/kiosco/kioscoTypes";

const CreateKioscoFormFirstStep = (): ReactNode => {
    const theme = useTheme();
    const { submitError, stepErrors, isSubmitting } = useFormNavigation();

    return (
        <FormCard
            submitText={isSubmitting ? "Creando..." : "Crear kiosco"}
            showButtons
            header={{
                title: "Crear un kiosco nuevo",
                subtitle: "Vas a ser el administrador de este kiosco.",
            }}
            submitError={submitError}
            stepErrors={stepErrors}
            defaultBack="/select-kiosco"
            maxWidth={480}
        >
            <FormFieldsRenderer<CreateKioscoFormValues>
                idPrefix="create-kiosco"
                sectionLabel="Datos del kiosco"
                registry={KIOSCO_FIELD_REGISTRY}
                fields={["name", "address"]}
                icons={{
                    name: { icon: <StorefrontOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    address: { icon: <PlaceOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                }}
            />
        </FormCard>
    );
};

export default CreateKioscoFormFirstStep;
