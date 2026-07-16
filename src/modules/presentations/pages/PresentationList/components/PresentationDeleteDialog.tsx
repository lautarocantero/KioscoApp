import { type ReactNode } from "react";
import ConfirmDialog from "../../../../../modules/shared/components/ConfirmDialog/ConfirmDialog";
import type { DeleteDialogProps } from "@typings/ui/dialog.types";


const PresentationDeleteDialog = ({
    deleteDialog,
    onConfirm,
    onCancel,
}: DeleteDialogProps): ReactNode => (
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
