import { useEffect, useRef } from "react";
import type { TutorialIdEnum } from "@typings/tutorial/enums";
import type { TutorialStep } from "@typings/tutorial/types";
import { getTutorialSeenStorageKey } from "../../modules/shared/helpers/getTutorialSeenStorageKey";
import { useTutorialContext } from "./useTutorialContext";

// Arranca el tutorial de una pantalla solo la primera vez que se visita
// (persistido en localStorage, mismo patrón que ACTIVE_KIOSCO_STORAGE_KEY).
// `ready` deja que la pantalla espere su propio loader (ej. isPageLoading)
// antes de intentar medir los targets reales del DOM.
export const useAutoStartTutorial = (tutorialId: TutorialIdEnum, steps: TutorialStep[], ready: boolean): void => {
    const { start } = useTutorialContext();
    const hasAttemptedRef = useRef(false);

    useEffect(() => {
        if (!ready) return;
        if (hasAttemptedRef.current) return;
        if (steps.length === 0) return;

        hasAttemptedRef.current = true;

        const storageKey = getTutorialSeenStorageKey(tutorialId);
        if (localStorage.getItem(storageKey)) return;

        localStorage.setItem(storageKey, "true");
        start(tutorialId, steps);
    }, [ready, steps, start, tutorialId]);
};
