import { Box, Stack, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLandingNavigation } from "../../../../../hooks/landing/useLandingNavigation";
import { useScrollToSection } from "../../../../../hooks/landing/useScrollToSection";
import { getLandingNavLinks } from "../../../helpers/getLandingNavLinks";
import LandingNavLinks from "./LandingNavLinks";
import LandingBrandmark from "./LandingBrandmark";
import LandingLanguageSelect from "./LandingLanguageSelect";
import OutlinedButtonComponent from "../../../../shared/components/Buttons/OutlinedButtonComponent";
import PrimaryButtonComponent from "../../../../shared/components/Buttons/PrimaryButtonComponent";

const LandingNavbar = (): React.ReactNode => {
  const { t } = useTranslation();
  const { goToLogin, goToRegister } = useLandingNavigation();
  const { scrollToSection, scrollToTop } = useScrollToSection();
  const links = getLandingNavLinks();

  return (
    <Box
      component="header"
      sx={(theme: Theme) => ({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        width: "100%",
        boxSizing: "border-box",
        borderColor: theme?.custom?.darkGray,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ maxWidth: "1280px", margin: "0 auto", padding: { xs: "1em 1.25em", md: "1em 2em" } }}
      >
        <Box
          component="button"
          type="button"
          onClick={scrollToTop}
          aria-label={t("landing.nav.goToTop")}
          sx={{
            display: "inline-flex",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <LandingBrandmark />
        </Box>

        <LandingNavLinks links={links} onLinkClick={scrollToSection} />

        <Stack direction="row" spacing={1.5} alignItems="center">
          <LandingLanguageSelect />
          <OutlinedButtonComponent
            buttonText={t("landing.nav.login")}
            buttonOnClick={goToLogin}
            buttonWidth="auto"
            dataTestId="landing-nav-login"
          />
          <PrimaryButtonComponent
            buttonText={t("landing.nav.register")}
            buttonOnClick={goToRegister}
            buttonWidth="auto"
            marginTop="0"
            dataTestId="landing-nav-register"
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingNavbar;
