import type { TutorialStep } from "@typings/tutorial/types";

// Usa los ids estables de useSellShortcuts (F2/F9) como selector directo —
// no hace falta envolver nada con TutorialTarget, ya existen en el DOM.
export const newSellTutorialSteps: TutorialStep[] = [
    {
        id: "welcome",
        target: null,
        titleKey: "tutorial.newSell.steps.welcome.title",
        bodyKey: "tutorial.newSell.steps.welcome.body",
    },
    {
        id: "search",
        target: "#sell-search-input",
        radius: 8,
        titleKey: "tutorial.newSell.steps.search.title",
        bodyKey: "tutorial.newSell.steps.search.body",
    },
    {
        id: "scan",
        target: "#sell-barcode-toggle",
        radius: 8,
        titleKey: "tutorial.newSell.steps.scan.title",
        bodyKey: "tutorial.newSell.steps.scan.body",
    },
    {
        id: "cart",
        target: "#seller-products-exhibitor",
        radius: 12,
        titleKey: "tutorial.newSell.steps.cart.title",
        bodyKey: "tutorial.newSell.steps.cart.body",
    },
    {
        id: "ticket",
        target: "#cart-generate-ticket-button",
        radius: 8,
        titleKey: "tutorial.newSell.steps.ticket.title",
        bodyKey: "tutorial.newSell.steps.ticket.body",
    },
];
