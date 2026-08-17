import { useContext } from "react";
import { FontSizeContext } from "../../theme/FontSizeContext";
import type { UseFontSizeOptionReturn } from "@typings/settings/settingsTypes";

export const useFontSizeOption = (): UseFontSizeOptionReturn => {
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  return { fontSize, setFontSize };
};
