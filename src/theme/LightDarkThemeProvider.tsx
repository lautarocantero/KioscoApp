import { useState, useMemo, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

export const LightDarkThemeProvider = ({ children }: { children: ReactNode }) => {

  const [appTheme, setAppTheme] = useState<boolean>(() => {
    const stored = localStorage.getItem("appTheme");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const value = useMemo(
    () => ({ appTheme, setAppTheme }),
    [appTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};