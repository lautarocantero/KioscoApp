import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { darkTheme } from "../../../../theme/mainTheme";
import LandingNavbar from "./components/LandingNavbar";
import LandingHero from "./components/LandingHero";
import LandingFeaturesSection from "./components/LandingFeaturesSection";
import LandingDownloadSection from "./components/LandingDownloadSection";

const LandingPage = (): React.ReactNode => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box component="main" sx={{ width: "100%" }}>
        <LandingNavbar />
        <LandingHero />
        <LandingFeaturesSection />
        <LandingDownloadSection />
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
