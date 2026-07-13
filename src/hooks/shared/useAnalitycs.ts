// useAnalytics.ts
import { useState, useCallback } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { SelectChangeEvent } from "@mui/material";
import type { UseAnalyticsParams } from "@typings/shared/types/useAnalytics.types";


export const useAnalytics = ({ onApplyFilters }: UseAnalyticsParams) => {
    const [startDate, setStartDateState] = useState<Dayjs | null>(dayjs().subtract(1, "month"));
    const [endDate, setEndDateState] = useState<Dayjs | null>(dayjs());
    const [sellerId, setSellerId] = useState("all");

    // Se activan solo cuando el usuario efectivamente interactúa con el picker,
    // sin importar si el valor elegido coincide con el default.
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

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sellerId,
        handleSellerChange,
        handleApplyFilters,
        isStartDateActive,
        isEndDateActive,
    };
};