import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { SettleDebtDialogProps } from "@typings/ui/dialog.types";
import { getNoisyBackgroundSx } from "../../../../shared/components/NoisyBackground/NoisyBackground";
import { formatCurrency } from "../../../../cart/helpers/formatCurrency";

const SettleDebtDialog = ({
    settleDebtDialog,
    isSubmitting,
    errorMessage,
    onConfirm,
    onCancel,
}: SettleDebtDialogProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <Dialog
            open={settleDebtDialog.open}
            onClose={onCancel}
            aria-labelledby="settle-debt-dialog-title"
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
                <DialogTitle id="settle-debt-dialog-title" sx={{ p: 0, pt: 1 }}>
                    <Typography component="span" sx={(theme: Theme) => ({ fontSize: "1.1rem", fontWeight: 700, color: theme.custom.fontColor })}>
                        {t("sells.settleDebtDialog.title")}
                    </Typography>
                </DialogTitle>

                <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, fontSize: "0.85rem", mt: 0.5, mb: 3 })}>
                    {t("sells.settleDebtDialog.description")}
                </Typography>

                <Box component="form" role="form" onSubmit={(e) => { e.preventDefault(); void onConfirm(); }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box
                        sx={(theme: Theme) => ({
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: `${theme.palette.warning.main}1A`,
                            border: `1px solid ${theme.palette.warning.main}`,
                        })}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography component="span" variant="body2" fontWeight={600} sx={(theme: Theme) => ({ color: theme.palette.warning.main })}>
                                {t("sells.settleDebtDialog.pendingBalanceLabel")}
                            </Typography>
                            <Typography
                                component="span"
                                variant="body2"
                                fontWeight={700}
                                sx={(theme: Theme) => ({ color: theme.palette.warning.main })}
                            >
                                {formatCurrency(settleDebtDialog.pendingBalance, settleDebtDialog.currency)}
                            </Typography>
                        </Stack>

                        {settleDebtDialog.debtorName && (
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
                                <Typography component="span" variant="caption" color="text.secondary">
                                    {t("sells.settleDebtDialog.debtorLabel")}
                                </Typography>
                                <Typography component="span" variant="caption" color="text.secondary">
                                    {settleDebtDialog.debtorName}
                                </Typography>
                            </Stack>
                        )}
                    </Box>

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
                            {t("sells.settleDebtDialog.cancel")}
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
                            {t("sells.settleDebtDialog.confirm")}
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default SettleDebtDialog;
