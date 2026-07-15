import React from "react";

import ConfirmDialog from "../../../../shared/components/ConfirmDialog/ConfirmDialog";
import type { DeleteDialogProps } from "@typings/ui/dialog.types";

const ProductDeleteDialog = ({
    deleteDialog,
    onConfirm,
    onCancel,
}: DeleteDialogProps): React.ReactNode => (
    <ConfirmDialog
        open={deleteDialog.open}
        title="Confirmar eliminación"
        description={
            <>
                ¿Estás seguro de que querés eliminar el producto{" "}
                <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer. 
                Tambien se eliminaran sus presentaciones y stock asociado.
            </>
        }
        warningText="Esta acción eliminará el producto de forma permanente."
        confirmLabel="Eliminar"
        onConfirm={onConfirm}
        onCancel={onCancel}
    />
);

export default ProductDeleteDialog;