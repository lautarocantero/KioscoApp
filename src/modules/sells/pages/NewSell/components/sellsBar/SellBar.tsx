import { AppBar, Toolbar, type Theme } from "@mui/material";
import React from "react";
import type { SharedAppBarInterface } from "../../../../../../typings/ui/appbar.types";
import SellBarContent from "./SellBarContent";
import { getNoisyBackgroundSx } from "../../../../../shared/components/NoisyBackground/NoisyBackground";

const SellBar = ({showFilters}: SharedAppBarInterface): React.ReactNode => {
  return (
    <AppBar
      component={"nav"}
      elevation={0}
      position="relative"
      sx={(theme: Theme) => ({
        width:  { xs: "98%", sm: "90%", md: "720px" },
        borderRadius: "0.5em",
        alignSelf: "center",
        ...getNoisyBackgroundSx({theme}),
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