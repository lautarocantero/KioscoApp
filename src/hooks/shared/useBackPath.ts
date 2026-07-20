// shared/hooks/useBackPath.ts
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Vuelve a la última ruta visitada dentro de la app (navigate(-1)).
 * Si no hay una entrada previa en el stack de navegación de la SPA
 * (ej: el usuario entró directo por URL, o refrescó la página),
 * navega a `defaultBack`.
 */
export const useBackPath = (defaultBack: string) => {
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;

        if (idx > 0) {
            navigate(-1);
        } else {
            navigate(defaultBack, { replace: true });
        }
    }, [navigate, defaultBack]);

    return goBack;
};