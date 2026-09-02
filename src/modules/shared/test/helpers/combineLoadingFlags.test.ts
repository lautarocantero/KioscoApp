import { describe, it, expect } from "vitest";
import { combineLoadingFlags } from "../../helpers/combineLoadingFlags";

describe("combineLoadingFlags", () => {
    it("devuelve false cuando no se pasan flags", () => {
        expect(combineLoadingFlags()).toBe(false);
    });

    it("devuelve false cuando todos los flags son false", () => {
        expect(combineLoadingFlags(false, false, false)).toBe(false);
    });

    it("devuelve true si al menos un flag es true", () => {
        expect(combineLoadingFlags(false, true, false)).toBe(true);
    });

    it("devuelve true cuando todos los flags son true", () => {
        expect(combineLoadingFlags(true, true)).toBe(true);
    });
});
