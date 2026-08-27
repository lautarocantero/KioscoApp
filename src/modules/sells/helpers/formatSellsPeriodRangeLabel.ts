import dayjs from "dayjs";
import type { TFunction } from "i18next";
import { SellsPeriodEnum } from "@typings/sells/enums";
import type { SellsPeriodRange } from "@typings/sells/types";

const DATE_FORMAT = "DD/MM";

const COMPARISON_LABEL_KEY: Record<SellsPeriodEnum, string> = {
    [SellsPeriodEnum.Today]: "sells.contextBand.period.comparison.today",
    [SellsPeriodEnum.SevenDays]: "sells.contextBand.period.comparison.sevenDays",
    [SellsPeriodEnum.ThirtyDays]: "sells.contextBand.period.comparison.thirtyDays",
    [SellsPeriodEnum.ThisMonth]: "sells.contextBand.period.comparison.thisMonth",
};

// "25/08 – 31/08 · comparado con la semana anterior" — el texto de la
// comparación depende del período elegido, por eso el mapeo por período.
export const formatSellsPeriodRangeLabel = (period: SellsPeriodEnum, range: SellsPeriodRange, t: TFunction): string => {
    const from = dayjs(range.from).format(DATE_FORMAT);
    const to = dayjs(range.to).format(DATE_FORMAT);
    const comparison = t(COMPARISON_LABEL_KEY[period]);

    return `${from} – ${to} · ${comparison}`;
};
