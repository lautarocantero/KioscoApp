import { describe, it, expect } from "vitest";
import { getTutorialScrollTarget } from "../../helpers/getTutorialScrollTarget";

describe("getTutorialScrollTarget", () => {
    it("centra el elemento en la franja libre por encima del dock", () => {
        const result = getTutorialScrollTarget({
            elementTop: 500,
            elementHeight: 100,
            scrollY: 0,
            viewportHeight: 900,
            documentScrollHeight: 3000,
        });

        // freeHeight = max(160, 900-340) = 560; absoluteTop = 500;
        // centered = 500 + 50 - 280 = 270
        expect(result).toBe(270);
    });

    it("nunca devuelve un valor negativo", () => {
        const result = getTutorialScrollTarget({
            elementTop: 0,
            elementHeight: 20,
            scrollY: 0,
            viewportHeight: 900,
            documentScrollHeight: 1000,
        });

        expect(result).toBeGreaterThanOrEqual(0);
    });

    it("no excede el scroll máximo disponible del documento", () => {
        const result = getTutorialScrollTarget({
            elementTop: 5000,
            elementHeight: 20,
            scrollY: 0,
            viewportHeight: 900,
            documentScrollHeight: 3000,
        });

        expect(result).toBe(3000 - 900);
    });

    it("usa un mínimo de 160px de franja libre en viewports muy bajos", () => {
        const result = getTutorialScrollTarget({
            elementTop: 200,
            elementHeight: 40,
            scrollY: 0,
            viewportHeight: 300,
            documentScrollHeight: 2000,
        });

        // freeHeight = max(160, 300-340) = 160; absoluteTop=200; centered=200+20-80=140
        expect(result).toBe(140);
    });
});
