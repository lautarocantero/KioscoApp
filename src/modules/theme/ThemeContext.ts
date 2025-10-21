import { createContext, type Dispatch, type SetStateAction } from "react";

interface ThemeContextType {
  appTheme: boolean;
  setAppTheme: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  appTheme: false,
  setAppTheme: () => {},
});


