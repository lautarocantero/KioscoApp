import { Box, Typography, type Theme } from "@mui/material";
import { Grid } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import LoginAppBar from "./LoginAppBar/LoginAppBar";

const AuthLayout = ({ children }: PropsWithChildren): React.ReactNode => {
  const { appTheme }: { appTheme: boolean } = useContext(ThemeContext);

  const backgroundUrl: string = `url(/images/backgroundImages/${
    !appTheme ? "black" : "white"
  }BackgroundImage.jpg)`;

  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component={"div"}
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: backgroundUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"nowrap"}
        justifyContent={"space-between"}
        sx={{ height: "100vh", width: "100vw" }}
        spacing={0}
      >
        <Grid
          component={"div"}
          sx={{
            display: { xs: "none", md: "block" },
            width: { md: "50%" },
            flexGrow: 0,
            flexShrink: 0,
          }}
        />
        <Grid
          component={"div"}
          display={"flex"}
          alignItems={"center"}
          sx={{
            width: { xs: "100%", md: "50%" },
            flexGrow: 0,
            flexShrink: 0,
            height: "100%",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <LoginAppBar />
          <Grid
            container
            component="main"
            sx={(theme: Theme) => ({
              display: { xs: "flex" },
              flexDirection: { xs: "column" },
              alignItems: { xs: "center", md: "center" },
              width: { xs: "90%", sm: "90%", md: "80%" },
              maxWidth: "100%",
              justifyContent: "center",
              margin: "auto",
              padding: "3em 0",
              borderRadius: { xs: "1em" },
              overflowX: "hidden",
              boxSizing: "border-box",
              backgroundColor: {
                xs: theme.custom?.background,
              },
            })}
          >
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;