import type { TutorialIdEnum } from "./enums";

// /*══════════════════════════════════════════════════════════════════════╗
// ║    Steps                                                              ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface TutorialStep {
    id: string;
    // Selector CSS del elemento a resaltar (ej. '[data-tutorial-target="x"]').
    // null = paso de bienvenida sin spotlight (solo overlay + dock).
    target: string | null;
    radius?: number;
    titleKey: string;
    bodyKey: string;
    bodyOptions?: Record<string, unknown>;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║    Motor: medición y layout                                          ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface TutorialRect {
    top: number;
    left: number;
    width: number;
    height: number;
}

export interface TutorialDockLayout {
    bubbleWidth: number;
    mascotSize: number;
}

export interface TutorialScrollTargetParams {
    elementTop: number;
    elementHeight: number;
    scrollY: number;
    viewportHeight: number;
    documentScrollHeight: number;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║    Contexto                                                           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface TutorialContextType {
    activeTutorialId: TutorialIdEnum | null;
    steps: TutorialStep[];
    stepIndex: number;
    running: boolean;
    finished: boolean;
    rect: TutorialRect | null;
    start: (tutorialId: TutorialIdEnum, steps: TutorialStep[]) => void;
    next: () => void;
    prev: () => void;
    skip: () => void;
    restart: () => void;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║    Registro de tutoriales por ruta                                   ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface TutorialRouteRegistryEntry {
    path: string;
    tutorialId: TutorialIdEnum;
    useSteps: () => TutorialStep[];
}

export interface CurrentRouteTutorial {
    tutorialId: TutorialIdEnum;
    steps: TutorialStep[];
}
