import { Grid, useTheme } from "@mui/material";
import PresentationDetailHeaderSection from "./PresentationDetailHeaderSection";
import PresentationDetailField from "./PresentationDetailField";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { BadgeColorEnum } from "@typings/ui/uiEnums";
import type { GroupCommercialInfoProps } from "@typings/presentation/presentationComponentTypes";
import { formatPriceValue, getPriceLabel } from "../../../shared/helpers/saleTypeHelper";


const GroupCommercialInfo = ({
    price,
    expirationDate,
    isNotExpired,
    saleType,
}: GroupCommercialInfoProps): React.ReactNode => {
    const theme = useTheme();

    const priceLabel = getPriceLabel(saleType);
    const priceValue = formatPriceValue(price as number, saleType);

    return (
        <NoisyCard sx={{ p: 2.5 }}>
            <PresentationDetailHeaderSection
                icon={<LocalOfferOutlinedIcon fontSize="small" />}
                title="Información comercial"
                color={theme.custom.accents.violet}
            />
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <PresentationDetailField
                        icon={<AttachMoneyOutlinedIcon fontSize="small" />}
                        iconColor={theme.custom.accents.violet}
                        label={priceLabel}
                        value={priceValue}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <PresentationDetailField
                        icon={<CalendarMonthOutlinedIcon fontSize="small" />}
                        iconColor={theme.custom.accents.violet}
                        label="Fecha de vencimiento"
                        value={expirationDate ? new Date(expirationDate).toLocaleDateString("en-US") : "-"}
                        badge={{
                            label: isNotExpired ? "Vigente" : "Vencido",
                            color: isNotExpired ? BadgeColorEnum.Success : BadgeColorEnum.Error,
                        }}
                    />
                </Grid>
            </Grid>
        </NoisyCard>
    );
};

export default GroupCommercialInfo;