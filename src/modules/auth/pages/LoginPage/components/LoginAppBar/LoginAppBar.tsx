import { AppBar, Toolbar } from "@mui/material"
import React from "react"
import LoginAppBarContent from "./LoginAppBarContent"

const LoginAppBar = () => {
  return (
    <AppBar 
      position='fixed' 
      color='transparent' 
      elevation={0}
      sx={{ width: '50%'}}
    >
        <Toolbar>
          <LoginAppBarContent />
        </Toolbar>
      </AppBar>
  )
}

export default React.memo(LoginAppBar);
