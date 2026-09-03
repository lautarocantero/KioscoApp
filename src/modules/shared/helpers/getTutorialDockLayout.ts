import type { TutorialDockLayout } from "@typings/tutorial/types";

// Franja inferior reservada para el dock (bubble + mascota): el scroll deja
// siempre el target centrado arriba de esta banda, así nunca se solapan.
export const TUTORIAL_DOCK_BAND_PX = 340;

const COMPACT_VIEWPORT_HEIGHT_PX = 460;

export const getTutorialDockLayout = (viewportHeight: number): TutorialDockLayout => {
    if (viewportHeight < COMPACT_VIEWPORT_HEIGHT_PX) return { bubbleWidth: 300, mascotSize: 110 };
    return { bubbleWidth: 390, mascotSize: 210 };
};
