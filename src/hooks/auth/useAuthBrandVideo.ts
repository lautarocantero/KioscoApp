import { useEffect, useState } from "react";
import { AuthBrandVideoPhaseEnum } from "@typings/auth/authEnums";
import type { UseAuthBrandVideoReturn } from "@typings/auth/authTypes";

export const HOLD_LAST_FRAME_MS = 2000;
export const FADE_TRANSITION_MS = 1500;

// Sin controles ni foco, el único camino nativo para pausar el video es el
// menú contextual del botón derecho (algunos navegadores lo ofrecen incluso
// sin el atributo `controls`); por eso se bloquea acá.
export const useAuthBrandVideo = (): UseAuthBrandVideoReturn => {
    const [phase, setPhase] = useState<AuthBrandVideoPhaseEnum>(AuthBrandVideoPhaseEnum.Playing);

    useEffect(() => {
        if (phase !== AuthBrandVideoPhaseEnum.Holding) return;
        const timer = setTimeout(() => setPhase(AuthBrandVideoPhaseEnum.Fading), HOLD_LAST_FRAME_MS);
        return () => clearTimeout(timer);
    }, [phase]);

    useEffect(() => {
        if (phase !== AuthBrandVideoPhaseEnum.Fading) return;
        const timer = setTimeout(() => setPhase(AuthBrandVideoPhaseEnum.Done), FADE_TRANSITION_MS);
        return () => clearTimeout(timer);
    }, [phase]);

    const handleVideoEnded = (): void => setPhase(AuthBrandVideoPhaseEnum.Holding);

    const handleVideoContextMenu = (event: React.MouseEvent<HTMLVideoElement>): void => {
        event.preventDefault();
    };

    return { phase, handleVideoEnded, handleVideoContextMenu };
};

export default useAuthBrandVideo;
