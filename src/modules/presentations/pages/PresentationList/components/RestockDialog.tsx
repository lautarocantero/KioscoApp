import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { RestockDialogProps } from "@typings/ui/dialog.types";
import { getNoisyBackgroundSx } from "../../../../shared/components/NoisyBackground/NoisyBackground";

const RestockDialog = ({
    restockDialog,
    stockValue,
    isSubmitting,
    errorMessage,
    onStockChange,
    onConfirm,
    onCancel,
}: RestockDialogProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <Dialog
            open={restockDialog.open}
            onClose={onCancel}
            aria-labelledby="restock-dialog-title"
            slotProps={{
                paper: {
                    sx: (theme: Theme) => ({
                        border: "0.5px solid",
                        borderColor: theme.custom.darkGray,
                        borderRadius: "16px",
                        minWidth: { xs: 280, sm: 420 },
                        width: { xs: 320, sm: 420 },
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
                    color: theme.custom.fontColor,
                    width: "100%",
                    ...getNoisyBackgroundSx({ theme }),
                })}
            >
                <DialogTitle id="restock-dialog-title" sx={{ p: 0, pt: 1 }}>
                    <Typography component="span" sx={(theme: Theme) => ({ fontSize: "1.1rem", fontWeight: 700, color: theme.custom.fontColor })}>
                        {t("presentations.restockDialog.title")}
                    </Typography>
                </DialogTitle>

                <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, fontSize: "0.85rem", mt: 0.5, mb: 3 })}>
                    {t("presentations.restockDialog.description", { name: restockDialog.name })}
                </Typography>

                <Box component="form" role="form" onSubmit={(e) => { e.preventDefault(); void onConfirm(); }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        id="restock-current-stock"
                        label={t("presentations.restockDialog.currentStockLabel")}
                        type="number"
                        value={stockValue}
                        onChange={(e) => onStockChange(e.target.value === "" ? 0 : Number(e.target.value))}
                        fullWidth
                        slotProps={{ htmlInput: { min: 0 } }}
                    />

                    <TextField
                        id="restock-min-stock"
                        label={t("presentations.restockDialog.minStockLabel")}
                        type="number"
                        value={restockDialog.minStock}
                        disabled
                        fullWidth
                        helperText={t("presentations.restockDialog.minStockTooltip")}
                    />

                    {errorMessage && (
                        <Typography role="alert" sx={(theme: Theme) => ({ color: theme.palette.error.main, fontSize: theme.typography.caption.fontSize })}>
                            {errorMessage}
                        </Typography>
                    )}

                    <DialogActions sx={{ p: 0, pt: 1, justifyContent: "flex-end", gap: 1.5 }}>
                        <Button
                            type="button"
                            onClick={onCancel}
                            sx={(theme: Theme) => ({ textTransform: "none", fontWeight: 600, color: theme.custom?.translucidFontColor })}
                        >
                            {t("presentations.restockDialog.cancel")}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={(theme: Theme) => ({
                                textTransform: "none",
                                fontWeight: 600,
                                borderRadius: "10px",
                                px: 3,
                                backgroundColor: theme.palette.primary.main,
                            })}
                        >
                            {t("presentations.restockDialog.confirm")}
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default RestockDialog;
