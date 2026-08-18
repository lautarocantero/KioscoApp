import { SellFilterEnum, SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";

export const filterSellsByStatus = (sells: SellTicketType[], filter: SellFilterEnum): SellTicketType[] => {
    if (filter === SellFilterEnum.All) return sells;
    // SellFilterEnum y SellStatusEnum comparten los mismos valores string para
    // "completada"/"parcial" (todo menos "all"), por eso el cast es seguro acá.
    return sells.filter((sell) => sell.status === (filter as unknown as SellStatusEnum));
};
