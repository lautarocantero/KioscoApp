import { Box, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import type { AppLayoutProps } from "../../../typings/ui/uiModules";
import OptionsHeader from "./components/OptionsHeader";
import AppSidebar from "./components/appSideBar/Appsidebar";
import LightMode from "../components/LightMode/LightMode";
import BlobBackground from "./components/BlobBackground";

const AppLayout = ({ children, isOptions, title = "App", icon }: PropsWithChildren<AppLayoutProps>): React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);

  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component="div"
      sx={(t) => ({
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: t.custom.backgroundDark,
        display: "flex",
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
      })}
    >

      <BlobBackground />

      {/* ── Toggle de tema ── */}
      <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
        <LightMode />
      </Box>

      {/* ── Sidebar ── */}
      <AppSidebar isOptions={isOptions} />

      {/* ── Contenido principal ── */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", zIndex: 1 }}>
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, sm: 3 },
            gap: { xs: '1.5em', sm: '2em' },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
              width: { xs: "98%", sm: "90%", md: "720px" },
              gap: "1em",
            }}
          >
            <OptionsHeader
              isOptions={isOptions}
              title={title}
              icon={icon}
              appTheme={appTheme}
            />
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
