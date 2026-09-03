import { useCallback, useEffect, useRef, useState } from "react";
import type { TutorialContextType, TutorialRect, TutorialStep } from "@typings/tutorial/types";
import type { TutorialIdEnum } from "@typings/tutorial/enums";
import { getTutorialTargetRect } from "../../modules/shared/helpers/getTutorialTargetRect";
import { getTutorialScrollTarget } from "../../modules/shared/helpers/getTutorialScrollTarget";

const SETTLE_POLL_INTERVAL_MS = 50;
const SETTLE_POLL_MAX_TICKS = 20;
const FOCUS_TARGET_DELAY_MS = 60;

const rectsAreEqual = (a: TutorialRect | null, b: TutorialRect | null): boolean => {
    if (a === b) return true;
    if (!a || !b) return false;
    return a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height;
};

// Motor del tutorial: traducción a hook del componente de clase del mock
// de referencia (scroll + spotlight + dock + teclado). El estado de
// "run" vive acá; la presentación (overlay/dock/mascota) vive en
// TutorialOverlay, que solo lee de este hook vía TutorialContext.
export const useTutorialEngine = (): TutorialContextType => {
    const [activeTutorialId, setActiveTutorialId] = useState<TutorialIdEnum | null>(null);
    const [steps, setSteps] = useState<TutorialStep[]>([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [running, setRunning] = useState(false);
    const [finished, setFinished] = useState(false);
    const [rect, setRect] = useState<TutorialRect | null>(null);

    const settleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Refs "latest value": los listeners globales (resize/scroll/keydown) y
    // el poll de settle se registran una sola vez por corrida, así que
    // necesitan leer el step/estado más reciente sin depender de closures
    // viejas. Asignadas directo en el render, mismo patrón que
    // useInitialPageLoading.
    const stepsRef = useRef(steps);
    stepsRef.current = steps;
    const stepIndexRef = useRef(stepIndex);
    stepIndexRef.current = stepIndex;
    const runningRef = useRef(running);
    runningRef.current = running;

    const clearSettlePoll = useCallback(() => {
        if (settleIntervalRef.current === null) return;
        clearInterval(settleIntervalRef.current);
        settleIntervalRef.current = null;
    }, []);

    const measureCurrentStep = useCallback(() => {
        const currentStep = stepsRef.current[stepIndexRef.current];
        if (!currentStep || !runningRef.current) {
            setRect((prevRect) => (prevRect === null ? prevRect : null));
            return;
        }

        const nextRect = getTutorialTargetRect(currentStep.target);
        setRect((prevRect) => (rectsAreEqual(prevRect, nextRect) ? prevRect : nextRect));
    }, []);

    const focusCurrentStep = useCallback(() => {
        clearSettlePoll();
        const currentStep = stepsRef.current[stepIndexRef.current];
        if (!currentStep || !currentStep.target) {
            measureCurrentStep();
            return;
        }

        const targetRect = getTutorialTargetRect(currentStep.target);
        if (!targetRect) {
            measureCurrentStep();
            return;
        }

        const scrollingElement = document.scrollingElement ?? document.documentElement;
        scrollingElement.scrollTop = getTutorialScrollTarget({
            elementTop: targetRect.top,
            elementHeight: targetRect.height,
            scrollY: window.scrollY,
            viewportHeight: window.innerHeight,
            documentScrollHeight: document.documentElement.scrollHeight,
        });

        measureCurrentStep();

        let ticks = 0;
        settleIntervalRef.current = setInterval(() => {
            measureCurrentStep();
            ticks += 1;
            if (ticks > SETTLE_POLL_MAX_TICKS) clearSettlePoll();
        }, SETTLE_POLL_INTERVAL_MS);
    }, [clearSettlePoll, measureCurrentStep]);

    const finish = useCallback(() => {
        setRunning(false);
        setFinished(true);
        setRect(null);
        clearSettlePoll();
    }, [clearSettlePoll]);

    const next = useCallback(() => {
        if (stepIndexRef.current >= stepsRef.current.length - 1) {
            finish();
            return;
        }
        setStepIndex((current) => current + 1);
    }, [finish]);

    const prev = useCallback(() => {
        setStepIndex((current) => Math.max(0, current - 1));
    }, []);

    const skip = useCallback(() => finish(), [finish]);

    const start = useCallback((tutorialId: TutorialIdEnum, nextSteps: TutorialStep[]) => {
        if (nextSteps.length === 0) return;
        setActiveTutorialId(tutorialId);
        setSteps(nextSteps);
        setStepIndex(0);
        setFinished(false);
        setRunning(true);
    }, []);

    const restart = useCallback(() => {
        if (stepsRef.current.length === 0) return;
        setStepIndex(0);
        setFinished(false);
        setRunning(true);
    }, []);

    useEffect(() => {
        if (!running) return undefined;

        focusTimeoutRef.current = setTimeout(focusCurrentStep, FOCUS_TARGET_DELAY_MS);
        return () => {
            if (focusTimeoutRef.current !== null) clearTimeout(focusTimeoutRef.current);
        };
    }, [running, stepIndex, focusCurrentStep]);

    useEffect(() => {
        if (!running) return undefined;

        const handleResize = () => measureCurrentStep();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize, true);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleResize, true);
        };
    }, [running, measureCurrentStep]);

    useEffect(() => {
        if (!running) return undefined;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                skip();
            } else if (event.key === "ArrowRight" || event.key === "Enter") {
                event.preventDefault();
                next();
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                prev();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [running, next, prev, skip]);

    useEffect(() => () => clearSettlePoll(), [clearSettlePoll]);

    return { activeTutorialId, steps, stepIndex, running, finished, rect, start, next, prev, skip, restart };
};
