import { useEffect, useState } from "react";

// No hay progreso real (no medimos bytes de la respuesta), así que se
// simula uno creíble: crece rápido al principio y se frena con el tiempo
// (curva exponencial), sin loopear ni reiniciar — una sola pasada por
// montaje, tope por debajo de 100% porque nunca sabemos si "ya casi
// termina" hasta que efectivamente termina (ahí LoadingScreen se
// desmonta y revela el contenido real).
const PROGRESS_CAP = 92;
const TIME_CONSTANT_MS = 2200;
const TICK_MS = 100;

export const useLoadingScreenProgress = (): number => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startedAt = Date.now();

        const intervalId = setInterval(() => {
            const elapsedMs = Date.now() - startedAt;
            const nextProgress = PROGRESS_CAP * (1 - Math.exp(-elapsedMs / TIME_CONSTANT_MS));
            setProgress(nextProgress);
        }, TICK_MS);

        return () => clearInterval(intervalId);
    }, []);

    return progress;
};
