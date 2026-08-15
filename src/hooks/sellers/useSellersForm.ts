import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { EditSellerPayload, SellerFormValues } from "@typings/seller/sellerTypes";
import { editSellerThunk } from "../../store/seller/sellerThunks";
import { startEditAuthRole } from "../../store/auth/authThunks";
import { useSellerData } from "./useSellerData";
import { useIsAdmin } from "../auth/useIsAdmin";
import { useErrorParser } from "../shared/useErrorParser";
import type { AppDispatch } from "../../store/seller/sellerSlice";


export function useSellerEdit() {
    const navigate = useNavigate();
    const { seller_id: sellerId } = useParams<{ seller_id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const isAdmin = useIsAdmin();

    const { sellerData: editingSeller, isLoading: isLoadingSeller, error: loadError } = useSellerData(sellerId);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(loadError);

    const { parseError } = useErrorParser();

    const handleEdit = async (values: Pick<SellerFormValues, "name" | "rol">) => {
        if (!sellerId) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // El nombre vive en Seller: siempre se manda.
            const sellerBody: EditSellerPayload = { _id: sellerId, name: values.name };
            const ok = await dispatch(editSellerThunk(sellerBody));
            if (!ok) throw new Error("No se pudo editar el vendedor");

            // El rol vive en Auth, y solo un admin puede tocarlo (el select ya
            // viene disabled para el resto). Solo pegamos si de verdad cambió.
            if (isAdmin && values.rol !== editingSeller?.role) {
                const roleOk = await dispatch(startEditAuthRole({ _id: sellerId, role: values.rol }));
                if (!roleOk) throw new Error("No se pudo actualizar el rol del vendedor");
            }

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
