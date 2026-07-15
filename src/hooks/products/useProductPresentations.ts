import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getPresentationsByProductIdRequest } from "../../modules/presentations/api/presentationsApi";
import { resolveErrorMessage } from "../../utils/formatter/resolveErrorMessage";
import type { Presentation } from "@typings/presentation/presentationTypes";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductPresentations                                            ║
║                                                                       ║
║ El producto en sí no vende, sus presentaciones sí. Este hook:         ║
║   1. Trae todas las presentaciones hijas de un producto               ║
║   2. Selecciona automáticamente initialPresentationId (si viene y     ║
║      existe en la lista) o, si no, la primera disponible              ║
║   3. Expone el setter para que el usuario elija otra                  ║
║      (ej. desde un selector en la UI)                                 ║
╚══════════════════════════════════════════════════════════════════════╝*/
export function useProductPresentations(productId: string | undefined, initialPresentationId?: string) {
    const [presentations, setPresentations]           = useState<Presentation[]>([]);
    const [isLoading, setIsLoading]                   = useState(true);
    const [error, setError]                           = useState<string | null>(null);
    const [selectedPresentationId, setSelectedPresentationId] = useState<string | undefined>(undefined);

    // La preselección inicial solo debe aplicarse una vez; después manda la elección del usuario.
    const hasAppliedInitialSelection = useRef(false);

    const fetchPresentations = useCallback(async () => {
        if (!productId) { setIsLoading(false); return; }

        setIsLoading(true);
        setError(null);
        try {
            const data = await getPresentationsByProductIdRequest({ product_id: productId });
            setPresentations(data);
        } catch (err) {
            setError(resolveErrorMessage(err) ?? "No se pudieron cargar las presentaciones");
        } finally {
            setIsLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchPresentations();
    }, [fetchPresentations]);

    // 🎯 Si la selección actual ya no pertenece a la lista (o no hay ninguna
    // todavía, ej. primera carga o cambio de producto), cae en initialPresentationId
    // (si viene, existe en la lista y no se aplicó todavía) o en la primera disponible.
    useEffect(() => {
        if (presentations.length === 0) {
            setSelectedPresentationId(undefined);
            return;
        }

        const stillExists = presentations.some((p) => p._id === selectedPresentationId);
        if (stillExists) return;

        if (!hasAppliedInitialSelection.current && initialPresentationId) {
            const initialExists = presentations.some((p) => p._id === initialPresentationId);
            if (initialExists) {
                hasAppliedInitialSelection.current = true;
                setSelectedPresentationId(initialPresentationId);
                return;
            }
        }

        hasAppliedInitialSelection.current = true;
        setSelectedPresentationId(presentations[0]._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [presentations]);

    const selectedPresentation = useMemo(
        () => presentations.find((p) => p._id === selectedPresentationId) ?? null,
        [presentations, selectedPresentationId]
    );

    return {
        presentations,
        isLoading,
        error,
        selectedPresentationId,
        setSelectedPresentationId,
        selectedPresentation,
        refetch: fetchPresentations,
    };
}