import { describe, it, expect } from "vitest";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanDefinition } from "@typings/membership/membershipTypes";
import { buildMembershipPlansWithFeatures } from "../../helpers/buildMembershipPlansWithFeatures";

const buildPlan = (overrides: Partial<MembershipPlanDefinition> = {}): MembershipPlanDefinition => ({
    id: KioscoPlanEnum.Standard,
    name: "Stocko Standard",
    price: 9999,
    currency_id: "ARS",
    ...overrides,
});

describe("buildMembershipPlansWithFeatures", () => {
    it("ordena los planes según MEMBERSHIP_PLAN_ORDER sin importar el orden de llegada del back", () => {
        const raw = [
            buildPlan({ id: KioscoPlanEnum.Deluxe, name: "Stocko Deluxe" }),
            buildPlan({ id: KioscoPlanEnum.Standard, name: "Stocko Standard" }),
        ];

        const result = buildMembershipPlansWithFeatures(raw);

        expect(result.map((plan) => plan.id)).toEqual([
            KioscoPlanEnum.Standard,
            KioscoPlanEnum.Deluxe,
        ]);
    });

    it("marca Stocko Deluxe como el plan popular", () => {
        const raw = [buildPlan({ id: KioscoPlanEnum.Deluxe })];

        const result = buildMembershipPlansWithFeatures(raw);

        expect(result[0].isPopular).toBe(true);
    });

    it("no marca como popular al otro tier", () => {
        const raw = [buildPlan({ id: KioscoPlanEnum.Standard })];

        const result = buildMembershipPlansWithFeatures(raw);

        expect(result.every((plan) => !plan.isPopular)).toBe(true);
    });

    it("agrega las claves de traducción de features de cada tier", () => {
        const raw = [buildPlan({ id: KioscoPlanEnum.Standard })];

        const result = buildMembershipPlansWithFeatures(raw);

        expect(result[0].featureKeys.length).toBeGreaterThan(0);
        expect(result[0].featureKeys.every((key) => key.startsWith("membership.features."))).toBe(true);
    });

    it("omite un tier si el back no lo devolvió", () => {
        const raw = [buildPlan({ id: KioscoPlanEnum.Standard })];

        const result = buildMembershipPlansWithFeatures(raw);

        expect(result).toHaveLength(1);
    });
});
