import type { TutorialStep } from "@typings/tutorial/types";

// Calca los 3 pasos del mock de referencia (welcome sin target, crear,
// unirme) — ver "Tutorial Select Kiosco.dc.html".
export const selectKioscoTutorialSteps: TutorialStep[] = [
    {
        id: "welcome",
        target: null,
        titleKey: "tutorial.selectKiosco.steps.welcome.title",
        bodyKey: "tutorial.selectKiosco.steps.welcome.body",
    },
    {
        id: "create",
        target: '[data-tutorial-target="kiosco-create"]',
        radius: 8,
        titleKey: "tutorial.selectKiosco.steps.create.title",
        bodyKey: "tutorial.selectKiosco.steps.create.body",
    },
    {
        id: "join",
        target: '[data-tutorial-target="kiosco-join"]',
        radius: 6,
        titleKey: "tutorial.selectKiosco.steps.join.title",
        bodyKey: "tutorial.selectKiosco.steps.join.body",
    },
];
