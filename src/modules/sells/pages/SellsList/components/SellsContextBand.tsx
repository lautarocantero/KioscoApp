import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { SellsContextBandProps } from "@typings/sells/props";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";
import SellsPeriodSelector from "./SellsPeriodSelector";
import SellsKpiGrid from "./SellsKpiGrid";
import SellsSparkline from "./SellsSparkline";
import SellsFactsStrip from "./SellsFactsStrip";
import SellsPartialsAlertBar from "./SellsPartialsAlertBar";
import SellsContextBandSkeleton from "./SellsContextBandSkeleton";

// Todos los condicionales de acá son de renderizado (loading/error/vacío),
// ya resueltos como boolean/string por useSellsContextBand — permitido por
// la excepción de la regla 5. Si falla el fetch de useSellsListData, toda
// la banda se reemplaza por el alert y la tabla sigue funcionando sola.
const SellsContextBand = ({
    period,
    periodOptions,
    periodAvailability,
    onPeriodChange,
    rangeLabel,
    kpis,
    sparkline,
    sparklineBestDay,
    facts,
    partialsAlert,
    hasSellsInPeriod,
    loading,
    error,
    onViewPartials,
}: SellsContextBandProps): React.ReactNode => {
    const { t } = useTranslation();

    if (loading) return <SellsContextBandSkeleton />;

    if (error) {
        return (
            <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark })}>
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <SellsPeriodSelector
                ariaLabel={t("sells.contextBand.period.ariaLabel")}
                period={period}
                options={periodOptions}
                availability={periodAvailability}
                onChange={onPeriodChange}
                rangeLabel={rangeLabel}
            />

            <NoisyCard sx={{ padding: "20px 24px" }}>
                <Box sx={{ display: "flex", gap: 3, alignItems: "stretch", flexWrap: { xs: "wrap", md: "nowrap" } }}>
                    <SellsKpiGrid kpis={kpis} partialsAlert={partialsAlert} hasSellsInPeriod={hasSellsInPeriod} />
                    <SellsSparkline
                        points={sparkline}
                        bestDay={sparklineBestDay}
                        ariaLabel={t("sells.contextBand.sparkline.ariaLabel", { best: sparklineBestDay?.label ?? "" })}
                    />
                </Box>

                <SellsFactsStrip facts={facts} />

                {!hasSellsInPeriod && (
                    <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mt: 1.5 })}>
                        {t("sells.contextBand.empty")}
                    </Typography>
                )}
            </NoisyCard>

            {hasSellsInPeriod && <SellsPartialsAlertBar alert={partialsAlert} onViewPartials={onViewPartials} />}
        </Box>
    );
};

export default SellsContextBand;
