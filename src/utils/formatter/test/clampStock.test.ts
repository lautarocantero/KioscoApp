import { describe, it, expect } from "vitest";
import { clampStock } from "../clampStock";

describe("clampStock", () => {
    it("devuelve 0 cuando el stock es negativo", () => {
        expect(clampStock(-11)).toBe(0);
    });

    it("devuelve el mismo valor cuando el stock ya es 0 o positivo", () => {
        expect(clampStock(0)).toBe(0);
        expect(clampStock(42)).toBe(42);
    });
});
