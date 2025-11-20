import { Box, Typography, type Theme } from "@mui/material";
import { Grid } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import SharedAppBar from "./SharedAppBar/SharedAppBar";
import type { AppLayoutProps } from "../../../typings/ui/uiModules";
import OptionsHeader from "./components/OptionsHeader";


const AppLayout = ({ children, isOptions, title, icon }: PropsWithChildren<AppLayoutProps>):React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);

  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component={"div"}
      sx={(theme: Theme) => ({
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: !appTheme ? theme.custom?.backgroundDark : theme.custom.white,
        backgroundSize: "cover",
        backgroundPosition: "center",
      })}
    >
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        sx={{ height: "100%", width: "100vw" }}
        spacing={0}
      >
        <Grid
          component={"div"}
          spacing={{ xs: 12, sm: 6 }}
          display={"flex"}
          flexDirection={'column'}
          alignItems={"center"}
          sx={{
            minWidth: { xs: "100%" },
          }}
        >
          <SharedAppBar showFilters={isOptions ? false : true} />
          <Grid
            container
            component="main"
            rowSpacing={{xs: 1, sm: 5}}
            sx={() => ({
              display: { xs: "flex"},
              flexDirection: { md: "column" },
              alignItems: { xs: "center"},
              justifyContent: "center",
              // minHeight: "100vh", 
              height: 'auto',
              width: "100vw"
            })}
          >
            <OptionsHeader isOptions={isOptions} title={title} icon={icon} appTheme={appTheme} />
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppLayout;
