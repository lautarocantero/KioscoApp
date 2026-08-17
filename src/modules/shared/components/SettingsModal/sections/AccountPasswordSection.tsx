import { Box, Button, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import AccountPasswordDialog from "./AccountPasswordDialog";
import { useAccountPasswordForm } from "@hooks/account/useAccountPasswordForm";

const AccountPasswordSection = (): React.ReactNode => {
  const { t } = useTranslation();
  const { formik, isSubmitting, errorMessage, isDialogOpen, openDialog, closeDialog } = useAccountPasswordForm();

  return (
    <Box component="section" aria-labelledby="settings-password-heading">
      <Typography
        id="settings-password-heading"
        component="h3"
        variant="h6"
        sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 2 })}
      >
        {t("settings.account.password.heading")}
      </Typography>

      <Box
        sx={(theme: Theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          py: 1.5,
          borderBottom: `1px solid ${theme.custom.darkGray}`,
        })}
      >
        <Typography component="span" sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 600, fontSize: "0.9rem" })}>
          {t("settings.account.password.fieldLabel")}
        </Typography>

        <Button
          onClick={openDialog}
          variant="outlined"
          sx={(theme: Theme) => ({
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            borderColor: theme.custom.darkGray,
            color: theme.custom.fontColor,
          })}
        >
          {t("settings.account.password.editButton")}
        </Button>
      </Box>

      <AccountPasswordDialog
        open={isDialogOpen}
        onClose={closeDialog}
        formik={formik}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
    </Box>
  );
};

export default AccountPasswordSection;
