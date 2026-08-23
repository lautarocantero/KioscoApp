import { Box, Button, Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import type { LandingDownloadOsCardProps } from "@typings/landing/landingComponentTypes";

const LandingDownloadOsCard = ({ target }: LandingDownloadOsCardProps): React.ReactNode => {
  const { t } = useTranslation();
  const { Icon } = target;
  const osLabel = t(target.labelKey);

  return (
    <Box
      sx={(theme: Theme) => ({
        position: "relative",
        overflow: "hidden",
        backgroundColor: theme.palette.common.white,
        border: "1px solid",
        borderColor: theme.custom.lightGray,
        borderRadius: "20px",
        padding: "1.75em",
        boxShadow: `0 20px 40px -24px ${theme.custom.black}40`,
      })}
    >
      <Icon
        aria-hidden="true"
        sx={(theme: Theme) => ({
          position: "absolute",
          top: "-0.5em",
          right: "-0.5em",
          fontSize: "7em",
          color: theme.custom.lightGray,
          pointerEvents: "none",
        })}
      />

      <Stack spacing={2} sx={{ position: "relative" }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={(theme: Theme) => ({
            width: 44,
            height: 44,
            borderRadius: "12px",
            backgroundColor: theme.palette.primary.main,
          })}
        >
          <AppsRoundedIcon sx={{ color: (theme: Theme) => theme.palette.common.white }} />
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="h6" sx={{ color: (theme: Theme) => theme.custom.black, fontWeight: 700 }}>
            {osLabel}
          </Typography>
          <Typography variant="body2" sx={{ color: (theme: Theme) => theme.custom.blackTranslucid }}>
            {t(target.descriptionKey)}
          </Typography>
        </Stack>

        <Button
          component="a"
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("landing.download.actionFor", { os: osLabel })}
          variant={target.isPrimary ? "contained" : "outlined"}
          startIcon={<DownloadOutlinedIcon />}
          sx={(theme: Theme) => ({
            justifyContent: "center",
            borderRadius: "10px",
            padding: "0.75em 1em",
            textTransform: "none",
            fontWeight: 600,
            ...(target.isPrimary
              ? { backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }
              : { borderColor: theme.palette.primary.main, color: theme.palette.primary.main }),
          })}
        >
          {t("landing.download.actionFor", { os: osLabel })}
        </Button>
      </Stack>

      <Box
        aria-hidden="true"
        sx={(theme: Theme) => ({
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "0 0 32px 32px",
          borderColor: `transparent transparent ${theme.palette.primary.main} transparent`,
        })}
      />
    </Box>
  );
};

export default LandingDownloadOsCard;
