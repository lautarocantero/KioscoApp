import { useContext } from "react";
import type { TutorialContextType } from "@typings/tutorial/types";
import { TutorialContext } from "../../modules/shared/context/Tutorial/TutorialContext";

export const useTutorialContext = (): TutorialContextType => useContext(TutorialContext)!;
