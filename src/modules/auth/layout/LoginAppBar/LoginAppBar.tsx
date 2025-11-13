import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import LoginAppBarContent from "./LoginAppBarContent";

const LoginAppBar = (): React.ReactNode => {
  return (
    <AppBar
      position="fixed"
      component={"nav"}
      color="transparent"
      elevation={0}
      sx={{ width: "50%" }}
      data-testid="login-appbar"
    >
      <Toolbar>
        <LoginAppBarContent />
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(LoginAppBar);
