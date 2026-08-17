import { useCallback, useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import { ThemeModeEnum } from "@typings/settings/settingsEnums";
import type { UseThemeModeOptionReturn } from "@typings/settings/settingsTypes";

// El ThemeContext guarda un boolean (appTheme: true = claro) por compatibilidad
// con AppTheme.tsx. Este hook lo traduce a ThemeModeEnum para que la UI
// (select de Apariencia, LightMode) trabaje con un valor explícito.
export const useThemeModeOption = (): UseThemeModeOptionReturn => {
  const { appTheme, setAppTheme } = useContext(ThemeContext);

  const mode = appTheme ? ThemeModeEnum.Light : ThemeModeEnum.Dark;

  const setMode = useCallback((nextMode: ThemeModeEnum) => {
    const isLight = nextMode === ThemeModeEnum.Light;
    setAppTheme(isLight);
    localStorage.setItem("appTheme", JSON.stringify(isLight));
  }, [setAppTheme]);

  return { mode, setMode };
};
