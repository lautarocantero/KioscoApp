import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import PasswordField from "../../PasswordField/PasswordField";
import { getNoisyBackgroundSx } from "../../NoisyBackground/NoisyBackground";
import type { AccountPasswordDialogProps } from "@typings/settings/settingsComponentTypes";

const AccountPasswordDialog = ({ open, onClose, formik, isSubmitting, errorMessage }: AccountPasswordDialogProps): React.ReactNode => {
  const { t } = useTranslation();
  const { handleSubmit, values, setFieldValue, errors } = formik;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="account-password-dialog-title"
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
        <IconButton
          type="button"
          onClick={onClose}
          aria-label={t("settings.account.password.closeDialog")}
          sx={(theme: Theme) => ({ position: "absolute", top: 16, right: 16, color: theme.custom?.lightGray })}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <DialogTitle id="account-password-dialog-title" sx={{ p: 0, pr: 5, pt: 1 }}>
          <Typography component="span" sx={(theme: Theme) => ({ fontSize: "1.1rem", fontWeight: 700, color: theme.custom.fontColor })}>
            {t("settings.account.password.dialogTitle")}
          </Typography>
        </DialogTitle>

        <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, fontSize: "0.85rem", mt: 0.5, mb: 3 })}>
          {t("settings.account.password.dialogSubtitle")}
        </Typography>

        <Box component="form" role="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <PasswordField
            name="currentPassword"
            placeholder={t("settings.account.password.currentPassword")}
            value={values.currentPassword}
            onChange={(value) => setFieldValue("currentPassword", value)}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.toString()}
            ariaLabel={t("settings.account.password.currentPassword")}
          />

          <PasswordField
            name="newPassword"
            placeholder={t("settings.account.password.newPassword")}
            value={values.newPassword}
            onChange={(value) => setFieldValue("newPassword", value)}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.toString()}
            ariaLabel={t("settings.account.password.newPassword")}
          />

          <PasswordField
            name="repeatNewPassword"
            placeholder={t("settings.account.password.confirmNewPassword")}
            value={values.repeatNewPassword}
            onChange={(value) => setFieldValue("repeatNewPassword", value)}
            error={!!errors.repeatNewPassword}
            helperText={errors.repeatNewPassword?.toString()}
            ariaLabel={t("settings.account.password.confirmNewPassword")}
          />

          {errorMessage && (
            <Typography role="alert" sx={(theme: Theme) => ({ color: theme.palette.error.main, fontSize: theme.typography.caption.fontSize })}>
              {errorMessage}
            </Typography>
          )}

          <DialogActions sx={{ p: 0, pt: 1, justifyContent: "flex-end", gap: 1.5 }}>
            <Button
              type="button"
              onClick={onClose}
              sx={(theme: Theme) => ({ textTransform: "none", fontWeight: 600, color: theme.custom?.translucidFontColor })}
            >
              {t("settings.account.password.cancel")}
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
              {t("settings.account.password.submit")}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AccountPasswordDialog;
