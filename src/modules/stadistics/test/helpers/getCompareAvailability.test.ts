import { describe, it, expect } from "vitest";
import { getCompareAvailability } from "../../helpers/getCompareAvailability";

describe("getCompareAvailability", () => {
    it("plan Standard (canCompareByPlan=false): bloquea por plan, sin importar el rol", () => {
        expect(getCompareAvailability(false, true)).toEqual({ canCompare: false, disabledReason: "plan" });
        expect(getCompareAvailability(false, false)).toEqual({ canCompare: false, disabledReason: "plan" });
    });

    it("plan Deluxe + seller: bloquea por rol de administrador", () => {
        expect(getCompareAvailability(true, false)).toEqual({ canCompare: false, disabledReason: "admin" });
    });

    it("plan Deluxe + admin: habilitada, sin motivo de bloqueo", () => {
        expect(getCompareAvailability(true, true)).toEqual({ canCompare: true, disabledReason: null });
    });
});
