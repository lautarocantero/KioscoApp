import { Box, Typography, type Theme } from "@mui/material";
import { Grid } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import SharedAppBar from "./SharedAppBar/SharedAppBar";
import type { AppLayoutProps } from "../../../typings/ui/uiModules";

const AppLayout = ({ children, title }: PropsWithChildren<AppLayoutProps>):React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);

  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component={"div"}
      sx={(theme: Theme) => ({
      height: "100vh",
      width: "100vw",
      backgroundColor: !appTheme ? theme.custom.black : theme.custom.white,
      backgroundSize: "cover",
      backgroundPosition: "center",
    })}
    >
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        sx={{ height: "100vh", width: "100vw" }}
        spacing={0}
      >
        <Grid
          component={"div"}
          spacing={{ xs: 12, sm: 6 }}
          sx={{
            display: { xs: "none", md: "block" },
            minWidth: { md: "50%" },
          }}
        ></Grid>
        <Grid
          component={"div"}
          spacing={{ xs: 12, sm: 6 }}
          display={"flex"}
          alignItems={"center"}
          sx={(theme: Theme) => ({
            backgroundColor: { md: theme.custom?.background },
            minWidth: { xs: "100%", md: "50%" },
          })}
        >
          <SharedAppBar />
          <Grid
            container
            component="main"
            rowSpacing={5}
            sx={(theme: Theme) => ({
              display: { xs: "flex"},
              flexDirection: { md: "column" },
              alignItems: { xs: "center"},
              width: { xs: "100%", sm: "90%", md: "80%" },
              justifyContent: "center",
              margin: "auto",
              padding: "3em 0 0em",
              borderRadius: { xs: "0", md: "1em" },
              overflowX: "hidden",
              backgroundColor: theme.custom?.backgroundDark,
              height: "100vh",
            })}
          >
            <Grid
              sx={(theme: Theme) => ({
                backgroundColor: !appTheme ? theme.custom.black : theme.custom.white,
                borderRadius: '1em',
                color: theme?.custom?.fontColor,
                width: '90%',
                marginTop: '2.5em',
                textAlign: 'center'
              })}
            >
              <Typography 
                variant="h1"
                sx={(theme: Theme) => ({
                  fontSize: theme?.typography?.h2?.fontSize,
                })}
              >
                {title}
              </Typography>
            </Grid>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppLayout;
