import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import { useLandingNavigation } from "../../../../../hooks/landing/useLandingNavigation";
import PrimaryButtonComponent from "../../../../shared/components/Buttons/PrimaryButtonComponent";
import OutlinedButtonComponent from "../../../../shared/components/Buttons/OutlinedButtonComponent";

const LandingHeroCtaButtons = (): React.ReactNode => {
  const { t } = useTranslation();
  const { goToLogin } = useLandingNavigation();

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: { xs: "100%", sm: "auto" } }}>
      <PrimaryButtonComponent
        buttonText={t("landing.hero.download")}
        buttonOnClick={() => {}}
        buttonWidth={{ xs: "100%", sm: "auto" }}
        marginTop="0"
        padding={2}
        fontSize="body1"
        icon={<DownloadOutlinedIcon sx={{ mr: 1 }} />}
        dataTestId="landing-hero-download"
      />
      <OutlinedButtonComponent
        buttonText={t("landing.hero.openInBrowser")}
        buttonOnClick={goToLogin}
        buttonWidth={{ xs: "100%", sm: "auto" }}
        padding={2}
        fontSize="body1"
        icon={<OpenInBrowserOutlinedIcon sx={{ mr: 1 }} />}
        dataTestId="landing-hero-open-in-browser"
      />
    </Stack>
  );
};

export default LandingHeroCtaButtons;
