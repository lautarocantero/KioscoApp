import React from "react";
import { Box, DialogTitle, IconButton, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { ConfirmDialogHeaderProps } from "@typings/ui/dialog.types";

    
const ConfirmDialogHeader = ({
    title,
    icon,
    confirmColor,
    onCancel,
}: ConfirmDialogHeaderProps): React.ReactNode => (
    <>
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
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    backgroundColor: alpha(theme.palette[confirmColor].main, 0.1),
                    border: `1.5px solid ${alpha(theme.palette[confirmColor].main, 0.4)}`,
                    color: theme.palette[confirmColor].main,
                })}
            >
                {icon ?? <DeleteOutlineIcon sx={{ fontSize: "1.6rem" }} />}
            </Box>
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: { xs: "1rem", sm: "1.15rem" },
                    fontWeight: 700,
                    color: theme.custom?.fontColor,
                })}
            >
                {title}
            </Typography>
        </DialogTitle>
    </>
);

export default ConfirmDialogHeader;
