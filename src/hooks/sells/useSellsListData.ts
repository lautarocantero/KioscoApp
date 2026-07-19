import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/sell/sellSlice";
import { getSellsThunk, searchSellsThunk } from "../../store/sell/sellsThunks";
import type { UseSellsListDataResult } from "@typings/sells/sellTypes";

export const useSellsListData = (): UseSellsListDataResult => {
    const dispatch = useDispatch<AppDispatch>();

    const sells = useSelector((state: RootState) => state.sell.sells);
    const loading = useSelector((state: RootState) => state.sell.isLoading);
    const error = useSelector((state: RootState) => state.sell.errorMessage);

    const [searchTerm, setSearchTerm] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (searchTerm.trim() === "") {
                void dispatch(getSellsThunk());
            } else {
                void dispatch(searchSellsThunk(searchTerm));
            }
        }, 350);
        return () => clearTimeout(debounceRef.current);
    }, [searchTerm, dispatch]);

    return { sells, loading, error, searchTerm, setSearchTerm };
};