import React from "react";
import { useTranslation } from "react-i18next";

import ConfirmDialog from "../../../../shared/components/ConfirmDialog/ConfirmDialog";
import type { DeleteDialogProps } from "@typings/ui/dialog.types";

const ProductDeleteDialog = ({
    deleteDialog,
    onConfirm,
    onCancel,
}: DeleteDialogProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <ConfirmDialog
            open={deleteDialog.open}
            title={t("products.deleteDialog.title")}
            description={
                <>
                    {t("products.deleteDialog.descriptionPrefix")}{" "}
                    <strong>{deleteDialog.name}</strong>
                    {t("products.deleteDialog.descriptionSuffix")}
                </>
            }
            warningText={t("products.deleteDialog.warningText")}
            confirmLabel={t("products.deleteDialog.confirmLabel")}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};

export default ProductDeleteDialog;