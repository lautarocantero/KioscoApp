import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { darkTheme, lightTheme } from "./mainTheme";

export const AppTheme = ({children}: {children: React.ReactNode}) => {
    const {appTheme} = useContext(ThemeContext);
    
    return (
        <ThemeProvider theme={appTheme ? lightTheme : darkTheme}>
            <CssBaseline />
                {children}
        </ThemeProvider>
    )
}