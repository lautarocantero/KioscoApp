import { SellFilterEnum, SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";

export const getSellFilterCounts = (sells: SellTicketType[]): Record<SellFilterEnum, number> => ({
    [SellFilterEnum.All]: sells.length,
    [SellFilterEnum.Completada]: sells.filter((sell) => sell.status === SellStatusEnum.Completada).length,
    [SellFilterEnum.Parcial]: sells.filter((sell) => sell.status === SellStatusEnum.Parcial).length,
});
