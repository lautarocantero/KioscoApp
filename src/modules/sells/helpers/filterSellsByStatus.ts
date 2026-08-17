import { SellFilterEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";

export const filterSellsByStatus = (sells: SellTicketType[], filter: SellFilterEnum): SellTicketType[] => {
    if (filter === SellFilterEnum.All) return sells;
    return sells.filter((sell) => sell.status === filter);
};
