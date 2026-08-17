import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/provider/providerSlice";
import { fetchProvidersThunk } from "../../store/provider/providerThunks";
import type { UsePresentationProvidersFieldReturn } from "@typings/presentation/presentationTypes";

/*══════════════════════════════════════════════╗
║ 🪝 usePresentationProvidersField                ║
║ Carga el catálogo de proveedores para el step  ║
║ opcional "Proveedores" del wizard de           ║
║ presentaciones (multi-select por _id).         ║
╚══════════════════════════════════════════════*/
export const usePresentationProvidersField = (): UsePresentationProvidersFieldReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const providers = useSelector((state: RootState) => state.provider.providers);
    const loading = useSelector((state: RootState) => state.provider.isLoading);

    useEffect(() => {
        void dispatch(fetchProvidersThunk());
    }, [dispatch]);

    const providerOptions = providers.map((provider) => provider._id);

    const getProviderLabel = (providerId: string): string =>
        providers.find((provider) => provider._id === providerId)?.name ?? providerId;

    return { providerOptions, loading, getProviderLabel };
};

export default usePresentationProvidersField;
