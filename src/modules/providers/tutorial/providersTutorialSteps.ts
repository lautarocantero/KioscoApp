import type { TutorialStep } from "@typings/tutorial/types";

export const providersTutorialSteps: TutorialStep[] = [
    {
        id: "welcome",
        target: null,
        titleKey: "tutorial.providers.steps.welcome.title",
        bodyKey: "tutorial.providers.steps.welcome.body",
    },
    {
        id: "create",
        target: '[data-tutorial-target="providers-create"]',
        radius: 8,
        titleKey: "tutorial.providers.steps.create.title",
        bodyKey: "tutorial.providers.steps.create.body",
    },
];
