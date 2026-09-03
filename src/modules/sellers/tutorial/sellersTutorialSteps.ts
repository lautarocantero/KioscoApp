import { useMemo } from "react";
import type { TutorialStep } from "@typings/tutorial/types";
import { useIsActiveKioscoAdmin } from "@hooks/kiosco/useIsActiveKioscoAdmin";

const WELCOME_STEP: TutorialStep = {
    id: "welcome",
    target: null,
    titleKey: "tutorial.sellers.steps.welcome.title",
    bodyKey: "tutorial.sellers.steps.welcome.body",
};

const INVITE_STEP: TutorialStep = {
    id: "invite",
    target: '[data-tutorial-target="sellers-invite"]',
    radius: 8,
    titleKey: "tutorial.sellers.steps.invite.title",
    bodyKey: "tutorial.sellers.steps.invite.body",
};

// "Agregar vendedor" solo existe en el DOM para admins (SellersListPage lo
// gatea con isAdmin, igual que ShopMascotPanel con "Ver estadísticas") — se
// agrega al recorrido solo en ese caso para no apuntar a un elemento que
// nunca va a existir.
export const useSellersTutorialSteps = (): TutorialStep[] => {
    const isAdmin = useIsActiveKioscoAdmin();

    return useMemo(() => {
        const steps = [WELCOME_STEP];
        if (isAdmin) steps.push(INVITE_STEP);
        return steps;
    }, [isAdmin]);
};
