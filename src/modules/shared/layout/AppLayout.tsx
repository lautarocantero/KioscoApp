import { Box, Typography, type Theme } from "@mui/material";
import { Grid } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import SharedAppBar from "./SharedAppBar/SharedAppBar";
import type { AppLayoutProps } from "../../../typings/ui/uiModules";

interface OptionsHeader {
  isOptions?: boolean;
  title?: string,
  icon?: React.ReactNode,
  appTheme: boolean,
}

const OptionsHeader = ({isOptions,title,icon, appTheme}: OptionsHeader) => {

  if(!isOptions) return (<></>);

  return (
      <Grid
        sx={(theme: Theme) => ({
          alignContent: 'center',
          backgroundColor: !appTheme ? theme.custom.backgroundDark : theme.custom.backgroundLigth,
          borderRadius: '1em',
          color: !appTheme ? theme?.custom?.fontColor : theme.custom.fontColorDark,
          width: '90%',
          margin: { xs: "2em 0", sm: '0'},
          padding: {xs: '1em' },
          textAlign: 'center'
        })}
      >
        <Typography 
          variant="h1"
          sx={(theme: Theme) => ({
            fontSize: {xs: theme?.typography?.h4.fontSize, sm: theme?.typography?.h2.fontSize, md: theme?.typography?.h1.fontSize },
          })}
        >
          {icon && icon}
          {title}
        </Typography>
      </Grid>
  )
}

const AppLayout = ({ children, isOptions, title, icon }: PropsWithChildren<AppLayoutProps>):React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);

  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component={"div"}
      sx={(theme: Theme) => ({
      height: "100vh",
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
        sx={{ height: "100vh", width: "100vw" }}
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
          <SharedAppBar />
          <Grid
            container
            component="main"
            rowSpacing={{xs: 1, sm: 5}}
            sx={() => ({
              display: { xs: "flex"},
              flexDirection: { md: "column" },
              alignItems: { xs: "center"},
              width: { xs: "100%", sm: "70%", md: "50%" },
              justifyContent: "center",
              padding: { xs: "1em 0 0", md: "3em 0 0" },
              overflowX: "hidden",
              height: { xs: "auto", md: "100vh" }
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
