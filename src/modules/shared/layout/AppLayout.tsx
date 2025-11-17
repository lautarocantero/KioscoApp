import { Box, Typography, type Theme } from "@mui/material";
import { Grid } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import SharedAppBar from "./SharedAppBar/SharedAppBar";

const AppLayout = ({ children }: PropsWithChildren) => {
  const { appTheme } = useContext(ThemeContext);
  const backgroundColor = `${!appTheme ? "#333333" : "#eff0f8"}`;
  const titleBackgroundColor = `${appTheme ? "#eff0f826" : "#eff0f8"}`;

  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component={"div"}
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: backgroundColor,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
            rowSpacing={15}
            sx={(theme: Theme) => ({
              display: { xs: "flex", md: "flex" },
              flexDirection: { md: "column" },
              alignItems: { xs: "center", md: "center" },
              width: { xs: "100%", sm: "90%", md: "80%" },
              justifyContent: "center",
              margin: "auto",
              padding: "3em 0",
              borderRadius: { xs: "0", md: "1em" },
              overflowX: "hidden",
              backgroundColor: {
                xs: "transparent",
                md: theme.custom?.backgroundDark || "rgba(0,0,0,0.6)",
              },
            })}
          >
            <Grid
              sx={() => ({
                backgroundColor: titleBackgroundColor,
                width: '90%',
                textAlign: 'center'
              })}
            >
              <Typography>hola</Typography>
            </Grid>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppLayout;
