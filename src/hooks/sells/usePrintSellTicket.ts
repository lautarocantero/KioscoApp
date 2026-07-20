import type { SellTicketType } from "@typings/sells/sellTypes";
import { createPdfTicket } from "../../modules/shared/helpers/createPdfTicket";
import { useCallback } from "react";

interface UsePrintSellTicketReturn {
    printTicket: (ticket: SellTicketType) => void;
}

export const usePrintSellTicket = (): UsePrintSellTicketReturn => {
    const printTicket = useCallback((ticket: SellTicketType): void => {
        createPdfTicket(ticket);
    }, []);

    return { printTicket };
};