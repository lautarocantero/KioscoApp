import type { PropsWithChildren } from "react";
import type { TutorialIdEnum } from "./enums";
import type { TutorialStep } from "./types";

export interface TutorialTargetProps extends PropsWithChildren {
    targetId: string;
}

export interface TutorialHelpButtonProps {
    tutorialId?: TutorialIdEnum;
    steps?: TutorialStep[];
}
