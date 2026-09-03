import { useMemo } from "react";
import type { TutorialStep } from "@typings/tutorial/types";
import { useIsActiveKioscoAdmin } from "@hooks/kiosco/useIsActiveKioscoAdmin";

const BASE_SHOP_TUTORIAL_STEPS: TutorialStep[] = [
    {
        id: "welcome",
        target: null,
        titleKey: "tutorial.shop.steps.welcome.title",
        bodyKey: "tutorial.shop.steps.welcome.body",
    },
    {
        id: "dailySummary",
        target: '[data-tutorial-target="shop-hero"]',
        radius: 12,
        titleKey: "tutorial.shop.steps.dailySummary.title",
        bodyKey: "tutorial.shop.steps.dailySummary.body",
    },
    {
        id: "newSale",
        target: '[data-tutorial-target="shop-new-sale"]',
        radius: 8,
        titleKey: "tutorial.shop.steps.newSale.title",
        bodyKey: "tutorial.shop.steps.newSale.body",
    },
    {
        id: "enterStock",
        target: '[data-tutorial-target="shop-enter-stock"]',
        radius: 8,
        titleKey: "tutorial.shop.steps.enterStock.title",
        bodyKey: "tutorial.shop.steps.enterStock.body",
    },
];

const VIEW_STATISTICS_STEP: TutorialStep = {
    id: "viewStatistics",
    target: '[data-tutorial-target="shop-view-statistics"]',
    radius: 8,
    titleKey: "tutorial.shop.steps.viewStatistics.title",
    bodyKey: "tutorial.shop.steps.viewStatistics.body",
};

const ATTENTION_STEP: TutorialStep = {
    id: "attention",
    target: '[data-tutorial-target="shop-attention"]',
    radius: 12,
    titleKey: "tutorial.shop.steps.attention.title",
    bodyKey: "tutorial.shop.steps.attention.body",
};

// "Ver estadísticas" solo existe en el DOM para admins (ShopMascotPanel lo
// gatea con isAdmin) — se agrega al recorrido solo en ese caso para no
// apuntar a un elemento que nunca va a existir.
export const useShopTutorialSteps = (): TutorialStep[] => {
    const isAdmin = useIsActiveKioscoAdmin();

    return useMemo(() => {
        const steps = [...BASE_SHOP_TUTORIAL_STEPS];
        if (isAdmin) steps.push(VIEW_STATISTICS_STEP);
        steps.push(ATTENTION_STEP);
        return steps;
    }, [isAdmin]);
};
