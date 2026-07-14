import React from "react";
import { Box, Button, DialogActions, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { ConfirmDialogActionsProps } from "@typings/ui/dialog.types";


const ConfirmDialogActions = ({
    warningText,
    confirmColor,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
}: ConfirmDialogActionsProps): React.ReactNode => (
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
                    border: `1px solid ${alpha(theme.palette[confirmColor].main, 0.25)}`,
                })}
            >
                <WarningAmberRoundedIcon
                    sx={(theme: Theme) => ({
                        color: theme.palette[confirmColor].main,
                        fontSize: "1.3rem",
                        flexShrink: 0,
                    })}
                />
                <Typography
                    sx={(theme: Theme) => ({
                        fontSize: "0.8rem",
                        color: theme.custom?.fontColor,
                        lineHeight: 1.4,
                    })}
                >
                    {warningText}
                </Typography>
            </Box>
        )}

        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                ml: "auto",
                width: "100%",
            }}
        >
            <Button
                onClick={onCancel}
                sx={(theme: Theme) => ({
                    textTransform: "none",
                    fontWeight: 600,
                    color: theme.custom?.translucidFontColor,
                })}
            >
                {cancelLabel}
            </Button>
            <Button
                onClick={onConfirm}
                variant="contained"
                startIcon={confirmColor === "error" ? <DeleteOutlineIcon /> : undefined}
                sx={(theme: Theme) => ({
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "10px",
                    px: 3,
                    backgroundColor: theme.palette[confirmColor].main,
                })}
            >
                {confirmLabel}
            </Button>
        </Box>
    </DialogActions>
);

export default ConfirmDialogActions;
