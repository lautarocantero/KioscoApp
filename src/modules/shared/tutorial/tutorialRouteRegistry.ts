import type { TutorialRouteRegistryEntry } from "@typings/tutorial/types";
import { TutorialIdEnum } from "@typings/tutorial/enums";
import { useShopTutorialSteps } from "../../shop/tutorial/shopTutorialSteps";
import { productsTutorialSteps } from "../../products/tutorial/productsTutorialSteps";
import { presentationsTutorialSteps } from "../../presentations/tutorial/presentationsTutorialSteps";
import { newSellTutorialSteps } from "../../cart/tutorial/newSellTutorialSteps";
import { providersTutorialSteps } from "../../providers/tutorial/providersTutorialSteps";
import { useSellersTutorialSteps } from "../../sellers/tutorial/sellersTutorialSteps";
import { receiptTutorialSteps } from "../../receipt/tutorial/receiptTutorialSteps";

// Registro central ruta → tutorial: AppShell lo usa para resolver el
// tutorial de la pantalla activa sin que cada página tenga que "avisarle"
// a su ícono de ayuda genérico. Mismo patrón de composición central que ya
// usa AppRouter.tsx para las rutas de cada módulo. select-kiosco no
// necesita entrada acá porque no vive dentro de AppShell — su botón de
// ayuda va embebido directo en KioscoSelectorHeaderBar.
//
// `path` usa la misma sintaxis que las rutas de React Router (matchPath en
// useCurrentRouteTutorial) — por eso presentations puede registrar el
// patrón dinámico en vez de una ruta fija.
// `useSteps` solo necesita el shape `() => TutorialStep[]`: para screens
// sin steps condicionales alcanza con envolver el array estático, no hace
// falta que sea un hook de verdad (ver products/presentations/new-sell/
// providers/receipts, vs. shop/sellers que sí son hooks reales por sus
// pasos admin-gated).
export const TUTORIAL_ROUTE_REGISTRY: TutorialRouteRegistryEntry[] = [
    { path: "/shop", tutorialId: TutorialIdEnum.Shop, useSteps: useShopTutorialSteps },
    { path: "/products", tutorialId: TutorialIdEnum.Products, useSteps: () => productsTutorialSteps },
    {
        path: "/products/:product_id/presentations",
        tutorialId: TutorialIdEnum.Presentations,
        useSteps: () => presentationsTutorialSteps,
    },
    { path: "/new-sell", tutorialId: TutorialIdEnum.NewSell, useSteps: () => newSellTutorialSteps },
    { path: "/providers", tutorialId: TutorialIdEnum.Providers, useSteps: () => providersTutorialSteps },
    { path: "/sellers", tutorialId: TutorialIdEnum.Sellers, useSteps: useSellersTutorialSteps },
    { path: "/receipts", tutorialId: TutorialIdEnum.Receipts, useSteps: () => receiptTutorialSteps },
];
