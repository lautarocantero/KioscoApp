import { matchPath, useLocation } from "react-router-dom";
import type { CurrentRouteTutorial } from "@typings/tutorial/types";
import { TUTORIAL_ROUTE_REGISTRY } from "../../modules/shared/tutorial/tutorialRouteRegistry";

// Resuelve qué tutorial corresponde a la ruta activa, para el ícono de
// ayuda genérico de AppShell.
//
// Se llaman TODOS los useSteps del registro, incondicionalmente y en el
// mismo orden en cada render (reglas de hooks): el registro es una
// constante estática, así que la cantidad de hooks invocados nunca cambia
// entre renders sin importar en qué ruta esté el usuario — solo se
// descarta el resultado de los que no matchean.
//
// matchPath (no comparación exacta de string) porque algunas rutas son
// dinámicas, ej. "/products/:product_id/presentations".
export const useCurrentRouteTutorial = (): CurrentRouteTutorial | null => {
    const location = useLocation();

    const stepsByEntry = TUTORIAL_ROUTE_REGISTRY.map((entry) => entry.useSteps());

    const matchedIndex = TUTORIAL_ROUTE_REGISTRY.findIndex((entry) =>
        matchPath({ path: entry.path, end: true }, location.pathname)
    );
    if (matchedIndex === -1) return null;

    return {
        tutorialId: TUTORIAL_ROUTE_REGISTRY[matchedIndex].tutorialId,
        steps: stepsByEntry[matchedIndex],
    };
};
