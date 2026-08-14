import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type {
    EditSellerPayload,
} from "@typings/seller/sellerTypes";
import { editSellerThunk } from "../../store/seller/sellerThunks";
import { useSellerData } from "./useSellerData";
import { useErrorParser } from "../shared/useErrorParser";
import type { AppDispatch } from "../../store/seller/sellerSlice";


export function useSellerEdit() {
    const navigate = useNavigate();
    const { seller_id: sellerId } = useParams<{ seller_id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const { sellerData: editingSeller, isLoading: isLoadingSeller, error: loadError } = useSellerData(sellerId);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(loadError);

    const { parseError } = useErrorParser();

    const handleEdit = async (values: { name: string; email: string; rol?: string }) => {
        if (!sellerId) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const body: EditSellerPayload = {
                _id: sellerId,
                name: values.name,
                email: values.email,
                rol: values.rol ?? (editingSeller?.rol as any),
                created_at: editingSeller?.created_at ?? new Date().toISOString(),
                user_status: editingSeller?.user_status ?? ("active" as any),
            } as unknown as EditSellerPayload;

            const ok = await dispatch(editSellerThunk(body));
            console.log(ok)
            if (!ok) throw new Error("No se pudo editar el vendedor");

            navigate(`/sellers`);
        } catch (err) {
            const message = await parseError(err, "Error inesperado al actualizar el vendedor");
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        editingSeller,
        isLoadingSeller,
        isSubmitting,
        submitError,
        handleEdit,
    };
}

export default useSellerEdit;
