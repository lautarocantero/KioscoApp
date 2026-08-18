import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { KioscoWithStats, UseKioscoSelectorReturn } from "@typings/kiosco/kioscoTypes";
import type { AppDispatch, RootState } from "../../store/auth/authSlice";
import { fetchMyKioscosThunk, selectKioscoThunk } from "../../store/kiosco/kioscoThunks";
import { clearKioscoError } from "../../store/kiosco/kioscoSlice";

export const useKioscoSelector = (): UseKioscoSelectorReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { myKioscos, loading, errorMessage } = useSelector((state: RootState) => state.kiosco);
    const [entering, setEntering] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchMyKioscosThunk());
    }, [dispatch]);

    const clearError = (): void => {
        dispatch(clearKioscoError());
    };

    const handleEnterKiosco = async (kiosco: KioscoWithStats): Promise<void> => {
        setEntering(kiosco._id);
        await dispatch(selectKioscoThunk(kiosco._id));
        navigate("/shop");
    };

    return {
        kioscos: myKioscos,
        loading,
        error: errorMessage,
        clearError,
        handleEnterKiosco,
        entering,
    };
};

export default useKioscoSelector;
