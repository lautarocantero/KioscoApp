import { Box, Typography, type Theme } from "@mui/material";
import React from "react";
import type { AuthLayoutProps } from "@typings/auth/authComponentTypes";
import LoginAppBar from "./LoginAppBar/LoginAppBar";
import AuthBrandPanel from "./AuthBrandPanel/AuthBrandPanel";

const DEFAULT_TAGLINE = "Gestión de stock y ventas para tu kiosco";

const AuthLayout = ({ children, tagline = DEFAULT_TAGLINE }: AuthLayoutProps): React.ReactNode => {
  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component="div"
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          height: "100vh",
          width: "100vw",
        }}
      >
        <AuthBrandPanel tagline={tagline} />

        <Box
          component="div"
          sx={(theme: Theme) => ({
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "40%" },
            flex: { md: "0 0 40%" },
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
            backgroundColor: theme.custom?.background,
          })}
        >
          <LoginAppBar />
          <Box
            component="main"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "1.5em",
              width: { xs: "90%", sm: "85%", md: "80%" },
              maxWidth: "480px",
              margin: "0 auto",
              padding: "1em 0 3em",
              boxSizing: "border-box",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
