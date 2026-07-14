// hooks/presentation/usePresentationsListData.ts
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/presentation/presentationSlice";
import {
    fetchPresentationsByProductId,
    searchPresentationsByProductId,
} from "../../store/presentation/presentationThunks";
import type { UsePresentationsListDataResult } from "@typings/presentation/presentationTypes";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 usePresentationsListData                                           ║
║                                                                       ║
║ Encapsula el fetch/búsqueda de presentaciones de un producto:        ║
║   1. Lee presentations/isLoading/errorMessage del store              ║
║   2. Debouncea el término de búsqueda y despacha                     ║
║      fetchPresentationsByProductId / searchPresentationsByProductId  ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const usePresentationsListData = (
    productId: string | undefined
): UsePresentationsListDataResult => {
    const dispatch = useDispatch<AppDispatch>();

    const presentations = useSelector((state: RootState) => state.presentation.presentations);
    const loading = useSelector((state: RootState) => state.presentation.isLoading);
    const error = useSelector((state: RootState) => state.presentation.errorMessage);

    const [searchTerm, setSearchTerm] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        if (!productId) return;
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (searchTerm.trim() === "") {
                void dispatch(fetchPresentationsByProductId(productId));
            } else {
                void dispatch(searchPresentationsByProductId(productId, searchTerm));
            }
        }, 350);
        return () => clearTimeout(debounceRef.current);
    }, [searchTerm, productId, dispatch]);

    return { presentations, loading, error, searchTerm, setSearchTerm };
};