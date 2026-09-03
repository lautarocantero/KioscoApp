import type { TutorialScrollTargetParams } from "@typings/tutorial/types";
import { TUTORIAL_DOCK_BAND_PX } from "./getTutorialDockLayout";

const MIN_FREE_HEIGHT_PX = 160;

// Deja el target en el tercio superior libre de la pantalla, arriba de la
// banda reservada para el dock (bubble + mascota) — mismo cálculo que usa
// el mock de referencia del tutorial.
export const getTutorialScrollTarget = ({
    elementTop,
    elementHeight,
    scrollY,
    viewportHeight,
    documentScrollHeight,
}: TutorialScrollTargetParams): number => {
    const absoluteTop = elementTop + scrollY;
    const freeHeight = Math.max(MIN_FREE_HEIGHT_PX, viewportHeight - TUTORIAL_DOCK_BAND_PX);
    const centeredScrollTop = absoluteTop + elementHeight / 2 - freeHeight / 2;
    const maxScrollTop = documentScrollHeight - viewportHeight;

    return Math.max(0, Math.min(centeredScrollTop, maxScrollTop));
};
