import { describe, it, expect } from "vitest";
import { SellFilterEnum } from "@typings/sells/sellsEnum";
import { parseSellFilterParam } from "../../helpers/parseSellFilterParam";

describe("parseSellFilterParam", () => {
    it("acepta un valor válido de SellFilterEnum", () => {
        expect(parseSellFilterParam("parcial")).toBe(SellFilterEnum.Parcial);
        expect(parseSellFilterParam("completada")).toBe(SellFilterEnum.Completada);
    });

    it("cae a 'all' si el query param es null", () => {
        expect(parseSellFilterParam(null)).toBe(SellFilterEnum.All);
    });

    it("cae a 'all' ante un valor que no matchea ningún filtro real", () => {
        expect(parseSellFilterParam("cualquier-cosa")).toBe(SellFilterEnum.All);
    });
});
