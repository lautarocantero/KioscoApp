import { Box, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import type { AppLayoutProps } from "../../../typings/ui/uiModules";
import OptionsHeader from "./components/OptionsHeader";
import AppSidebar from "./components/appSideBar/Appsidebar";
import LightMode from "../components/LightMode/LightMode";
import BlobBackground from "./components/BlobBackground";

const AppLayout = ({
  children,
  isOptions,
  fullWidth,
  noCenter,
  title = "App",
  icon,
}: PropsWithChildren<AppLayoutProps>): React.ReactNode => {
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
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: noCenter ? 0 : "3em",
            justifyContent: noCenter || fullWidth ? "flex-start" : "center",
            p: { xs: 2, sm: 3 },
            gap: { xs: "1.5em", sm: "2em" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
              width: fullWidth ? "100%" : { xs: "98%", sm: "90%", md: "720px" },
              gap: "1em",
            }}
          >
            {/* Header para páginas isOptions */}
            <OptionsHeader
              isOptions={isOptions}
              title={title}
              icon={icon}
              appTheme={appTheme}
            />

            {/* Header para páginas fullWidth (listados, tablas) */}
            {fullWidth && !isOptions && (
              <Box
                sx={(theme) => ({
                  width: "100%",
                  borderBottom: `0.5px solid ${
                    !appTheme
                      ? "rgba(255,255,255,0.1)"
                      : theme.custom?.blackTranslucid
                  }`,
                  pb: 1,
                })}
              >
                <Typography
                  variant="h2"
                  sx={(theme) => ({
                    fontSize: {
                      xs: theme.typography?.h5.fontSize,
                      sm: theme.typography?.h4.fontSize,
                      md: theme.typography?.h3.fontSize,
                    },
                    fontWeight: 500,
                    color: !appTheme
                      ? theme.custom?.fontColor
                      : theme.custom?.fontColorDark,
                  })}
                >
                  {icon && (
                    <Box component="span" sx={{ mr: 1, verticalAlign: "middle" }}>
                      {icon}
                    </Box>
                  )}
                  {title}
                </Typography>
              </Box>
            )}

            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
