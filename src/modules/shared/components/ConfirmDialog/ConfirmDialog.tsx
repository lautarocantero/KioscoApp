// ─── Componente 🧩: ConfirmDialog ────────────────────────────────────────────
// Diálogo de confirmación genérico y reutilizable.
// No sabe nada de productos; sólo dispara onConfirm / onCancel.

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "error" | "primary" | "warning" | "success";
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title = "Confirmar acción",
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  confirmColor = "error",
  onConfirm,
  onCancel,
}: ConfirmDialogProps): React.ReactNode => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText component="div">{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>{cancelLabel}</Button>
      <Button onClick={onConfirm} color={confirmColor} variant="contained">
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
