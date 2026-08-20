import { describe, it, expect } from "vitest";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import { parseMembershipPlanParam } from "../../helpers/parseMembershipPlanParam";

describe("parseMembershipPlanParam", () => {
    it("acepta un tier válido", () => {
        expect(parseMembershipPlanParam("super_stocko")).toBe(KioscoPlanEnum.SuperStocko);
    });

    it("rechaza un string que no es un tier", () => {
        expect(parseMembershipPlanParam("gold-plan")).toBeNull();
    });

    it("rechaza undefined (ruta sin param)", () => {
        expect(parseMembershipPlanParam(undefined)).toBeNull();
    });

    it("es case-sensitive: no acepta variantes en mayúscula", () => {
        expect(parseMembershipPlanParam("STOCKO")).toBeNull();
    });
});
