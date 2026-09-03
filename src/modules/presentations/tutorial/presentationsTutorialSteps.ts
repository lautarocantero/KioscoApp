import type { TutorialStep } from "@typings/tutorial/types";

export const presentationsTutorialSteps: TutorialStep[] = [
    {
        id: "welcome",
        target: null,
        titleKey: "tutorial.presentations.steps.welcome.title",
        bodyKey: "tutorial.presentations.steps.welcome.body",
    },
    {
        id: "create",
        target: '[data-tutorial-target="presentation-create"]',
        radius: 8,
        titleKey: "tutorial.presentations.steps.create.title",
        bodyKey: "tutorial.presentations.steps.create.body",
    },
];
