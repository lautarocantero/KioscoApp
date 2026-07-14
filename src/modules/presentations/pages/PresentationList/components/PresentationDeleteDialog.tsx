import React from "react";
import ConfirmDialog from "../../../../../modules/shared/components/ConfirmDialog/ConfirmDialog";
import type { PresentationDeleteDialogProps } from "@typings/presentation/presentationComponentTypes";


const PresentationDeleteDialog = ({
    deleteDialog,
    onConfirm,
    onCancel,
}: PresentationDeleteDialogProps): React.ReactNode => (
    <ConfirmDialog
        open={deleteDialog.open}
        title="Confirmar eliminación"
        description={
            <>
                ¿Estás seguro de que querés eliminar la presentación{" "}
                <strong>{deleteDialog.name}</strong>? Esta acción no se puede
                deshacer.
            </>
        }
        confirmLabel="Eliminar"
        onConfirm={onConfirm}
        onCancel={onCancel}
    />
);

export default PresentationDeleteDialog;
