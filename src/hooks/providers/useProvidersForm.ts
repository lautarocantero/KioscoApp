import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type {
    ProviderFormValues,
    ProviderEditFormValues,
    UseProviderCreateReturn,
    UseProviderEditReturn,
} from "@typings/provider/providerTypes";
import { createProviderThunk, editProviderThunk } from "../../store/provider/providerThunks";
import { useProviderData } from "./useProviderData";
import { useErrorParser } from "../shared/useErrorParser";
import type { AppDispatch } from "../../store/provider/providerSlice";

/*══════════════════════════════════════════════╗
║ 🪝 useProviderCreate                          ║
╚══════════════════════════════════════════════*/

export function useProviderCreate(): UseProviderCreateReturn {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { parseError } = useErrorParser();

    const handleSubmit = async (values: ProviderFormValues) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const _id = await dispatch(createProviderThunk(values));
            if (!_id) throw new Error("No se pudo crear el proveedor");

            navigate("/providers");
        } catch (err) {
            const message = await parseError(err, "Error inesperado al crear el proveedor");
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { isSubmitting, submitError, handleSubmit };
}

/*══════════════════════════════════════════════╗
║ 🪝 useProviderEdit                            ║
╚══════════════════════════════════════════════*/

export function useProviderEdit(): UseProviderEditReturn {
    const navigate = useNavigate();
    const { provider_id: providerId } = useParams<{ provider_id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const {
        providerData: editingProvider,
        isLoading: isLoadingProvider,
        error: loadError,
    } = useProviderData(providerId);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(loadError);

    const { parseError } = useErrorParser();

    const handleEdit = async (values: ProviderEditFormValues) => {
        if (!providerId) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const ok = await dispatch(editProviderThunk({ _id: providerId, ...values }));
            if (!ok) throw new Error("No se pudo editar el proveedor");

            navigate("/providers");
        } catch (err) {
            const message = await parseError(err, "Error inesperado al actualizar el proveedor");
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { providerId, editingProvider, isLoadingProvider, isSubmitting, submitError, handleEdit };
}
