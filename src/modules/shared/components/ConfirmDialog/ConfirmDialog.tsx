import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
    type Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";

export interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    description: React.ReactNode;
    /** Texto de la caja de advertencia inferior. Si no se pasa, la caja no se muestra. */
    warningText?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmColor?: "error" | "primary" | "warning" | "success";
    /** Ícono principal dentro del círculo. Default: ícono de papelera (pensado para flujos de eliminación). */
    icon?: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({
    open,
    title = "Confirmar acción",
    description,
    warningText,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    confirmColor = "error",
    icon,
    onConfirm,
    onCancel,
}: ConfirmDialogProps): React.ReactNode => (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
          sx: (theme: Theme) => ({
              ...getNoisyBackgroundSx(theme),
              border: "0.5px solid",
              borderColor: "rgba(255,255,255,0.08)",
              borderRadius: "16px",
              minWidth: 480,
              boxShadow: `
                  0 1px 3px rgba(0,0,0,0.06),
                  4px 8px 16px rgba(0,0,0,0.10),
                  8px 16px 28px rgba(0,0,0,0.08)
              `,
          }),
      }}
    >
        <IconButton
            onClick={onCancel}
            aria-label="Cerrar"
            sx={(theme: Theme) => ({
                position: "absolute",
                top: 16,
                right: 16,
                color: theme.custom?.lightGray,
            })}
        >
            <CloseIcon fontSize="small" />
        </IconButton>

        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pr: 6, pt: 3 }}>
            <Box
                sx={(theme: Theme) => ({
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    backgroundColor: `${theme.palette[confirmColor].main}1A`,
                    border: `1.5px solid ${theme.palette[confirmColor].main}66`,
                    color: theme.palette[confirmColor].main,
                })}
            >
                {icon ?? <DeleteOutlineIcon sx={{ fontSize: "1.6rem" }} />}
            </Box>
            <Typography sx={(theme: Theme) => ({ fontSize: "1.15rem", fontWeight: 700, color: theme.custom?.white })}>
                {title}
            </Typography>
        </DialogTitle>

        <DialogContent sx={{ pb: warningText ? 1 : 3, borderBottom: warningText ? `1px solid rgba(255,255,255,0.08)` : "none" }}>
            <DialogContentText
                component="div"
                sx={(theme: Theme) => ({ color: theme.custom?.white, fontSize: "0.95rem", lineHeight: 1.6 })}
            >
                {description}
            </DialogContentText>
        </DialogContent>

        <DialogActions
            sx={{
                display: "flex",
                justifyContent: warningText ? "space-between" : "flex-end",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                px: 3,
                pb: 3,
                pt: warningText ? 1 : 0,
            }}
        >
            {warningText && (
                <Box
                    sx={(theme: Theme) => ({
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flex: 1,
                        minWidth: 220,
                        p: 1.5,
                        borderRadius: "10px",
                        border: `1px solid ${theme.palette[confirmColor].main}40`,
                    })}
                >
                    <WarningAmberRoundedIcon sx={(theme: Theme) => ({ color: theme.palette[confirmColor].main, fontSize: "1.3rem", flexShrink: 0 })} />
                    <Typography sx={(theme: Theme) => ({ fontSize: "0.8rem", color: theme.custom?.translucidWhite, lineHeight: 1.4 })}>
                        {warningText}
                    </Typography>
                </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
                <Button
                    onClick={onCancel}
                    sx={(theme: Theme) => ({
                        textTransform: "none",
                        fontWeight: 600,
                        color: theme.custom?.lightGray,
                    })}
                >
                    {cancelLabel}
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    startIcon={confirmColor === "error" ? <DeleteOutlineIcon /> : undefined}
                    sx={{ 
                      textTransform: "none", 
                      fontWeight: 600, 
                      borderRadius: "10px", 
                      px: 3,
                      backgroundColor: (theme: Theme) => theme.palette[confirmColor].main,
                    }}
                >
                    {confirmLabel}
                </Button>
            </Box>
        </DialogActions>
    </Dialog>
);

export default ConfirmDialog;