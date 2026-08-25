import { Box, Dialog, DialogContent, IconButton, Stack, Typography, type Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { RolesPermissionsDialogProps } from "@typings/permissions/permissionsComponentTypes";
import { ROLES_PERMISSIONS_MATRIX } from "../../../../config/rolesPermissionsMatrix";

const RolesPermissionsDialog = ({ open, onClose }: RolesPermissionsDialogProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent sx={(theme: Theme) => ({ color: theme.custom.fontColor, position: "relative" })}>
                <IconButton
                    onClick={onClose}
                    aria-label={t("sellers.invite.close")}
                    sx={(theme: Theme) => ({ position: "absolute", top: 16, right: 16, color: theme.custom.lightGray })}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>

                <Typography sx={{ fontWeight: 700, pr: 5 }}>{t("rolesPermissions.dialogTitle")}</Typography>
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mb: 2.5 })}>
                    {t("rolesPermissions.dialogSubtitle")}
                </Typography>

                <Stack spacing={2.5} sx={{ maxHeight: 420, overflowY: "auto", pr: 1 }}>
                    {ROLES_PERMISSIONS_MATRIX.map((domain) => (
                        <Box component="section" key={domain.titleKey} aria-labelledby={domain.titleKey}>
                            <Typography
                                id={domain.titleKey}
                                component="h3"
                                variant="subtitle2"
                                sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 700, mb: 1 })}
                            >
                                {t(domain.titleKey)}
                            </Typography>
                            <Stack spacing={1}>
                                {domain.actions.map((action) => (
                                    <Stack
                                        key={action.labelKey}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.fontColor })}>
                                            {t(action.labelKey)}
                                        </Typography>
                                        <Box
                                            component="span"
                                            sx={(theme: Theme) => ({
                                                flexShrink: 0,
                                                px: 1.25,
                                                py: 0.25,
                                                borderRadius: "999px",
                                                fontSize: "0.7rem",
                                                fontWeight: 700,
                                                ...(action.adminOnly
                                                    ? {
                                                          color: theme.custom.adminBadge.textColor,
                                                          background: `linear-gradient(135deg, ${theme.custom.adminBadge.gradientStart} 0%, ${theme.custom.adminBadge.gradientMid} 55%, ${theme.custom.adminBadge.gradientEnd} 100%)`,
                                                      }
                                                    : {
                                                          color: theme.custom.fontColor,
                                                          background: alpha(theme.custom.white, 0.08),
                                                      }),
                                            })}
                                        >
                                            {action.adminOnly ? t("rolesPermissions.adminBadge") : t("rolesPermissions.bothBadge")}
                                        </Box>
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default RolesPermissionsDialog;
