// hooks/presentation/usePresentationData.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/presentation/presentationSlice";
import { fetchPresentationById } from "../../store/presentation/presentationThunks";
import type { UsePresentationDataResult, UsePresentationDetailStatusReturn } from "@typings/presentation/presentationTypes";
import type { getPresentationEditInitialValues } from "../../modules/presentations/schema/PresentationFormSchema";


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


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 usePresentationDetailStatus                                        ║
║                                                                       ║
║ NO consume el store/slice: recibe los `values` ya presentes en el    ║
║ Formik del form de detalle (props) y deriva los badges de estado.    ║
║ Se agrupa acá porque también es una forma de "obtener información"   ║
║ de una presentación, aunque no dependa de Redux.                     ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const usePresentationDetailStatus = (
    values: ReturnType<typeof getPresentationEditInitialValues>
): UsePresentationDetailStatusReturn => {
    const hasSufficientStock = Number(values.stock) > Number(values.min_stock);

    const isNotExpired = values.expiration_date
        ? new Date(values.expiration_date) > new Date()
        : true;

    return { hasSufficientStock, isNotExpired };
};