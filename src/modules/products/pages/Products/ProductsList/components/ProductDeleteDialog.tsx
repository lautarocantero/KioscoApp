import React from "react";

import ConfirmDialog from "../../../../../shared/components/ConfirmDialog/ConfirmDialog";
import type { ProductDeleteDialogProps } from "@typings/product/productComponentTypes";

const ProductDeleteDialog = ({
  deleteDialog,
  onConfirm,
  onCancel,
}: ProductDeleteDialogProps): React.ReactNode => (
  <ConfirmDialog
    open={deleteDialog.open}
    title="Confirmar eliminación"
    description={
      <>
        ¿Estás seguro de que querés eliminar el producto{" "}
        <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer.
      </>
    }
    confirmLabel="Eliminar"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);

export default ProductDeleteDialog;
