import { Box, Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import type { LandingDownloadOsCardProps } from "@typings/landing/landingComponentTypes";

const LandingDownloadOsCard = ({ target }: LandingDownloadOsCardProps): React.ReactNode => {
  const { t } = useTranslation();
  const { Icon } = target;

  return (
    <Box
      component="a"
      href={target.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("landing.download.action")} ${t(target.labelKey)}`}
      sx={(theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        textDecoration: "none",
        border: "1px solid",
        borderColor: theme.custom.darkGray,
        borderRadius: "14px",
        padding: "1em 1.25em",
        backgroundColor: theme.custom.blackTranslucid,
        transition: "border-color 0.2s ease",
        "&:hover": { borderColor: theme.palette.primary.main },
        "&:focus-visible": {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: "2px",
        },
      })}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: 40, height: 40, borderRadius: "10px", backgroundColor: (theme: Theme) => theme?.custom?.lightGray, flexShrink: 0 }}
      >
        <Icon sx={{ color: (theme: Theme) => theme?.custom?.white }} />
      </Stack>
      <Stack sx={{ minWidth: 0 }}>
        <Typography variant="body2" sx={{ color: (theme: Theme) => theme?.custom?.white, fontWeight: 700 }}>
          {t(target.labelKey)}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <DownloadOutlinedIcon sx={{ fontSize: 14, color: (theme: Theme) => theme?.palette?.primary?.main }} />
          <Typography variant="caption" sx={{ color: (theme: Theme) => theme?.palette?.primary?.main }}>
            {t("landing.download.action")}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingDownloadOsCard;
