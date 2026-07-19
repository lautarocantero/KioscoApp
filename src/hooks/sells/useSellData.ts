import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSellByIdThunk } from "../../store/sell/sellsThunks";
import type { SellTicketType, UseSellDataResult } from "@typings/sells/sellTypes";
import type { AppDispatch } from "store/sell/sellSlice";

export const useSellData = (sellId?: string): UseSellDataResult => {
    const dispatch = useDispatch<AppDispatch>();
    const [sellData, setSellData] = useState<SellTicketType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sellId) {
            setIsLoading(false);
            setError("No se especificó un id de venta");
            return;
        }

        setIsLoading(true);
        dispatch(getSellByIdThunk({ _id: sellId }))
            .then((sell) => {
                if (sell) setSellData(sell as unknown as SellTicketType);
                else setError("No se encontró la venta");
            })
            .catch(() => setError("Error al cargar la venta"))
            .finally(() => setIsLoading(false));
    }, [sellId, dispatch]);

    return { sellData, isLoading, error };
};