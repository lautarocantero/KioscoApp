import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editSellThunk } from "../../store/sell/sellsThunks";
import { useSellData } from "./useSellData";
import type { AppDispatch } from "store/sell/sellSlice";
import type { SellEditFormValues } from "@typings/sells/sellTypes";


/*══════════════════════════════════════════════╗
║ 🪝 useSellEdit                             ║
╚══════════════════════════════════════════════*/

export const useSellEdit = () => {
    const { sell_id: sellId } = useParams<{ sell_id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { sellData: editingSell, isLoading: isLoadingSell } = useSellData(sellId);

    const [updatedSellId, setUpdatedSellId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [stepErrors] = useState<string[]>([]);

    const currentStep = 0;
    const totalSteps = 1;
    const handleNextStep = async (): Promise<void> => {};
    const handlePrevStep = (): void => {};

    const handleEdit = async (values: SellEditFormValues): Promise<void> => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const _id = await dispatch(editSellThunk({ data: values }));
            if (!_id) {
                setSubmitError("No se pudo editar la venta");
                return;
            }
            setUpdatedSellId(_id);
        } catch {
            setSubmitError("Ocurrió un error al editar la venta");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSeeDetail = (): void => {
        if (sellId) navigate(`/sells/${sellId}`);
    };

    const handleBackToSells = () => navigate("/sells");

    return {
        editingSell,
        isLoadingSell,
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

    const handleBackToSells = () => navigate("/sells");

    return {
        viewingSell,
        isLoadingSell,
        error,
        handleBackToSells,
    };
};