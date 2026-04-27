import { Box, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import type { AppLayoutProps } from "../../../typings/ui/uiModules";
import OptionsHeader from "./components/OptionsHeader";
// import SharedAppBar from "./SharedAppBar/SharedAppBar";
import AppSidebar from "./components/Appsidebar";

const AppLayout = ({ children, isOptions, title = "App", icon }: PropsWithChildren<AppLayoutProps>): React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);

  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component="div"
      sx={() => ({
        minHeight: "100vh",
        width: "100vw",
        background: "radial-gradient(ellipse at 30% 20%, #0d184b 0%, #2d2d35 50%, #08082c 100%)",
        display: "flex",
        flexDirection: "row",
      })}
    >
      {/* ── Sidebar ── */}
      <AppSidebar isOptions={isOptions} />

      {/* ── Contenido principal ── */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* <SharedAppBar showFilters={isOptions ? false : true} /> */}
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, sm: 3 },
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
  );
};

export default AppLayout;