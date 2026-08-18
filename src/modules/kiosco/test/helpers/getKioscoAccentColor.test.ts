import { describe, expect, it } from "vitest";
import { getKioscoAccentColor } from "../../helpers/getKioscoAccentColor";
import type { Theme } from "@mui/material";

const buildTheme = (): Theme => ({
    custom: {
        accents: {
            violet: "#8B5CF6",
            green: "#22C55E",
            blue: "#3B82F6",
            orange: "#F97316",
            pink: "#EC4899",
            gold: "#E8890C",
        },
    },
} as unknown as Theme);

describe("getKioscoAccentColor", () => {
    const theme = buildTheme();

    it("devuelve violeta para el índice 0", () => {
        expect(getKioscoAccentColor(theme, 0)).toBe("#8B5CF6");
    });

    it("devuelve gold para el índice 5 (último de la rotación)", () => {
        expect(getKioscoAccentColor(theme, 5)).toBe("#E8890C");
    });

    it("rota (módulo) cuando el índice excede la cantidad de colores", () => {
        expect(getKioscoAccentColor(theme, 6)).toBe(getKioscoAccentColor(theme, 0));
        expect(getKioscoAccentColor(theme, 7)).toBe(getKioscoAccentColor(theme, 1));
    });
});
