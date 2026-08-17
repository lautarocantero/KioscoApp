import { SellFilterEnum } from "@typings/sells/sellsEnum";

export const SELL_FILTER_OPTIONS: SellFilterEnum[] = [
    SellFilterEnum.All,
    SellFilterEnum.Completada,
    SellFilterEnum.Parcial,
];

export const SELL_FILTER_LABELS: Record<SellFilterEnum, string> = {
    [SellFilterEnum.All]: "Todas",
    [SellFilterEnum.Completada]: "Completada",
    [SellFilterEnum.Parcial]: "Parcial",
};
