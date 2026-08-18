import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../../modules/shared/components/FormCard/FormCard";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import { getSellFieldRegistry } from "./SellFieldRegistry";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import type { SellEditFormValues } from "@typings/sells/sellTypes";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";

const SellFormFirstStep = (): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { actionTitle, submitError, stepErrors } = useFormNavigation();
    const isDetail = actionTitle === FormModeComplexEnum.Detail;
    const registry = getSellFieldRegistry(t);

    return (
        <FormCard
            submitText={t("sells.form.submit")}
            showButtons={!isDetail}
            header={{
                title: actionTitle === FormModeComplexEnum.Edit ? t("sells.form.header.edit") : t("sells.form.header.detail"),
            }}
            submitError={submitError}
            stepErrors={stepErrors}
            readOnly={isDetail}
            defaultBack={`/sells`}
        >
            <FormFieldsRenderer<SellEditFormValues>
                idPrefix="sell"
                sectionLabel={t("sells.form.sectionLabel")}
                registry={registry}
                fields={["purchase_date", "seller_name", "payment_method", "sub_total", "iva", "total_amount", "currency"]}
                readOnly={isDetail}
                icons={{
                    purchase_date:  { icon: <EventOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    seller_name:    { icon: <PersonOutlineOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    payment_method: { icon: <PaymentsOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                    sub_total:      { icon: <CalculateOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    iva:            { icon: <PercentOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    total_amount:   { icon: <PaidOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                    currency:       { icon: <CurrencyExchangeOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                }}
            />
        </FormCard>
    );
};

export default SellFormFirstStep;