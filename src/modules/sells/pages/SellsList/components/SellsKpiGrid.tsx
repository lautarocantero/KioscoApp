import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { SellsKpiGridProps } from "@typings/sells/props";
import { formatCurrency } from "../../../../cart/helpers/formatCurrency";
import { formatSellsKpiVariation } from "../../../helpers/formatSellsKpiVariation";
import SellsKpiTile from "./SellsKpiTile";

const EMPTY_VALUE = "—";

const SellsKpiGrid = ({ kpis, partialsAlert, hasSellsInPeriod }: SellsKpiGridProps): React.ReactNode => {
    const { t } = useTranslation();
    const theme = useTheme();

    const sales = formatSellsKpiVariation(kpis.sales);
    const ticketsCount = formatSellsKpiVariation(kpis.ticketsCount);
    const averageTicket = formatSellsKpiVariation(kpis.averageTicket);

    return (
        <Box sx={{ flex: 1, minWidth: 0, display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" } }}>
            <SellsKpiTile
                bordered={false}
                label={t("sells.contextBand.kpis.sales.label")}
                value={hasSellsInPeriod ? formatCurrency(kpis.sales.value) : EMPTY_VALUE}
                chipLabel={hasSellsInPeriod ? sales.label : EMPTY_VALUE}
                chipTone={sales.tone}
                subLabel={hasSellsInPeriod ? formatCurrency(kpis.sales.previousValue) : undefined}
            />
            <SellsKpiTile
                label={t("sells.contextBand.kpis.ticketsCount.label")}
                value={hasSellsInPeriod ? String(kpis.ticketsCount.value) : EMPTY_VALUE}
                chipLabel={hasSellsInPeriod ? ticketsCount.label : EMPTY_VALUE}
                chipTone={ticketsCount.tone}
                subLabel={
                    hasSellsInPeriod
                        ? t("sells.contextBand.kpis.ticketsCount.subLabel", { count: Math.round(kpis.ticketsPerDay) })
                        : undefined
                }
            />
            <SellsKpiTile
                label={t("sells.contextBand.kpis.averageTicket.label")}
                value={hasSellsInPeriod ? formatCurrency(kpis.averageTicket.value) : EMPTY_VALUE}
                chipLabel={hasSellsInPeriod ? averageTicket.label : EMPTY_VALUE}
                chipTone={averageTicket.tone}
                subLabel={
                    hasSellsInPeriod
                        ? t("sells.contextBand.kpis.averageTicket.subLabel", {
                              count: kpis.productsPerTicket.toLocaleString("es-AR", { maximumFractionDigits: 1 }),
                          })
                        : undefined
                }
            />
            <SellsKpiTile
                label={t("sells.contextBand.kpis.toCollect.label")}
                value={formatCurrency(partialsAlert.totalAmount)}
                chipLabel={t("sells.contextBand.kpis.toCollect.chip", { count: partialsAlert.count })}
                chipTone="attention"
                accentColor={theme.custom.accents.gold}
            />
        </Box>
    );
};

export default SellsKpiGrid;
