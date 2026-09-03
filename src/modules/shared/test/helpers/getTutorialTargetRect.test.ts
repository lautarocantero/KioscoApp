import { describe, it, expect, afterEach } from "vitest";
import { getTutorialTargetRect } from "../../helpers/getTutorialTargetRect";

describe("getTutorialTargetRect", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("devuelve null si el selector es null (paso de bienvenida)", () => {
        expect(getTutorialTargetRect(null)).toBeNull();
    });

    it("devuelve null si no hay ningún elemento con ese selector", () => {
        expect(getTutorialTargetRect('[data-tutorial-target="missing"]')).toBeNull();
    });

    it("devuelve el rect del elemento con el padding aplicado", () => {
        const el = document.createElement("button");
        el.setAttribute("data-tutorial-target", "test");
        document.body.appendChild(el);
        el.getBoundingClientRect = () =>
            ({ top: 100, left: 50, width: 200, height: 40, bottom: 140, right: 250, x: 50, y: 100, toJSON: () => ({}) }) as DOMRect;

        expect(getTutorialTargetRect('[data-tutorial-target="test"]')).toEqual({
            top: 90,
            left: 40,
            width: 220,
            height: 60,
        });
    });

    it("si el elemento marcado es display:contents (TutorialTarget), mide a su hijo real en vez de un rect vacío", () => {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("data-tutorial-target", "wrapped");
        wrapper.style.display = "contents";
        wrapper.getBoundingClientRect = () => ({ top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;

        const button = document.createElement("button");
        button.getBoundingClientRect = () =>
            ({ top: 200, left: 80, width: 120, height: 36, bottom: 236, right: 200, x: 80, y: 200, toJSON: () => ({}) }) as DOMRect;

        wrapper.appendChild(button);
        document.body.appendChild(wrapper);

        expect(getTutorialTargetRect('[data-tutorial-target="wrapped"]')).toEqual({
            top: 190,
            left: 70,
            width: 140,
            height: 56,
        });
    });
});
