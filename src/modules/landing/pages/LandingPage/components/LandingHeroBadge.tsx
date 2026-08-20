import { Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";

const LandingHeroBadge = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        alignSelf: { xs: "center", md: "flex-start" },
        border: "1px solid",
        borderColor: (theme: Theme) => theme?.custom?.darkGray,
        borderRadius: "999px",
        padding: "0.4em 1em",
        backgroundColor: (theme: Theme) => theme?.custom?.blackTranslucid,
      }}
    >
      <Stack
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: (theme: Theme) => theme?.palette?.primary?.main,
        }}
      />
      <Typography
        variant="body2"
        sx={{ color: (theme: Theme) => theme?.custom?.darkWhite, fontWeight: 500 }}
      >
        {t("landing.hero.badge")}
      </Typography>
    </Stack>
  );
};

export default LandingHeroBadge;
