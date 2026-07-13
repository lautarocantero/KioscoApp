import { useState, useCallback } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { SelectChangeEvent } from "@mui/material";
import type { UseAnalyticsParams } from "@typings/shared/types/useAnalyticsFormState.types";


const getDefaultStartDate = () => dayjs().subtract(1, "month");
const getDefaultEndDate = () => dayjs();
const DEFAULT_SELLER_ID = "all";

export const useAnalyticsFormState = ({ onApplyFilters }: UseAnalyticsParams) => {
    const [startDate, setStartDateState] = useState<Dayjs | null>(getDefaultStartDate);
    const [endDate, setEndDateState] = useState<Dayjs | null>(getDefaultEndDate);
    const [sellerId, setSellerId] = useState(DEFAULT_SELLER_ID);

    const [isStartDateActive, setIsStartDateActive] = useState(false);
    const [isEndDateActive, setIsEndDateActive] = useState(false);

    const setStartDate = useCallback((newValue: Dayjs | null) => {
        setStartDateState(newValue);
        setIsStartDateActive(true);
    }, []);

    const setEndDate = useCallback((newValue: Dayjs | null) => {
        setEndDateState(newValue);
        setIsEndDateActive(true);
    }, []);

    const handleSellerChange = (e: SelectChangeEvent) => setSellerId(e.target.value);

    const handleApplyFilters = () => {
        onApplyFilters?.({ startDate, endDate, sellerId });
    };

    /** Vuelve todo al estado inicial y re-aplica automáticamente (refetch sin filtros). */
    const handleClearFilters = useCallback(() => {
        const defaultStart = getDefaultStartDate();
        const defaultEnd = getDefaultEndDate();

        setStartDateState(defaultStart);
        setEndDateState(defaultEnd);
        setSellerId(DEFAULT_SELLER_ID);
        setIsStartDateActive(false);
        setIsEndDateActive(false);

        onApplyFilters?.({ startDate: defaultStart, endDate: defaultEnd, sellerId: DEFAULT_SELLER_ID });
    }, [onApplyFilters]);

    /** Hay algún filtro tocado por el usuario, más allá de coincidir o no con el default. */
    const areFiltersActive = isStartDateActive || isEndDateActive || sellerId !== DEFAULT_SELLER_ID;

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sellerId,
        handleSellerChange,
        handleApplyFilters,
        handleClearFilters,
        isStartDateActive,
        isEndDateActive,
        areFiltersActive,
    };
};