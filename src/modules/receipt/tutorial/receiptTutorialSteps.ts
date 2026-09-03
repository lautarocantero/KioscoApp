import type { TutorialStep } from "@typings/tutorial/types";

export const receiptTutorialSteps: TutorialStep[] = [
    {
        id: "welcome",
        target: null,
        titleKey: "tutorial.receipts.steps.welcome.title",
        bodyKey: "tutorial.receipts.steps.welcome.body",
    },
    {
        id: "upload",
        target: '[data-tutorial-target="receipt-upload"]',
        radius: 12,
        titleKey: "tutorial.receipts.steps.upload.title",
        bodyKey: "tutorial.receipts.steps.upload.body",
    },
];
