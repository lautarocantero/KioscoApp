// hooks/presentation/usePresentationData.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/presentation/presentationSlice";
import { fetchPresentationById } from "../../store/presentation/presentationThunks";
import type { UsePresentationDataResult } from "@typings/presentation/presentationTypes";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 usePresentationData                                                ║
║                                                                       ║
║ Consume el store en lugar de fetch manual:                           ║
║   1. Lee selectedPresentation/isLoading/errorMessage del store       ║
║   2. Si el store no tiene esta presentación (refresh, URL directa,   ║
║      etc.), despacha fetchPresentationById, que fetchea y guarda     ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const usePresentationData = (
    presentationId: string | undefined
): UsePresentationDataResult => {
    const dispatch = useDispatch<AppDispatch>();

    const presentationData = useSelector(
        (state: RootState) => state.presentation?.selectedPresentation ?? null
    );
    const isLoading = useSelector((state: RootState) => state.presentation?.isLoading ?? false);
    const error = useSelector((state: RootState) => state.presentation?.errorMessage ?? null);

    const storeHasIt = presentationData?._id === presentationId;

    useEffect(() => {
        if (!presentationId) return;
        if (storeHasIt) return; // ya está en store, no hace falta refetch

        void dispatch(fetchPresentationById(presentationId));
    }, [presentationId, storeHasIt, dispatch]);

    return { presentationData, isLoading, error };
};