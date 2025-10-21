import { useState } from "react";
import { ThemeContext } from "./ThemeContext";


export const LightDarkThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [appTheme, setAppTheme] = useState(false);
  return (
    <ThemeContext.Provider value={{ appTheme, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};