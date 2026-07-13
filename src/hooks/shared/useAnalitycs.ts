import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { SelectChangeEvent } from "@mui/material";
import type { UseAnalyticsParams } from "@typings/shared/types/useAnalytics.types";


export const useAnalytics = ({ onApplyFilters }: UseAnalyticsParams) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    const [sellerId, setSellerId] = useState("all");

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
    };
};