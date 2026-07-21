// shared/hooks/useBackPath.ts
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Vuelve a `location.state.from` si fue provisto explícitamente
 * (ej: al entrar desde Ventas → Presentaciones).
 * Si no, navega a `defaultBack`.
 */
export const useBackPath = (defaultBack: string) => {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = useCallback(() => {
        const from = (location.state as { from?: string } | null)?.from;

        if (from) {
            navigate(from, { replace: true });
            return;
        }

        navigate(defaultBack, { replace: true });
    }, [navigate, defaultBack, location.state]);

    return goBack;
};