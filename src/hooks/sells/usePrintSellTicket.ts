import type { SellTicketType, UsePrintSellTicketReturn } from "@typings/sells/sellTypes";
import { createPdfTicket } from "../../modules/shared/helpers/createPdfTicket";
import { useCallback } from "react";


export const usePrintSellTicket = (): UsePrintSellTicketReturn => {
    const printTicket = useCallback((ticket: SellTicketType): void => {
        createPdfTicket(ticket);
    }, []);

    return { printTicket };
};