import { type ReactNode } from "react";
import { Dialog, DialogContent, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ConfirmDialogProps } from "@typings/ui/dialog.types";
import ConfirmDialogHeader from "./ConfirmDialogHeader";
import ConfirmDialogContent from "./ConfirmDialogContent";
import ConfirmDialogActions from "./ConfirmDialogActions";
import { confirmColorEnum } from "@typings/ui/uiEnums";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";


const ConfirmDialog = ({
    open,
    title = "Confirmar acción",
    description,
    warningText,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    confirmColor = confirmColorEnum.Error,
    icon,
    onConfirm,
    onCancel,
}: ConfirmDialogProps): ReactNode => (

    <Dialog
        open={open}
        onClose={onCancel}
        slotProps={{
            paper: {
                sx: (theme: Theme) => ({
                    border: "0.5px solid",
                    borderColor: theme.custom.darkGray,
                    borderRadius: "16px",
                    minWidth: { xs: 200, sm: 480 },
                    width: { xs: 300, sm: 480 },
                    boxShadow: `
                        0 1px 3px ${alpha(theme.custom.black, 0.06)},
                        4px 8px 16px ${alpha(theme.custom.black, 0.1)},
                        8px 16px 28px ${alpha(theme.custom.black, 0.08)}
                    `,
                }),
            },
        }}
    >
        <DialogContent
            sx={(theme: Theme) => ({
            color: theme?.custom?.fontColor,
            width: '100%',
            ...getNoisyBackgroundSx({theme})
            })}
            >
            <ConfirmDialogHeader
                title={title}
                icon={icon}
                confirmColor={confirmColor}
                onCancel={onCancel}
            />

            <ConfirmDialogContent
                description={description}
                hasWarning={Boolean(warningText)}
            />

            <ConfirmDialogActions
                warningText={warningText}
                confirmColor={confirmColor}
                confirmLabel={confirmLabel}
                cancelLabel={cancelLabel}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </DialogContent>
    </Dialog>
);

export default ConfirmDialog;