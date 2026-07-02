import { AppBar, Toolbar, type Theme } from "@mui/material";
import React from "react";
import type { SharedAppBarInterface } from "../../../../../../typings/ui/uiModules";
import SellBarContent from "./SellBarContent";

const SellBar = ({showFilters}: SharedAppBarInterface): React.ReactNode => {
  return (
    <AppBar
      component={"nav"}
      elevation={0}
      position="relative"
      sx={(theme: Theme) => ({
        width: "100%",
        backgroundColor: theme?.custom?.posBackground,
        borderRadius: "0.5em",
        alignSelf: "center",
      })}
      data-testid="login-appbar"
    >
      <Toolbar style={{ minHeight: 'auto', padding: '0.4em 1em' }}>
        <SellBarContent showFilters={showFilters} />
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(SellBar);