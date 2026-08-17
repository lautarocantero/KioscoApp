import { Box, Skeleton, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import SettingsInfoRow from "./SettingsInfoRow";
import { useSidebarUserData } from "../../../layout/components/appSideBar/hooks/useSidebarUserData";

const AccountInfoSection = (): React.ReactNode => {
  const { t } = useTranslation();
  const { userData, isLoading } = useSidebarUserData();

  return (
    <Box component="section" aria-labelledby="settings-account-info-heading">
      <Typography
        id="settings-account-info-heading"
        component="h3"
        variant="h6"
        sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 2 })}
      >
        {t("settings.account.info.heading")}
      </Typography>

      {(isLoading || !userData) && (
        <>
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
        </>
      )}

      {!isLoading && userData && (
        <>
          <SettingsInfoRow label={t("settings.account.info.username")} value={userData.name} />
          <SettingsInfoRow label={t("settings.account.info.email")} value={userData.email} />
        </>
      )}
    </Box>
  );
};

export default AccountInfoSection;
