import { useEffect, useMemo, useState, type ReactNode } from "react";
import { FontSizeContext } from "./FontSizeContext";
import { FONT_SIZE_DEFAULT, FONT_SIZE_STORAGE_KEY } from "../config/constants";

// La tipografía del theme (mainTheme.ts) está expresada en rem, así que
// tocar el font-size del <html> reescala toda la app sin tocar MUI.
export const FontSizeProvider = ({ children }: { children: ReactNode }) => {

  const [fontSize, setFontSizeState] = useState<number>(() => {
    const stored = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    return stored ? Number(stored) : FONT_SIZE_DEFAULT;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const setFontSize = (nextFontSize: number) => {
    setFontSizeState(nextFontSize);
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, String(nextFontSize));
  };

  const value = useMemo(() => ({ fontSize, setFontSize }), [fontSize]);

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
};
