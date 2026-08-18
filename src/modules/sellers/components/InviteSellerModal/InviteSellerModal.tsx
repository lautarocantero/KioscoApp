import { Alert, Box, Button, Dialog, DialogContent, IconButton, Skeleton, Stack, TextField, Typography, type Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { InviteSellerModalProps } from "@typings/kiosco/kioscoComponentTypes";
import { useKioscoInvite } from "../../../../hooks/kiosco/useKioscoInvite";

const InviteSellerModal = ({ open, onClose }: InviteSellerModalProps): React.ReactNode => {
    const { t } = useTranslation();
    const { inviteInfo, loading, error, copied, handleCopy } = useKioscoInvite(open);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: (theme: Theme) => ({
                        border: "0.5px solid",
                        borderColor: theme.custom.darkGray,
                        borderRadius: "16px",
                        minWidth: { xs: 280, sm: 480 },
                        width: { xs: 320, sm: 520 },
                        boxShadow: `
                            0 1px 3px ${alpha(theme.custom.black, 0.06)},
                            4px 8px 16px ${alpha(theme.custom.black, 0.1)},
                            8px 16px 28px ${alpha(theme.custom.black, 0.08)}
                        `,
                    }),
                },
            }}
        >
            <DialogContent sx={(theme: Theme) => ({ color: theme.custom.fontColor, position: "relative" })}>
                <IconButton
                    onClick={onClose}
                    aria-label={t("sellers.invite.close")}
                    sx={(theme: Theme) => ({ position: "absolute", top: 16, right: 16, color: theme.custom.lightGray })}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ pt: 1, pb: 2, pr: 5 }}>
                    <Box
                        sx={(theme: Theme) => ({
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: alpha(theme.custom.lightMain, 0.15),
                            color: theme.custom.lightMain,
                            flexShrink: 0,
                        })}
                    >
                        <PersonAddAltOutlinedIcon />
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 700 }}>{t("sellers.invite.title")}</Typography>
                        <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                            {t("sellers.invite.subtitle")}
                        </Typography>
                    </Box>
                </Stack>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {loading ? (
                    <Stack spacing={2}>
                        <Skeleton variant="rounded" height={56} />
                        <Skeleton variant="rounded" height={56} />
                    </Stack>
                ) : inviteInfo ? (
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label={t("sellers.invite.codeLabel")}
                            value={inviteInfo.invite_code}
                            slotProps={{ input: { readOnly: true } }}
                        />
                        <TextField
                            fullWidth
                            label={t("sellers.invite.linkLabel")}
                            value={inviteInfo.invite_link}
                            slotProps={{ input: { readOnly: true } }}
                        />
                        <Button
                            variant="contained"
                            startIcon={copied ? <CheckOutlinedIcon /> : <ContentCopyOutlinedIcon />}
                            onClick={handleCopy}
                        >
                            {copied ? t("sellers.invite.copied") : t("sellers.invite.copyLink")}
                        </Button>
                        <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                            {t("sellers.invite.helperText")}
                        </Typography>
                    </Stack>
                ) : null}
            </DialogContent>
        </Dialog>
    );
};

export default InviteSellerModal;
