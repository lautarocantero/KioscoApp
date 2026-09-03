import type { TutorialIdEnum } from "@typings/tutorial/enums";
import { TUTORIAL_SEEN_STORAGE_KEY_PREFIX } from "../../../config/constants";

export const getTutorialSeenStorageKey = (tutorialId: TutorialIdEnum): string =>
    `${TUTORIAL_SEEN_STORAGE_KEY_PREFIX}${tutorialId}`;
