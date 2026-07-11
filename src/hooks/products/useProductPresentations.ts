import { useState, useEffect, useCallback, useMemo } from "react";
import { getPresentationsByProductIdRequest } from "../../modules/presentations/api/presentationsApi";
import { resolveErrorMessage } from "../../utils/formatter/resolveErrorMessage";
import type { Presentation } from "@typings/presentation/presentationTypes";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductPresentations                                            ║
║                                                                       ║
║ El producto en sí no vende, sus presentaciones sí. Este hook:         ║
║   1. Trae todas las presentaciones hijas de un producto               ║
║   2. Selecciona automáticamente la primera disponible por defecto     ║
║   3. Expone el setter para que el usuario elija otra                  ║
║      (ej. desde un selector en la UI)                                 ║
╚══════════════════════════════════════════════════════════════════════╝*/
export function useProductPresentations(productId: string | undefined) {
    const [presentations, setPresentations]           = useState<Presentation[]>([]);
    const [isLoading, setIsLoading]                   = useState(true);
    const [error, setError]                           = useState<string | null>(null);
    const [selectedPresentationId, setSelectedPresentationId] = useState<string | undefined>(undefined);

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
    // todavía, ej. primera carga o cambio de producto), cae en la primera disponible.
    useEffect(() => {
        if (presentations.length === 0) {
            setSelectedPresentationId(undefined);
            return;
        }

        const stillExists = presentations.some((p) => p._id === selectedPresentationId);
        if (!stillExists) {
            setSelectedPresentationId(presentations[0]._id);
        }
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