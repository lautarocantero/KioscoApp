import type { TutorialRect } from "@typings/tutorial/types";

const TARGET_PADDING_PX = 10;

// TutorialTarget marca el elemento real con display:"contents" para no
// afectar el layout del padre — pero un elemento display:"contents" no
// genera caja propia, así que su getBoundingClientRect() siempre da un
// rect vacío (0,0,0,0). Hay que medir su primer hijo real en su lugar
// (recursivo, por si hay wrappers anidados).
const resolveMeasurableElement = (element: Element): Element => {
    if (getComputedStyle(element).display !== "contents") return element;
    if (!element.firstElementChild) return element;
    return resolveMeasurableElement(element.firstElementChild);
};

export const getTutorialTargetRect = (selector: string | null): TutorialRect | null => {
    if (!selector) return null;

    const matchedElement = document.querySelector(selector);
    if (!matchedElement) return null;

    const element = resolveMeasurableElement(matchedElement);
    const domRect = element.getBoundingClientRect();

    return {
        top: domRect.top - TARGET_PADDING_PX,
        left: domRect.left - TARGET_PADDING_PX,
        width: domRect.width + TARGET_PADDING_PX * 2,
        height: domRect.height + TARGET_PADDING_PX * 2,
    };
};
