
import type { ThemeContextType } from "@typings/ui/layout.types";
import { createContext } from "react";


export const ThemeContext = createContext<ThemeContextType>({
  appTheme: JSON.parse(localStorage.getItem("appTheme") ?? "true"),
  setAppTheme: () => {},
});