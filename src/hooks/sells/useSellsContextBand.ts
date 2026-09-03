import { useMemo, useState } from "react";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { SellsPeriodEnum } from "@typings/sells/enums";
import type { UseSellsContextBandReturn } from "@typings/sells/types";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import { useMembershipStatus } from "../membership/useMembershipStatus";
import { buildSellsPeriodRange } from "../../modules/sells/helpers/buildSellsPeriodRange";
import { filterSellsByPeriodRange } from "../../modules/sells/helpers/filterSellsByPeriodRange";
import { aggregateSellsPeriodKpis } from "../../modules/sells/helpers/aggregateSellsPeriodKpis";
import { aggregateSellsByDay } from "../../modules/shop/helpers/aggregateSellsByDay";
import { aggregateSellsDominantPaymentMethod } from "../../modules/sells/helpers/aggregateSellsDominantPaymentMethod";
import { aggregateSellsPeakHour } from "../../modules/sells/helpers/aggregateSellsPeakHour";
import { aggregateSellsTopSeller } from "../../modules/sells/helpers/aggregateSellsTopSeller";
import { aggregateSellsPartialsAlert } from "../../modules/sells/helpers/aggregateSellsPartialsAlert";
import { getSellsPeriodOptionAvailability } from "../../modules/sells/helpers/getSellsPeriodOptionAvailability";

const SPARKLINE_DAYS = 14;

// Agrega, 100% client-side, los datos de la banda de contexto de /sells
// sobre las ventas ya traídas por useSellsListData (misma fuente que usa
// useShopSalesSummary) — no dispara fetch propio, por eso no expone su
// propio loading/error (esos ya los maneja useSellsListData sobre `sells`).
//
// El plan de la cuenta se lee con useMembershipStatus (misma fuente que
// gatea el reporte mensual); mientras carga se asume el caso más
// restrictivo (Standard) para no mostrar por un instante opciones de
// período que un segundo después se deshabilitan.
//
// Cambiar el período es exclusivo de admin (mismo criterio que
// dashboard.changeRange en rolesPermissionsMatrix): setPeriod queda
// como no-op para no-admins como segunda barrera, además del control
// deshabilitado en la UI.
export const useSellsContextBand = (sells: SellTicketType[], isAdmin: boolean): UseSellsContextBandReturn => {
    const [period, setPeriod] = useState<SellsPeriodEnum>(SellsPeriodEnum.SevenDays);
    const { status: membershipStatus } = useMembershipStatus();
    const isDeluxe = membershipStatus?.plan === KioscoPlanEnum.Deluxe;

    const now = useMemo(() => new Date(), []);

    const periodRange = useMemo(() => buildSellsPeriodRange(period, now), [period, now]);
    const periodAvailability = useMemo(
        () => getSellsPeriodOptionAvailability({ isAdmin, isDeluxe, now }),
        [isAdmin, isDeluxe, now]
    );

    const kpis = useMemo(() => aggregateSellsPeriodKpis(sells, periodRange), [sells, periodRange]);

    const sparkline = useMemo(() => aggregateSellsByDay(sells, SPARKLINE_DAYS), [sells]);
    const sparklineBestDay = useMemo(
        () => sparkline.reduce<(typeof sparkline)[number] | null>(
            (best, point) => (!best || point.total > best.total ? point : best),
            null
        ),
        [sparkline]
    );

    const currentPeriodSells = useMemo(
        () => filterSellsByPeriodRange(sells, periodRange.from, periodRange.to),
        [sells, periodRange]
    );

    const facts = useMemo(
        () => ({
            dominantPaymentMethod: aggregateSellsDominantPaymentMethod(currentPeriodSells),
            peakHour: aggregateSellsPeakHour(currentPeriodSells),
            topSeller: aggregateSellsTopSeller(currentPeriodSells),
        }),
        [currentPeriodSells]
    );

    const partialsAlert = useMemo(() => aggregateSellsPartialsAlert(sells, now), [sells, now]);

    return {
        period,
        setPeriod: isAdmin ? setPeriod : () => {},
        periodAvailability,
        periodRange,
        kpis,
        sparkline,
        sparklineBestDay,
        facts,
        partialsAlert,
        hasSellsInPeriod: currentPeriodSells.length > 0,
    };
};
