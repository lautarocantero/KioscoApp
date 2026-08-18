import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import type { AppDispatch } from "../../store/sell/sellSlice";
import { getSellsThunk, settleSellDebtThunk } from "../../store/sell/sellsThunks";
import type { SellTicketType, UseSettleSellDebtReturn } from "@typings/sells/sellTypes";
import type { SettleDebtDialogState } from "@typings/ui/dialog.types";
import { CLOSED_SETTLE_DEBT_DIALOG } from "../../config/constants";
import { useErrorParser } from "../shared/useErrorParser";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";

/*══════════════════════════════════════════════╗
║ 🪝 useSettleSellDebt                            ║
║ Modal de "saldar deuda" desde la tabla de      ║
║ ventas: solo se muestra en ventas Parcial.     ║
║ Al confirmar, despacha settleSellDebtThunk y    ║
║ refresca el listado completo desde el back.     ║
╚══════════════════════════════════════════════*/
export const useSettleSellDebt = (): UseSettleSellDebtReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const snackBarContext = useContext(SnackBarContext);
    const { parseError } = useErrorParser();

    const [settleDebtDialog, setSettleDebtDialog] = useState<SettleDebtDialogState>(CLOSED_SETTLE_DEBT_DIALOG);
    const [sellToSettle, setSellToSettle] = useState<SellTicketType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSettleDebtRequest = (sell: SellTicketType) => {
        const pendingBalance = sell.total_amount - (sell.amount_paid ?? 0);
        if (pendingBalance <= 0) return;

        setErrorMessage(null);
        setSellToSettle(sell);
        setSettleDebtDialog({
            open: true,
            sellId: sell._id,
            debtorName: sell.debtor_name,
            currency: sell.currency,
            pendingBalance,
        });
    };

    const handleSettleDebtCancel = () => {
        setSettleDebtDialog(CLOSED_SETTLE_DEBT_DIALOG);
        setSellToSettle(null);
        setErrorMessage(null);
    };

    const handleSettleDebtConfirm = async () => {
        if (!sellToSettle) return;

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const settled = await dispatch(settleSellDebtThunk({
                sell: sellToSettle,
                pendingBalance: settleDebtDialog.pendingBalance,
            }));
            if (!settled) throw new Error("No se pudo saldar la deuda");

            snackBarContext?.showSnackBar(t("sells.settleDebtDialog.successMessage"), AlertColor.Success);
            setSettleDebtDialog(CLOSED_SETTLE_DEBT_DIALOG);
            setSellToSettle(null);
            void dispatch(getSellsThunk());
        } catch (err) {
            const message = await parseError(err, t("sells.settleDebtDialog.errorUnexpected"));
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        settleDebtDialog,
        isSubmitting,
        errorMessage,
        handleSettleDebtRequest,
        handleSettleDebtCancel,
        handleSettleDebtConfirm,
    };
};

export default useSettleSellDebt;
