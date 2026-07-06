// ─── Hook 🪝: usePresentations ────────────────────────────────────────────────
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import type { Presentation } from "@typings/presentation/presentationTypes";
import {
    deletePresentationRequest,
    getPresentationsByProductIdRequest,
    searchPresentationsByProductIdRequest,
} from "../../../api/presentationsApi";

// ─── tipos ────────────────────────────────────────────────────────────────────

export interface DeleteDialogState {
    open: boolean;
    id: string;
    name: string;
}

const CLOSED_DIALOG: DeleteDialogState = { open: false, id: "", name: "" };

// ─── helper ───────────────────────────────────────────────────────────────────

const resolveErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
        return (
            (err.response?.data as { message?: string })?.message ?? err.message
        );
    }
    return err instanceof Error ? err.message : "Error desconocido";
};

// ─── hook ─────────────────────────────────────────────────────────────────────

export const usePresentations = () => {
    const { product_id } = useParams<{ product_id: string }>();

    const [presentations, setPresentations] = useState<Presentation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialog, setDeleteDialog] =
        useState<DeleteDialogState>(CLOSED_DIALOG);

    // ── fetch base ─────────────────────────────────────────────────────────────

    const fetchPresentations = useCallback(async () => {
        if (!product_id) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getPresentationsByProductIdRequest({ product_id });
            setPresentations(data);
        } catch (err: unknown) {
            setError(resolveErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [product_id]);

    // ── búsqueda ───────────────────────────────────────────────────────────────

    const [searchTerm, setSearchTerm] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const searchPresentations = useCallback(
        async (term: string) => {
            if (!product_id) return;
            setLoading(true);
            setError(null);
            try {
                const data = await searchPresentationsByProductIdRequest({ product_id, term });
                setPresentations(data);
            } catch (err: unknown) {
                setError(resolveErrorMessage(err));
            } finally {
                setLoading(false);
            }
        },
        [product_id]
    );

    useEffect(() => {
        if (!product_id) return;
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (searchTerm.trim() === "") {
                void fetchPresentations();
            } else {
                void searchPresentations(searchTerm);
            }
        }, 350);
        return () => clearTimeout(debounceRef.current);
    }, [searchTerm, product_id, fetchPresentations, searchPresentations]);

    // ── handlers ───────────────────────────────────────────────────────────────

    const clearError = () => setError(null);

    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        try {
            await deletePresentationRequest(deleteDialog.id);
            setPresentations((prev) =>
                prev.filter((p) => p._id !== deleteDialog.id)
            );
            if (searchTerm.trim() === "") {
                await fetchPresentations();
            } else {
                await searchPresentations(searchTerm);
            }
        } catch (err: unknown) {
            setError(resolveErrorMessage(err));
        } finally {
            handleDeleteCancel();
        }
    };

    return {
        productId: product_id ?? "",
        presentations,
        loading,
        error,
        deleteDialog,
        clearError,
        handleDeleteRequest,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
    };
};