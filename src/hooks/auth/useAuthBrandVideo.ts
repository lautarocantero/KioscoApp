import { useState } from "react";
import type { UseAuthBrandVideoReturn } from "@typings/auth/authTypes";

// Sin controles ni foco, el único camino nativo para pausar el video es el
// menú contextual del botón derecho (algunos navegadores lo ofrecen incluso
// sin el atributo `controls`); por eso se bloquea acá.
export const useAuthBrandVideo = (): UseAuthBrandVideoReturn => {
    const [hasEnded, setHasEnded] = useState(false);

    const handleVideoEnded = (): void => setHasEnded(true);

    const handleVideoContextMenu = (event: React.MouseEvent<HTMLVideoElement>): void => {
        event.preventDefault();
    };

    return { hasEnded, handleVideoEnded, handleVideoContextMenu };
};

export default useAuthBrandVideo;
