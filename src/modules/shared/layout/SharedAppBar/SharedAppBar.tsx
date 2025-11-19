import { AppBar, Toolbar, type Theme } from "@mui/material";
import React from "react";
import SharedAppBarContent from "./SharedAppBarContent";

const SharedAppBar = ({showFilters}: {showFilters: boolean}): React.ReactNode => {
  return (
    <AppBar
      position="fixed"
      component={"nav"}
      elevation={0}
      sx={(theme: Theme) => ({ 
        width: "100%",
        backgroundColor: theme?.custom?.blackTranslucid,
        //si muestro los filtros, expandir el appbar
        height: { xs: showFilters ? '4em' : 'auto'},
      })}
      data-testid="login-appbar"
    >
      <Toolbar style={{ minHeight: 'auto'}}>
        <SharedAppBarContent showFilters={showFilters}/>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(SharedAppBar);
