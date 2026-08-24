import { Box, Button, Stack, Typography, useTheme, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import type { LandingDownloadOsCardProps } from "@typings/landing/landingComponentTypes";
import LandingWaveDivider from "./LandingWaveDivider";

const CARD_WAVE_HEIGHT = { xs: "28px", md: "36px" };

const LandingDownloadOsCard = ({ target }: LandingDownloadOsCardProps): React.ReactNode => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { Icon } = target;
  const osLabel = t(target.labelKey);

  return (
    <Box
      sx={(theme: Theme) => ({
        position: "relative",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.common.white,
        border: "1px solid",
        borderColor: theme.custom.lightGray,
        borderRadius: "20px",
        padding: "1.75em",
        paddingBottom: "2.5em",
        boxShadow: `0 20px 40px -24px ${theme.custom.black}40`,
      })}
    >
      <Stack spacing={2.5} justifyContent="space-between" sx={{ position: "relative", flex: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={(theme: Theme) => ({
                width: 48,
                height: 48,
                flexShrink: 0,
                borderRadius: "12px",
                backgroundColor: theme.palette.primary.main,
                boxShadow: `0 10px 16px -6px ${theme.palette.primary.main}99`,
              })}
            >
              <Icon sx={{ color: (theme: Theme) => theme.palette.common.white }} />
            </Stack>

            <Stack spacing={0.25}>
              <Typography variant="h6" sx={{ color: (theme: Theme) => theme.custom.black, fontWeight: 700 }}>
                {osLabel}
              </Typography>
              <Typography variant="body2" sx={{ color: (theme: Theme) => theme.custom.blackTranslucid }}>
                {t(target.descriptionKey)}
              </Typography>
            </Stack>
          </Stack>

          <Box
            component="img"
            src={target.illustrationSrc}
            alt=""
            aria-hidden="true"
            sx={{
              flexShrink: 0,
              width: "4.5em",
              height: "4.5em",
              objectFit: "contain",
              opacity: 0.35,
              pointerEvents: "none",
            }}
          />
        </Stack>

        <Button
          component="a"
          href={target.href}
          target={target.opensInNewTab ? "_blank" : undefined}
          rel={target.opensInNewTab ? "noopener noreferrer" : undefined}
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

      <LandingWaveDivider fillColor={theme.palette.primary.main} height={CARD_WAVE_HEIGHT} />
    </Box>
  );
};

export default LandingDownloadOsCard;
