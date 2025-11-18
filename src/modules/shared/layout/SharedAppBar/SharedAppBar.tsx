import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import SharedAppBarContent from "./SharedAppBarContent";

const SharedAppBar = (): React.ReactNode => {
  return (
    <AppBar
      position="fixed"
      component={"nav"}
      color="info"
      elevation={0}
      sx={{ width: "100%" }}
      data-testid="login-appbar"
    >
      <Toolbar>
        <SharedAppBarContent />
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(SharedAppBar);
