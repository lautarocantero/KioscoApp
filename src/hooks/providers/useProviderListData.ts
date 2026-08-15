import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/provider/providerSlice";
import { fetchProvidersThunk, searchProvidersByNameThunk } from "../../store/provider/providerThunks";
import type { UseProvidersListDataResult } from "@typings/provider/providerTypes";

const SEARCH_DEBOUNCE_MS = 350;

const useProvidersListData = (): UseProvidersListDataResult => {
    const dispatch = useDispatch<AppDispatch>();

    const providers = useSelector((state: RootState) => state.provider.providers);
    const loading = useSelector((state: RootState) => state.provider.isLoading);
    const storeError = useSelector((state: RootState) => state.provider.errorMessage);

    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        setError(storeError);
    }, [storeError]);

    useEffect(() => {
        clearTimeout(debounceRef.current);

        const trimmed = searchTerm.trim();
        if (!trimmed) {
            void dispatch(fetchProvidersThunk());
            return;
        }

        debounceRef.current = setTimeout(() => {
            void dispatch(searchProvidersByNameThunk(trimmed));
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(debounceRef.current);
    }, [searchTerm, dispatch]);

    return {
        providers,
        loading,
        error,
        searchTerm,
        setSearchTerm,
    };
};

export default useProvidersListData;
