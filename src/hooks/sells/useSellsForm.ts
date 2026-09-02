import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { editSellThunk } from "../../store/sell/sellsThunks";
import { useSellData } from "./useSellData";
import type { SellEditFormValues } from "@typings/sells/sellTypes";
import { usePrintSellTicket } from "./usePrintSellTicket";
import type { AppDispatch } from "../../store/sell/sellSlice";
import { useErrorParser } from "../shared/useErrorParser";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";


/*══════════════════════════════════════════════╗
║ 🪝 useSellEdit                             ║
╚══════════════════════════════════════════════*/

// Editar una venta cerrada es exclusivo de admin (modificar el historial es
// sensible). Hoy no hay ningún botón que dispare esta ruta (ver comentario
// en sellColumns.tsx), pero /sell/:id/sell-edit sigue siendo accesible por
// URL directa — `isAdmin` deja a SellForm.tsx bloquear ese acceso.
export const useSellEdit = () => {
    const { sell_id: sellId } = useParams<{ sell_id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isAdmin = useIsActiveKioscoAdmin();

    const { sellData: editingSell, isLoading: isLoadingSell } = useSellData(sellId);

    const [updatedSellId, setUpdatedSellId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [stepErrors] = useState<string[]>([]);

    const { parseError } = useErrorParser();

    const currentStep = 0;
    const totalSteps = 1;
    const handleNextStep = async (): Promise<void> => {};
    const handlePrevStep = (): void => {};

    const handleEdit = async (values: SellEditFormValues): Promise<void> => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const _id = await dispatch(editSellThunk({ data: values }));
            if (!_id) throw new Error(t("sells.edit.submitFailed"));

            setUpdatedSellId(_id);
        } catch (err) {
            const message = await parseError(err, t("sells.edit.errorUnexpected"));
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSeeDetail = (): void => {
        if (sellId) navigate(`/sells/${sellId}`);
    };

    const handleBackToSells = () => navigate("/sells");

    return {
        sellId,
        editingSell,
        isLoadingSell,
        isAdmin,
        updatedSellId,
        handleEdit,
        currentStep,
        totalSteps,
        handleNextStep,
        handlePrevStep,
        isSubmitting,
        submitError,
        stepErrors,
        handleSeeDetail,
        handleBackToSells,
    };
};

/*══════════════════════════════════════════════╗
║ 🪝 useSellDetail                                ║
╚══════════════════════════════════════════════*/

export const useSellDetail = (sellId?: string) => {
    const navigate = useNavigate();
    const { sellData: viewingSell, isLoading: isLoadingSell, error } = useSellData(sellId);
    const { printTicket } = usePrintSellTicket();

    const handleSubmit = () => {
        if (!viewingSell) return;
        printTicket(viewingSell);
    };

    const handleBackToSells = () => navigate("/sells");

    return {
        viewingSell,
        isLoadingSell,
        error,
        handleSubmit,
        handleBackToSells,
    };
};