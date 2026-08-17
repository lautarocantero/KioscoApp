import type { FontSizeContextType } from "@typings/ui/layout.types";
import { createContext } from "react";
import { FONT_SIZE_DEFAULT, FONT_SIZE_STORAGE_KEY } from "../config/constants";

const stored = localStorage.getItem(FONT_SIZE_STORAGE_KEY);

export const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: stored ? Number(stored) : FONT_SIZE_DEFAULT,
  setFontSize: () => {},
});
