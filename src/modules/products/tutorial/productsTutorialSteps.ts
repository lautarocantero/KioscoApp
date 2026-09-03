import type { TutorialStep } from "@typings/tutorial/types";

export const productsTutorialSteps: TutorialStep[] = [
    {
        id: "welcome",
        target: null,
        titleKey: "tutorial.products.steps.welcome.title",
        bodyKey: "tutorial.products.steps.welcome.body",
    },
    {
        id: "create",
        target: '[data-tutorial-target="products-create"]',
        radius: 8,
        titleKey: "tutorial.products.steps.create.title",
        bodyKey: "tutorial.products.steps.create.body",
    },
];
