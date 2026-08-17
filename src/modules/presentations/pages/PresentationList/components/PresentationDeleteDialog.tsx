import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../../../../../modules/shared/components/ConfirmDialog/ConfirmDialog";
import type { DeleteDialogProps } from "@typings/ui/dialog.types";


const PresentationDeleteDialog = ({
    deleteDialog,
    onConfirm,
    onCancel,
}: DeleteDialogProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <ConfirmDialog
            open={deleteDialog.open}
            title={t("presentations.deleteDialog.title")}
            description={
                <>
                    {t("presentations.deleteDialog.descriptionPrefix")}{" "}
                    <strong>{deleteDialog.name}</strong>
                    {t("presentations.deleteDialog.descriptionSuffix")}
                </>
            }
            confirmLabel={t("presentations.deleteDialog.confirmLabel")}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};

export default PresentationDeleteDialog;
