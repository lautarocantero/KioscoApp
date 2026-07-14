import React from "react";
import { DialogContent, DialogContentText, type Theme } from "@mui/material";
import type { ConfirmDialogContentProps } from "@typings/ui/dialog.types";


const ConfirmDialogContent = ({
    description,
    hasWarning,
}: ConfirmDialogContentProps): React.ReactNode => (
    <DialogContent
        sx={(theme: Theme) => ({
            pb: hasWarning ? 1 : 3,
            borderBottom: hasWarning ? `1px solid ${theme.custom?.darkGray}` : "none",
        })}
    >
        <DialogContentText
            component="div"
            sx={(theme: Theme) => ({
                color: theme.custom?.fontColor,
                fontSize: "0.95rem",
                lineHeight: 1.6,
            })}
        >
            {description}
        </DialogContentText>
    </DialogContent>
);

export default ConfirmDialogContent;
