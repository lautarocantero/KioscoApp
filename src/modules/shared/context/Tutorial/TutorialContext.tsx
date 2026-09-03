import type { TutorialContextType } from "@typings/tutorial/types";
import { createContext } from "react";

export const TutorialContext = createContext<TutorialContextType | null>(null);
