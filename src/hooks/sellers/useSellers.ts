import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellers } from "../../store/seller/sellerPersonThunks";
import type { AppDispatch, RootState } from "../../store/seller/sellerPersonSlice";

export const useSellers = () => {
    const dispatch = useDispatch<AppDispatch>();

    const sellers    = useSelector((state: RootState) => state.sellerPerson.sellers);
    const loading    = useSelector((state: RootState) => state.sellerPerson.isLoading);
    const storeError = useSelector((state: RootState) => state.sellerPerson.errorMessage);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(storeError);
    }, [storeError]);

    useEffect(() => {
        void dispatch(getSellers());
    }, [dispatch]);

    return {
        sellers,
        loading,
        error,
        clearError: () => setError(null),
    };
};